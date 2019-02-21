import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IPRecording } from '../../models/recordings/ip-recordings.model';
import { CallOut } from './../../../utilities/callout';
import { Environment } from 'src/app/app.environment';
import { IpRecordingService } from '../ip-recording.service';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';

@Component({
  selector: 'app-details-ip-recording',
  templateUrl: './details-ip-recording.component.html',
  styleUrls: ['./details-ip-recording.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsIpRecordingComponent implements OnInit {

  ipRecording: IPRecording;
  loading: boolean = false;
  image: string = '';
  datasheet: string = '';
  selectorUrlAccessories = Environment.imageSelectorURL;
  nodeServerURLAccessories = Environment.nodeServerURL+Environment.nodeServerImageAccessoriesPath;

  constructor(
    private router: Router,
    private ipRecordingService: IpRecordingService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.ipRecording = JSON.parse(sessionStorage.getItem("ipRecordingElement"));
    
    if(this.ipRecording.image.includes('imagecache')){
      this.image = Environment.imageSelectorURL+this.ipRecording.image
    }else{
      this.image = Environment.nodeServerURL+'static/assets/video/ip-recordings/images/'+this.ipRecording.id+'-'+this.ipRecording.image;
    }

    if(this.ipRecording.datasheet.includes('http://')){
      this.datasheet = this.ipRecording.datasheet;
    }else{
      this.datasheet = Environment.nodeServerURL+'static/assets/video/ip-recordings/datasheets/'+this.ipRecording.id+'-'+this.ipRecording.datasheet;
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
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if ( res ){
          this.loading = true;

          this.ipRecordingService.deleteIPRecording(id).subscribe(
            (data) => {
              try {
                if(data['status'] === 'IP Recording deleted'){
                  this.loading = false;
                  CallOut.deleted = true;
                  this.router.navigate(["/consult-ip-recordings"]);
                }
              } catch (error) {
                console.log('No logrado')
              }  
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The IP Recording has not deleted.', 5000)     
            }
          );
        }
      }
    );
    
  }

}
