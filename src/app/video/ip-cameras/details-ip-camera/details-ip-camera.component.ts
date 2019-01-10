import { Component, OnInit } from '@angular/core';
import { IPCamera } from '../../models/cameras/ip-cameras.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-ip-camera',
  templateUrl: './details-ip-camera.component.html',
  styleUrls: ['./details-ip-camera.component.css']
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
