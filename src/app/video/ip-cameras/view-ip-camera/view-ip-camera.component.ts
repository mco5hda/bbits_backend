import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-ip-camera',
  templateUrl: './view-ip-camera.component.html',
  styleUrls: ['./view-ip-camera.component.css']
})
export class ViewIpCameraComponent implements OnInit {

  constructor(  private router: Router) {
  }

  ngOnInit() {
  }

}
