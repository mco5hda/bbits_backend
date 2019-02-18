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
        this.fillList(data);
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
        if(key === 'id'){
          workStation.id = element[key];
        }else if(key === 'model'){
          workStation.model = element[key];
        }else if(key === 'baseUnit'){
          workStation.baseUnit = element[key];
        }else if(key === 'hdd'){
          workStation.hdd = element[key];
        }else if(key === 'dvdDrive'){
          workStation.dvdDrive = element[key];
        }else if(key === 'processor'){
          workStation.processor = element[key];
        }else if(key === 'memory'){
          workStation.memory = element[key];
        }else if(key === 'operativeSystem'){
          workStation.operativeSystem = element[key];
        }else if(key === 'image'){
          workStation.image = element[key];
        }else if(key === 'price'){
          workStation.price = element[key];
        }else if(key === 'graphicsCards'){
          workStation.graphicsCard = element[key];
        }else if(key === 'aplication'){
          workStation.application = element[key];
        }else if(key === 'description'){
          workStation.description = element[key];
        }else if(key === 'numberOfCardsSupported'){
          workStation.cardsSupported = element[key];
        }else if(key === 'maximumMonitorPerCard'){
          workStation.maxMonitorsPerCard = element[key];
        }else if(key === 'maxMonitorPerWs'){
          workStation.maxMonitorPerWorkstation = element[key];
        }else if(key === 'gpuDecoding'){
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
