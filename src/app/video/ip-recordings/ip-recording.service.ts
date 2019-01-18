import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Environment } from 'src/app/app.environment';
import { IPRecording } from '../models/recordings/ip-recordings.model';

@Injectable({
  providedIn: 'root'
})
export class IpRecordingService {

  httpOptions = {
    headera: new HttpHeaders({ "Content-Type": "application/json"})
  };

  constructor(
    private http: HttpClient
  ) { }

  //THE CONTROLLER METHOD
  private requestMapping = "iprecordings/";

  //OBTAINS THE HTTP URL
  private url = Environment.nodeServerURL + this.requestMapping;

  public getIPRecordings(){
    return this.http.get(this.url)
  }

  public createIPRecording(ipRecording: IPRecording, datasheet: File, image: File){
    let formdata: FormData = new FormData();

    formdata.append("name", ipRecording.name);
    formdata.append("family", ipRecording.family);
    formdata.append("category", ipRecording.category);
    formdata.append("ctnClass", ipRecording.ctnClass);
    formdata.append("ctnClassFull", ipRecording.ctnClassFull);
    formdata.append("price", ipRecording.price);
    formdata.append("dataFormat", ipRecording.dataFormat);
    formdata.append("image", image);
    formdata.append("datasheet", datasheet);
    formdata.append("basicFeatures", JSON.stringify(ipRecording.basicFeatures));
    formdata.append("advancedFeatures", JSON.stringify(ipRecording.advancedFeatures));
    formdata.append("aioFunctions", JSON.stringify(ipRecording.aioFunctions));
    formdata.append("audio", JSON.stringify(ipRecording.audio));
    formdata.append("backUp", JSON.stringify(ipRecording.backUp));
    formdata.append("integration", JSON.stringify(ipRecording.integration));
    formdata.append("larViewing", JSON.stringify(ipRecording.larViewing));
    formdata.append("mechanical", JSON.stringify(ipRecording.mechanical));
    formdata.append("recording", JSON.stringify(ipRecording.recording));
    formdata.append("storageExtensions", JSON.stringify(ipRecording.storageExtensions));
    formdata.append("storageOptions", JSON.stringify(ipRecording.storageOptions));
    formdata.append("videoOutput", JSON.stringify(ipRecording.videoOutput));


    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url, formdata, {
      responseType: "json"
    });
    return this.http.request(req);
  }

  public updateIPRecording(ipRecording: IPRecording, datasheet: File, image: File){
    let formdata: FormData = new FormData();

    formdata.append("id", ipRecording.id.toString());
    formdata.append("name", ipRecording.name);
    formdata.append("family", ipRecording.family);
    formdata.append("category", ipRecording.category);
    formdata.append("ctnClass", ipRecording.ctnClass);
    formdata.append("ctnClassFull", ipRecording.ctnClassFull);
    formdata.append("price", ipRecording.price);
    formdata.append("dataFormat", ipRecording.dataFormat);
    formdata.append("image", image);
    formdata.append("datasheet", datasheet);
    formdata.append("basicFeatures", JSON.stringify(ipRecording.basicFeatures));
    formdata.append("advancedFeatures", JSON.stringify(ipRecording.advancedFeatures));
    formdata.append("aioFunctions", JSON.stringify(ipRecording.aioFunctions));
    formdata.append("audio", JSON.stringify(ipRecording.audio));
    formdata.append("backUp", JSON.stringify(ipRecording.backUp));
    formdata.append("integration", JSON.stringify(ipRecording.integration));
    formdata.append("larViewing", JSON.stringify(ipRecording.larViewing));
    formdata.append("mechanical", JSON.stringify(ipRecording.mechanical));
    formdata.append("recording", JSON.stringify(ipRecording.recording));
    formdata.append("storageExtensions", JSON.stringify(ipRecording.storageExtensions));
    formdata.append("storageOptions", JSON.stringify(ipRecording.storageOptions));
    formdata.append("videoOutput", JSON.stringify(ipRecording.videoOutput));


    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url + "update", formdata, {
      responseType: "json"
    });
    
    return this.http.request(req);
  }

  public deleteIPRecording(id) {
    return this.http.delete(this.url + id);
  }
}
