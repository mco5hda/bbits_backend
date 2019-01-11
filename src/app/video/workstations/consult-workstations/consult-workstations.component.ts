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
    for (let index = 1; index <= 10; index++) {
      let workStation: WorkStation = new WorkStation();

      workStation.id = index;
      workStation.model = 'Z240 SFF';
      workStation.baseUnit = 'ho z240 240W 925 efficent chassis';
      workStation.hdd = '500 GB  7200 RPM SATA';
      workStation.dvdDrive = 'Super Multi DVD RW SATA';
      workStation.processor = 'Intel Core i7-6700 3.40 GHz';
      workStation.memory = '8GB DDR4';
      workStation.operativeSystem = 'Microsoft Windows 10 Pro Edition';
      workStation.graphicsCard = 'MHW-AWGC-K620';
      workStation.application = 'Entry 3D Graphics Card';
      workStation.description = 'NVIDIA Quadro K620';
      workStation.cardsSupported = 'No 2nd card supported';
      workStation.maxMonitorsPerCard = '2';
      workStation.maxMonitorPerWorkstation = '2';
      workStation.gpuDecoding = true;
      workStation.price = '1.0';


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
