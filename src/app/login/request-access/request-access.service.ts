import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Environment } from 'src/app/app.environment';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RequestAccessService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
  ) { }

  private requestMapping = "request-access/"

  private url = Environment.nodeServerURL + this.requestMapping;

  public requestAccess(user: User){
    let formData: FormData = new FormData();

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    
    const req = new HttpRequest("POST", this.url, formData, {
      responseType: "json"
    });

    return this.http.request(req);
  }
}
