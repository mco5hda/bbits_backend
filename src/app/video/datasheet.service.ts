import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasheetService {

  constructor(private http: HttpClient) { }

  //CONTROLLER METHOD
  private requestMapping = "http://localhost:3000/datasheet/manager";

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

    const req = new HttpRequest("POST", this.requestMapping, formdata, {
      responseType: "json"
    });
    return this.http.request(req);
  }
}
