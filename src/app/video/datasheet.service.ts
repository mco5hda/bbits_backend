import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Environment } from '../app.environment';

@Injectable({
  providedIn: 'root'
})
export class DatasheetService {

  constructor(private http: HttpClient) { }

  //CONTROLLER METHOD
  private requestMapping = "datasheet/manager";

  private url = Environment.nodeServerURL + this.requestMapping; 
  //INDICATES TO HTTP HEADERS TO WORK WITH JSON CONTENT
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  //OBTAINS A INVESTIGATION BY ID USING GET METHOD
  public getDatasheetInformation( datasheet : File, productType : string) {

    let formdata: FormData = new FormData();

    //ATTACH THE FILE AND THE Document TO SEND IT TO THE API
    formdata.append("datasheet", datasheet);
    formdata.append("productType", productType);

    const req = new HttpRequest("POST", this.url, formdata, {
      responseType: "json"
    });
    return this.http.request(req);
  }
}
