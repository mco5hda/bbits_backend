import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnalogRecording } from '../../models/recordings/analog-recordings.model';
import { Router } from '@angular/router';
import { CallOut } from './../../../utilities/callout';

@Component({
  selector: 'app-details-analog-recording',
  templateUrl: './details-analog-recording.component.html',
  styleUrls: ['./details-analog-recording.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsAnalogRecordingComponent implements OnInit {

  analogRecording: AnalogRecording;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.analogRecording = JSON.parse(sessionStorage.getItem("analogRecordingElement"));
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

  editAnalogRecording(id: number){
    sessionStorage.setItem("analogRecordingElement", JSON.stringify(this.analogRecording));
    this.router.navigate(["/edit-analog-recording"]);
  }

  deleteAnalogRecording(id: number){
    CallOut.deleted = true;
    this.router.navigate(["/consult-analog-recordings"]);
  }

}
