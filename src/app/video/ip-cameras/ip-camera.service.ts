import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Environment } from 'src/app/app.environment';
import { IPCamera } from '../models/cameras/ip-cameras.model';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class IpCameraService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  };

  constructor(
    private http: HttpClient
  ) { }

  //THE CONTROLLER METHOD
  private requestMapping = "ipcameras/";

  //OBTAINS THE HTTP URL
  private url = Environment.nodeServerURL + this.requestMapping;

  public getIPCameras(){
    return this.http.get(this.url)
  }

  public createIPCamera(ipCamera: IPCamera, datasheet: File, image: File){
    let formdata: FormData = new FormData();

    formdata.append("name", ipCamera.name);
    formdata.append("family", ipCamera.family);
    formdata.append("category", ipCamera.category);
    formdata.append("ctnClass", ipCamera.ctnClass);
    formdata.append("ctnClassFull", ipCamera.ctnClassFull);
    formdata.append("price", ipCamera.price);
    formdata.append("image", image);
    formdata.append("datasheet", datasheet);
    formdata.append("basicFeatures", JSON.stringify(ipCamera.basicFeatures));
    formdata.append("advancedFeatures", JSON.stringify(ipCamera.advancedFeatures));
    formdata.append("alarmTriggering", JSON.stringify(ipCamera.alarmTriggering));
    formdata.append("sensitivity", JSON.stringify(ipCamera.sensitivity));
    formdata.append("lens", JSON.stringify(ipCamera.lens));
    formdata.append("dcri", JSON.stringify(ipCamera.dcri));
    formdata.append("storage", JSON.stringify(ipCamera.storage));
    formdata.append("connections", JSON.stringify(ipCamera.connections));
    formdata.append("housing", JSON.stringify(ipCamera.housing));

    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url, formdata, {
      responseType: "json"
    });
    return this.http.request(req);
  }

  public updateIPCamera(ipCamera: IPCamera, datasheet: File, image: File){
    let formdata: FormData = new FormData();

    formdata.append("id", ipCamera.id.toString());
    formdata.append("name", ipCamera.name);
    formdata.append("family", ipCamera.family);
    formdata.append("category", ipCamera.category);
    formdata.append("ctnClass", ipCamera.ctnClass);
    formdata.append("ctnClassFull", ipCamera.ctnClassFull);
    formdata.append("price", ipCamera.price);
    formdata.append("image", image);
    formdata.append("datasheet", datasheet);
    formdata.append("basicFeatures", JSON.stringify(ipCamera.basicFeatures));
    formdata.append("advancedFeatures", JSON.stringify(ipCamera.advancedFeatures));
    formdata.append("alarmTriggering", JSON.stringify(ipCamera.alarmTriggering));
    formdata.append("sensitivity", JSON.stringify(ipCamera.sensitivity));
    formdata.append("lens", JSON.stringify(ipCamera.lens));
    formdata.append("dcri", JSON.stringify(ipCamera.dcri));
    formdata.append("storage", JSON.stringify(ipCamera.storage));
    formdata.append("connections", JSON.stringify(ipCamera.connections));
    formdata.append("housing", JSON.stringify(ipCamera.housing));


    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url + "update", formdata, {
      responseType: "json"
    });
    
    return this.http.request(req);
  }

  public deleteIPCamera(id) {
    return this.http.delete(this.url + id);
  }
}
