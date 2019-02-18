import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Environment } from 'src/app/app.environment';
import { License } from '../models/license.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
  ) { }

  private requestMapping = "licenses/"

  private url = Environment.nodeServerURL + this.requestMapping;

  public getLicenses(){
    return this.http.get(this.url);
  }

  public createLicense(license: License){
    let formdata: FormData = new FormData();

    formdata.append("name", license.name);
    formdata.append("ctnClassFull", license.ctnClassFull);
    formdata.append("type", license.type);
    formdata.append("licenseType", license.licenseType);
    formdata.append("channelsIncluded", license.channelsIncluded.toString());
    formdata.append("maxChannels", license.maxChannels.toString());
    formdata.append("price", license.price);
    formdata.append("version", license.version);

    const req = new HttpRequest("POST", this.url, formdata, {
      responseType: "json"
    });

    return this.http.request(req);
  }

  public updateLicense(license: License){
    let formdata: FormData = new FormData();

    formdata.append("id", license.id.toString());
    formdata.append("name", license.name);
    formdata.append("ctnClassFull", license.ctnClassFull);
    formdata.append("type", license.type);
    formdata.append("licenseType", license.licenseType);
    formdata.append("channelsIncluded", license.channelsIncluded.toString());
    formdata.append("maxChannels", license.maxChannels.toString());
    formdata.append("price", license.price);
    formdata.append("version", license.version);

    const req = new HttpRequest("POST", this.url+"update", formdata, {
      responseType: "json"
    });

    return this.http.request(req);
  }

  public deleteLicense(id) {
    return this.http.delete(this.url + id);
  }
}
