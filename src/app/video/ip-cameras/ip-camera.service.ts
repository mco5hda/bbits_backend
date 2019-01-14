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
    headera: new HttpHeaders({ "Content-Type": "application/json"})
  };

  constructor(
    private http: HttpClient
  ) { }

  //THE CONTROLLER METHOD
  private requestMapping = "ip-camera/";

  //OBTAINS THE HTTP URL
  private url = Environment.nodeServerURL + this.requestMapping;

  public getIPCameras(){
    return this.http.get(this.url)
  }

  public createIPCamera(ipCamera: IPCamera){
    let formdata: FormData = new FormData();

    formdata.append("ipCamera", JSON.stringify(ipCamera));


    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url, formdata, {
      responseType: "json"
    });
    return this.http.request(req);
  }

  public updateIPCamera(ipCamera: IPCamera, file: File, image: File){
    let formdata: FormData = new FormData();

    formdata.append("ipCamera", JSON.stringify(ipCamera));

    //CREATE THE REQUEST OBJECT WITH THE PARAMETERS (TYPE, URL, DATA, RESPONSE DATA)
    const req = new HttpRequest("POST", this.url + "update", formdata, {
      responseType: "json"
    });
    return this.http.request(req);
  }

  public deleteIPCamera(ipCamera) {
    return this.http.delete(this.url + ipCamera.id);
  }
}
