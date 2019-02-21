import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { AnalogRecording } from '../models/recordings/analog-recordings.model';
import { Environment } from 'src/app/app.environment';

@Injectable({
  providedIn: 'root'
})
export class AnalogRecordingService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  };

  constructor(
    private http: HttpClient
  ) { }

  //THE CONTROLLER METHOD
  private requestMapping = "analogrecordings/";

  //OBTAINS THE HTTP URL
  private url = Environment.nodeServerURL + this.requestMapping;

  public getAnalogRecordings(){
    return this.http.get(this.url)
  }

  public createAnalogRecording(analogRecording: AnalogRecording, datasheet: File, image: File){
    let formdata: FormData = new FormData();
 
    formdata.append("name", analogRecording.name);
    formdata.append("family", analogRecording.family);
    formdata.append("category", analogRecording.category);
    formdata.append("ctnClass", analogRecording.ctnClass);
    formdata.append("ctnClassFull", analogRecording.ctnClassFull);
    formdata.append("price", analogRecording.price);
    formdata.append("dataFormat", analogRecording.dataFormat);
    formdata.append("inputRelayOutputs", analogRecording.inputRelayOutputs);
    formdata.append("targetSystemSize", analogRecording.targetSystemSize);
    formdata.append("userLevels", analogRecording.userLevels);
    formdata.append("timeLine", analogRecording.timeLine.toString());
    formdata.append("image", image);
    formdata.append("datasheet", datasheet);
    formdata.append("accessories", JSON.stringify(analogRecording.accessories));
    formdata.append("basicFeatures", JSON.stringify(analogRecording.basicFeatures));
    formdata.append("advancedFeatures", JSON.stringify(analogRecording.advancedFeatures));
    formdata.append("aioFunctions", JSON.stringify(analogRecording.aioFunctions));
    formdata.append("audio", JSON.stringify(analogRecording.audio));
    formdata.append("integration", JSON.stringify(analogRecording.integration));
    formdata.append("larViewing", JSON.stringify(analogRecording.larViewing));
    formdata.append("recording", JSON.stringify(analogRecording.recording));
    formdata.append("storageOptions", JSON.stringify(analogRecording.storageOptions));
    formdata.append("videoOutput", JSON.stringify(analogRecording.videoOutput));


    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url, formdata, {
      responseType: "json"
    });
    return this.http.request(req);
  }

  public updateAnalogRecording(analogRecording: AnalogRecording, datasheet: File, image: File){
    let formdata: FormData = new FormData();

    formdata.append("id", analogRecording.id.toString());
    formdata.append("name", analogRecording.name);
    formdata.append("family", analogRecording.family);
    formdata.append("category", analogRecording.category);
    formdata.append("ctnClass", analogRecording.ctnClass);
    formdata.append("ctnClassFull", analogRecording.ctnClassFull);
    formdata.append("price", analogRecording.price);
    formdata.append("dataFormat", analogRecording.dataFormat);
    formdata.append("inputRelayOutputs", analogRecording.inputRelayOutputs);
    formdata.append("targetSystemSize", analogRecording.targetSystemSize);
    formdata.append("userLevels", analogRecording.userLevels);
    formdata.append("timeLine", analogRecording.timeLine.toString());
    formdata.append("image", image);
    formdata.append("datasheet", datasheet);
    formdata.append("accessories", JSON.stringify(analogRecording.accessories));
    formdata.append("basicFeatures", JSON.stringify(analogRecording.basicFeatures));
    formdata.append("advancedFeatures", JSON.stringify(analogRecording.advancedFeatures));
    formdata.append("aioFunctions", JSON.stringify(analogRecording.aioFunctions));
    formdata.append("audio", JSON.stringify(analogRecording.audio));
    formdata.append("integration", JSON.stringify(analogRecording.integration));
    formdata.append("larViewing", JSON.stringify(analogRecording.larViewing));
    formdata.append("recording", JSON.stringify(analogRecording.recording));
    formdata.append("storageOptions", JSON.stringify(analogRecording.storageOptions));
    formdata.append("videoOutput", JSON.stringify(analogRecording.videoOutput));


    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url + "update", formdata, {
      responseType: "json"
    });
    
    return this.http.request(req);
  }

  public deleteAnalogRecording(id) {
    return this.http.delete(this.url + id);
  }

  public getAnalogRecordingAccessories(id){
    return this.http.get(this.url +"accessories/"+id)
  }
}
