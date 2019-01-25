import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkStation } from '../../models/workstation.model';
import { Router } from '@angular/router';
import { CallOut } from './../../../utilities/callout';
import { WorkstationService } from '../workstation.service';
import { Environment } from 'src/app/app.environment';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';

@Component({
  selector: 'app-details-workstation',
  templateUrl: './details-workstation.component.html',
  styleUrls: ['./details-workstation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsWorkstationComponent implements OnInit {

  workStation: WorkStation;
  image: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private workStationService: WorkstationService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.workStation = JSON.parse(sessionStorage.getItem("workStationElement"));

    if(this.workStation.image.includes('imagecache')){
      this.image = Environment.imageSelectorURL + this.workStation.image;
    }else{
      this.image = Environment.nodeServerURL+'static/assets/video/workstations/images/'+this.workStation.id+'-'+this.workStation.image;
    }

  }

  editWorkStation(id: number){
    sessionStorage.setItem("workStationElement", JSON.stringify(this.workStation));
    this.router.navigate(["/edit-workstation"]);
  }

  deleteWorkStation(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if ( res ){
          this.loading = true;

          this.workStationService.deleteWorkStation(id).subscribe(
            (data) => {
              try {
                if(data['status'] === 'Workstation deleted'){
                  this.loading = false;
                  CallOut.deleted = true;
                  this.router.navigate(["/consult-workstations"]);
                }
              } catch (error) {
                console.log('No logrado')
              }  
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The Workstation has not deleted.', 5000)     
            }
          );
        }
      }
    );
  }

}
