import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
import { Environment } from 'src/app/app.environment';
import { User } from 'src/app/models/user.model';
import { Md5 } from 'md5-typescript'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
  ) { }

  private requestMapping = "register/"

  private url = Environment.nodeServerURL + this.requestMapping;

  public register(user: User){
    let formData: FormData = new FormData();

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", Md5.init(user.password));
    
    const req = new HttpRequest("POST", this.url, formData, {
      responseType: "json"
    });

    return this.http.request(req);
  }
}
