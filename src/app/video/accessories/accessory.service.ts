import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Environment } from 'src/app/app.environment';
import { Accessory } from '../models/accessory.model';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient
  ) { }

  private requestMapping = "accessories/";

  private url = Environment.nodeServerURL + this.requestMapping;

  public getAccessories(){
    return this.http.get(this.url);
  }

  public createAccessory(accessory: Accessory, image: File){
    let formdata: FormData = new FormData();

    formdata.append("name", accessory.name);
    formdata.append("category", accessory.category);
    formdata.append("subCategory", accessory.subCategory);
    formdata.append("image", image)
    formdata.append("ctnClass", accessory.ctnClass);
    formdata.append("ctnClassFull", accessory.ctnClassFull);
    formdata.append("description", accessory.description);
    formdata.append("price", accessory.price);

    const req = new HttpRequest("POST", this.url, formdata, {
      responseType: "json"
    });

    return this.http.request(req);
  }

  public updateAccessory(accessory: Accessory, image: File){
    let formdata: FormData = new FormData();

    formdata.append("id", accessory.id.toString());
    formdata.append("name", accessory.name);
    formdata.append("category", accessory.category);
    formdata.append("subCategory", accessory.subCategory);
    formdata.append("image", image)
    formdata.append("ctnClass", accessory.ctnClass);
    formdata.append("ctnClassFull", accessory.ctnClassFull);
    formdata.append("description", accessory.description);
    formdata.append("price", accessory.price);

    const req = new HttpRequest("POST", this.url+"update", formdata, {
      responseType: "json"
    });

    return this.http.request(req);
  }

  public deleteAccessory(id: number){
    return this.http.delete(this.url+id)
  }
}
