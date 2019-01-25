import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkStation } from '../../models/workstation.model';
import { Environment } from 'src/app/app.environment';
import { Router } from '@angular/router';
import { CallOut } from './../../../utilities/callout';
import { WorkstationService } from '../workstation.service';
import { element } from '@angular/core/src/render3';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';

@Component({
  selector: 'app-consult-workstations',
  templateUrl: './consult-workstations.component.html',
  styleUrls: ['./consult-workstations.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultWorkstationsComponent implements OnInit {
  loading = false;
  workStations: WorkStation[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;

  constructor( 
    private router: Router,
    private workStationService: WorkstationService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.getAllWorkStations();

    if(CallOut.added){
      CallOut.addCallOut('success', 'Workstation added successfully', 5000);
      CallOut.added = false;
    }else if(CallOut.updated){
      CallOut.addCallOut('success', 'Workstation updated successfully', 5000);
      CallOut.updated = false;
    }else if(CallOut.deleted){
      CallOut.addCallOut('success', 'Workstation deleted successfully', 5000);
      CallOut.deleted = false;
    }
  }

  getAllWorkStations(){
    //Send the request to the  server and get the json with the ip cameras elements array
    this.workStationService.getWorkStations().subscribe(
      data => {
        this.fillList(data[0]);
        this.loading = false;
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'Not found elements. Retry again.', 5000)     
      }
    );  
  }

  fillList(data){
    data.forEach(element => {
      let workStation: WorkStation = new WorkStation();

      for(let key in element){
        if(key === 'ID'){
          workStation.id = element[key];
        }else if(key === 'MODEL'){
          workStation.model = element[key];
        }else if(key === 'BASE_UNIT'){
          workStation.baseUnit = element[key];
        }else if(key === 'HDD'){
          workStation.hdd = element[key];
        }else if(key === 'DVD_DRIVE'){
          workStation.dvdDrive = element[key];
        }else if(key === 'PROCESSOR'){
          workStation.processor = element[key];
        }else if(key === 'MEMORY'){
          workStation.memory = element[key];
        }else if(key === 'OPERATIVE_SYSTEM'){
          workStation.operativeSystem = element[key];
        }else if(key === 'IMAGE'){
          workStation.image = element[key];
        }else if(key === 'PRICE'){
          workStation.price = element[key];
        }else if(key === 'GRAPHICS_CARD'){
          workStation.graphicsCard = element[key];
        }else if(key === 'APPLICATION'){
          workStation.application = element[key];
        }else if(key === 'DESCRIPTION'){
          workStation.description = element[key];
        }else if(key === 'NUMBER_OF_CARD_SUPPORTED'){
          workStation.cardsSupported = element[key];
        }else if(key === 'MAXIMUM_MONITORS_PER_CARD'){
          workStation.maxMonitorsPerCard = element[key];
        }else if(key === 'MAX_MONITORS_PER_WS'){
          workStation.maxMonitorPerWorkstation = element[key];
        }else if(key === 'GPU_DECODING'){
          workStation.gpuDecoding = element[key];
        }
      }
      this.workStations.push(workStation)
    });
  }

  detailsWorkStation(id: number){
    let workstation: WorkStation;

    this.workStations.forEach(element => {
      if(element.id === id){
        workstation = element;
      }
    });

    sessionStorage.setItem("workStationElement", JSON.stringify(workstation));
    this.router.navigate(["/details-workstation"]);
  }

  editWorkStation(id: number){
    let workstation: WorkStation;

    this.workStations.forEach(element => {
      if(element.id === id){
        workstation = element;
      }
    });

    sessionStorage.setItem("workStationElement", JSON.stringify(workstation));
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
                  this.workStations = this.workStations.filter(c => c.id !== id);
                  CallOut.addCallOut('success', 'Workstation deleted succesfully.', 5000);
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
