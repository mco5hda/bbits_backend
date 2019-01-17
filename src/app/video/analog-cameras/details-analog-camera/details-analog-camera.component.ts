import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnalogCamera } from '../../models/cameras/analog-cameras.model';
import { Router } from '@angular/router';
import { CallOut } from './../../../utilities/callout';
import { AnalogCameraService } from '../analog-camera.service';

@Component({
  selector: 'app-details-analog-camera',
  templateUrl: './details-analog-camera.component.html',
  styleUrls: ['./details-analog-camera.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsAnalogCameraComponent implements OnInit {

  analogCamera: AnalogCamera;
  loading: boolean = false;

  constructor(
    private router: Router,
    private analogCameraService: AnalogCameraService,
  ) { }

  ngOnInit() {
    this.analogCamera = JSON.parse(sessionStorage.getItem("analogCameraElement"));
  }

  changeTab(id: number){
    let x = document.getElementsByClassName('M-NavigationTabs__tabContent') as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('M-NavigationTabs__tabContent--active')
      x[i].classList.remove('visible')
    }

    for (let i = 0; i < x.length; i++) {
      if(x[i].tabIndex === id){
        x[i].className += ' M-NavigationTabs__tabContent--active visible'
        break;
      }
    }

    //Changes the color of the li in the current step
    let li = document.getElementsByClassName('M-TabLinks__link') as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < li.length; i++) {
      li[i].classList.remove('M-TabLinks__link--active')
    }

    for (let i = 0; i < li.length; i++) {
      if(li[i].tabIndex === id){
        li[i].className += ' M-TabLinks__link--active'
        break;
      }
    }
  }

  editAnalogCamera(id: number){
    sessionStorage.setItem("analogCameraElement", JSON.stringify(this.analogCamera));
    this.router.navigate(["/edit-analog-camera"]);
  }

  deleteAnalogCamera(id: number){
    this.loading = true;

    this.analogCameraService.deleteAnalogCamera(id).subscribe(
      (data) => {
        try {
          if(data['status'] === 'Analog Camera deleted'){
            this.loading = false;
            CallOut.deleted = true;
            this.router.navigate(["/consult-analog-cameras"]);
          }
        } catch (error) {
          console.log('No logrado')
        }  
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'The Analog Camera has not deleted.', 5000)     
      }
    );
  }

}
