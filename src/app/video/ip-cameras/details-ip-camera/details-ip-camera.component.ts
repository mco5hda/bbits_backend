import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IPCamera } from '../../models/cameras/ip-cameras.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-ip-camera',
  templateUrl: './details-ip-camera.component.html',
  styleUrls: ['./details-ip-camera.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsIpCameraComponent implements OnInit {
  ipCamera: IPCamera;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.ipCamera = JSON.parse(sessionStorage.getItem("ipCameraElement"));
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

  editIPCamera(id: number){
    sessionStorage.setItem("ipCameraElement", JSON.stringify(this.ipCamera));
    this.router.navigate(["/edit-ip-camera"]);
  }

  deleteIPCamera(id: number){
    alert('Delete');
  }

}
