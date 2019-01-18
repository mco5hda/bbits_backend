import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IPRecording } from '../../models/recordings/ip-recordings.model';
import { CallOut } from './../../../utilities/callout';

@Component({
  selector: 'app-details-ip-recording',
  templateUrl: './details-ip-recording.component.html',
  styleUrls: ['./details-ip-recording.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsIpRecordingComponent implements OnInit {

  ipRecording: IPRecording;
  image: string = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.ipRecording = JSON.parse(sessionStorage.getItem("ipRecordingElement"));
    if(this.ipRecording.id > 56){
      this.image = 'http://localhost:3000/static/assets/video/ip-recording/images/'+this.ipRecording.id+'-'+this.ipRecording.image;
    }else{
      this.image = 'http://www.videoselector.boschsecurity.com/'+this.ipRecording.image
    }
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

  editIPRecording(id: number){
    sessionStorage.setItem("ipRecordingElement", JSON.stringify(this.ipRecording));
    this.router.navigate(["/edit-ip-recording"]);
  }

  deleteIPRecording(id: number){
    CallOut.deleted = true;
    this.router.navigate(["/consult-ip-recordings"]);
  }

}
