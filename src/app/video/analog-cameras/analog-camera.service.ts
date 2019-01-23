import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Environment } from 'src/app/app.environment';
import { AnalogCamera } from '../models/cameras/analog-cameras.model';

@Injectable({
  providedIn: 'root'
})
export class AnalogCameraService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  };

  constructor(
    private http: HttpClient
  ) { }

  //THE CONTROLLER METHOD
  private requestMapping = "analogcameras/";

  //OBTAINS THE HTTP URL
  private url = Environment.nodeServerURL + this.requestMapping;

  public getAnalogCameras(){
    return this.http.get(this.url)
  }

  public createAnalogCamera(analogCamera: AnalogCamera, datasheet: File, image: File){
    let formdata: FormData = new FormData();

    formdata.append("name", analogCamera.name);
    formdata.append("family", analogCamera.family);
    formdata.append("category", analogCamera.category);
    formdata.append("ctnClass", analogCamera.ctnClass);
    formdata.append("ctnClassFull", analogCamera.ctnClassFull);
    formdata.append("price", analogCamera.price);
    formdata.append("image", image);
    formdata.append("datasheet", datasheet);
    formdata.append("basicFeatures", JSON.stringify(analogCamera.basicFeatures));
    formdata.append("advancedFeatures", JSON.stringify(analogCamera.advancedFeatures));
    formdata.append("alarmTriggering", JSON.stringify(analogCamera.alarmTriggering));
    formdata.append("sensitivity", JSON.stringify(analogCamera.sensitivity));
    formdata.append("lens", JSON.stringify(analogCamera.lens));
    formdata.append("connections", JSON.stringify(analogCamera.connections));
    formdata.append("housing", JSON.stringify(analogCamera.housing));

    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url, formdata, {
      responseType: "json"
    });
    return this.http.request(req);
  }

  public updateAnalogCamera(analogCamera: AnalogCamera, datasheet: File, image: File){
    let formdata: FormData = new FormData();

    formdata.append("id", analogCamera.id.toString());
    formdata.append("name", analogCamera.name);
    formdata.append("family", analogCamera.family);
    formdata.append("category", analogCamera.category);
    formdata.append("ctnClass", analogCamera.ctnClass);
    formdata.append("ctnClassFull", analogCamera.ctnClassFull);
    formdata.append("price", analogCamera.price);
    formdata.append("image", image);
    formdata.append("datasheet", datasheet);
    formdata.append("basicFeatures", JSON.stringify(analogCamera.basicFeatures));
    formdata.append("advancedFeatures", JSON.stringify(analogCamera.advancedFeatures));
    formdata.append("alarmTriggering", JSON.stringify(analogCamera.alarmTriggering));
    formdata.append("sensitivity", JSON.stringify(analogCamera.sensitivity));
    formdata.append("lens", JSON.stringify(analogCamera.lens));
    formdata.append("connections", JSON.stringify(analogCamera.connections));
    formdata.append("housing", JSON.stringify(analogCamera.housing));


    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url + "update", formdata, {
      responseType: "json"
    });
    
    return this.http.request(req);
  }

  public deleteAnalogCamera(id) {
    return this.http.delete(this.url + id);
  }
}
