import { Component, OnInit } from '@angular/core';
import { WorkStation } from '../../models/workstation.model';
import { Environment } from 'src/app/app.environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult-workstations',
  templateUrl: './consult-workstations.component.html',
  styleUrls: ['./consult-workstations.component.css']
})
export class ConsultWorkstationsComponent implements OnInit {

  workStations: WorkStation[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllWorkStations();
  }

  getAllWorkStations(){
    //Send the request to the  server and get the json with the ip cameras elements array
    for (let index = 0; index < 10; index++) {
      let workStation: WorkStation = new WorkStation();

      workStation.id = index;
      workStation.model = 'prueba'+index;
      workStation.baseUnit = 'prueba';
      workStation.hdd = 'prueba';
      workStation.dvdDrive = 'prueba';
      workStation.processor = 'prueba';
      workStation.memory = 'prueba';
      workStation.operativeSystem = 'prueba';
      workStation.graphicsCard = 'prueba';
      workStation.application = 'prueba';
      workStation.description = 'prueba';
      workStation.cardsSupported = 'prueba';
      workStation.maxMonitorsPerCard = '85';
      workStation.maxMonitorPerWorkstation = '70';
      workStation.gpuDecoding = false;
      workStation.price = 'prueba';


      this.workStations.push(workStation)
    }  
  }

  detailsWorkStation(id: number){
    sessionStorage.setItem("workStationElement", JSON.stringify(this.workStations[id]));
    this.router.navigate(["/details-workstation"]);
  }

  editWorkStation(id: number){
    sessionStorage.setItem("workStationElement", JSON.stringify(this.workStations[id]));
    this.router.navigate(["/edit-workstation"]);
  }

  deleteWorkStation(id: number){
    alert('Delete');
  }
}
