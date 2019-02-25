import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Environment } from '../app.environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient
  ) { }

  private requestMapping = "users/";

  private url = Environment.nodeServerURL + this.requestMapping;

  public getUsers(){
    return this.http.get(this.url);
  }

  public updateUser(user: User){
    let formdata: FormData = new FormData();

    formdata.append("id", user.id.toString());
    formdata.append("verificate", user.verificate.toString());

    console.log(formdata.get('verificate'))
    const req = new HttpRequest("POST", this.url+"update", formdata, {
      responseType: "json"
    });

    return this.http.request(req);
  }

  public deleteUser(id){
    return this.http.delete(this.url+id)
  }
}
