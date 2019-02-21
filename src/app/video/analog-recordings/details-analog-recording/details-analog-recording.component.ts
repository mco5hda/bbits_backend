import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnalogRecording } from '../../models/recordings/analog-recordings.model';
import { Router } from '@angular/router';
import { CallOut } from './../../../utilities/callout';
import { AnalogCameraService } from '../../analog-cameras/analog-camera.service';
import { AnalogRecordingService } from '../analog-recording.service';
import { Environment } from 'src/app/app.environment';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';

@Component({
  selector: 'app-details-analog-recording',
  templateUrl: './details-analog-recording.component.html',
  styleUrls: ['./details-analog-recording.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsAnalogRecordingComponent implements OnInit {

  analogRecording: AnalogRecording;
  loading: boolean = false;
  image: string = '';
  datasheet: string = '';
  selectorUrlAccessories = Environment.imageSelectorURL;
  nodeServerURLAccessories = Environment.nodeServerURL+Environment.nodeServerImageAccessoriesPath;

  constructor(
    private router: Router,
    private analogRecordingService: AnalogRecordingService,
    private dialogService: DialogService,
  ) { }
 
  ngOnInit() {
    this.analogRecording = JSON.parse(sessionStorage.getItem("analogRecordingElement"));
    
    if(this.analogRecording.image.includes('imagecache')){
      this.image = Environment.imageSelectorURL+this.analogRecording.image
    }else{
      this.image = Environment.nodeServerURL+'static/assets/video/analog-recordings/images/'+this.analogRecording.id+'-'+this.analogRecording.image;
    }

    if(this.analogRecording.datasheet.includes('http://')){
      this.datasheet = this.analogRecording.datasheet;
    }else{
      this.datasheet = Environment.nodeServerURL+'static/assets/video/analog-recordings/datasheets/'+this.analogRecording.id+'-'+this.analogRecording.datasheet;
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

  editAnalogRecording(id: number){
    sessionStorage.setItem("analogRecordingElement", JSON.stringify(this.analogRecording));
    this.router.navigate(["/edit-analog-recording"]);
  }

  deleteAnalogRecording(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if ( res ){
          this.loading = true;

          this.analogRecordingService.deleteAnalogRecording(id).subscribe(
            (data) => {
              try {
                if(data['status'] === 'Analog Recording deleted'){
                  this.loading = false;
                  CallOut.deleted = true;
                  this.router.navigate(["/consult-analog-recordings"]);
                }
              } catch (error) {
                console.log('No logrado')
              }  
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The Analog Recording has not deleted.', 5000)     
            }
          );
        }
      }
    );
  }
}
