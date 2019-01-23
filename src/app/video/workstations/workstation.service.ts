import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { WorkStation } from '../models/workstation.model';
import { Environment } from 'src/app/app.environment';

@Injectable({
  providedIn: 'root'
})
export class WorkstationService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  };

  constructor(
    private http: HttpClient
  ) { }

  //THE CONTROLLER METHOD
  private requestMapping = "workstations/";

  //OBTAINS THE HTTP URL
  private url = Environment.nodeServerURL + this.requestMapping;

  public getWorkStations(){
    return this.http.get(this.url)
  }

  public createWorkStation(workStation: WorkStation, image: File){
    let formdata: FormData = new FormData();

    formdata.append("model", workStation.model);
    formdata.append("baseUnit", workStation.baseUnit);
    formdata.append("hdd", workStation.hdd);
    formdata.append("dvdDrive", workStation.dvdDrive);
    formdata.append("processor", workStation.processor);
    formdata.append("memory", workStation.memory);
    formdata.append("image", image);
    formdata.append("operativeSystem", workStation.operativeSystem);
    formdata.append("graphicsCard", workStation.graphicsCard);
    formdata.append("application", workStation.application);
    formdata.append("description", workStation.description);
    formdata.append("cardsSupported", workStation.cardsSupported);
    formdata.append("maxMonitorsPerCard", workStation.maxMonitorsPerCard);
    formdata.append("maxMonitorPerWorkstation", workStation.maxMonitorPerWorkstation);
    formdata.append("gpuDecoding", workStation.gpuDecoding.toString());
    formdata.append("price", workStation.price);

    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url, formdata, {
      responseType: "json"
    });
    return this.http.request(req);
  }

  public updateWorkStation(workStation: WorkStation, image: File){
    let formdata: FormData = new FormData();

    formdata.append("id", workStation.id.toString());
    formdata.append("model", workStation.model);
    formdata.append("baseUnit", workStation.baseUnit);
    formdata.append("hdd", workStation.hdd);
    formdata.append("dvdDrive", workStation.dvdDrive);
    formdata.append("processor", workStation.processor);
    formdata.append("memory", workStation.memory);
    formdata.append("image", image);
    formdata.append("operativeSystem", workStation.operativeSystem);
    formdata.append("graphicsCard", workStation.graphicsCard);
    formdata.append("application", workStation.application);
    formdata.append("description", workStation.description);
    formdata.append("cardsSupported", workStation.cardsSupported);
    formdata.append("maxMonitorsPerCard", workStation.maxMonitorsPerCard);
    formdata.append("maxMonitorPerWorkstation", workStation.maxMonitorPerWorkstation);
    formdata.append("gpuDecoding", workStation.gpuDecoding.toString());
    formdata.append("price", workStation.price);


    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url + "update", formdata, {
      responseType: "json"
    });
    
    return this.http.request(req);
  }

  public deleteWorkStation(id) {
    return this.http.delete(this.url + id);
  }
}
