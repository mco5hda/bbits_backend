import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { License } from '../../models/license.model';
import { Environment } from 'src/app/app.environment';
import { Router } from '@angular/router';
import { LicenseService } from '../license.service';
import { CallOut } from 'src/app/utilities/callout';

@Component({
  selector: 'app-consult-licenses',
  templateUrl: './consult-licenses.component.html',
  styleUrls: ['./consult-licenses.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultLicensesComponent implements OnInit {
  
  loading:boolean = false;
  licenses: License[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;
  
  constructor(
    private router: Router,
    private licenseService: LicenseService,
  ) { }

  ngOnInit() {
    this.getAllLicenses();

    if(CallOut.added){
      CallOut.addCallOut('success', 'License added successfully', 5000);
      CallOut.added = false;
    }else if(CallOut.updated){
      CallOut.addCallOut('success', 'License updated successfully', 5000);
      CallOut.updated = false;
    }else if(CallOut.deleted){
      CallOut.addCallOut('success', 'License deleted successfully', 5000);
      CallOut.deleted = false;
    }
  }

  getAllLicenses(){
    this.loading = true;

    this.licenseService.getLicenses().subscribe(
      data => {
        this.fillList(data[0]);
        this.loading = false;
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'Not found elements. Retry again.', 5000)
      }
    );
  }

  fillList(data){
    data.forEach(element => {
      let license: License = new License();
      for(let key in element){
        if(key === 'ID'){
          license.id = element[key];
        }else if(key === 'NAME'){
          license.name = element[key];
        }else if(key === 'CTN_CLASS_FULL'){
          license.ctnClassFull = element[key];
        }else if(key === 'TYPE'){
          license.type = element[key];
        }else if(key === 'LICENSE_TYPE'){
          license.licenseType = element[key];
        }else if(key === 'INCLUDED_CHANNELS'){
          license.channelsIncluded = element[key];
        }else if(key === 'MAX_CHANNELS'){
          license.maxChannels = element[key];
        }else if(key === 'PRICE'){
          license.price = element[key];
        }
      }

      this.licenses.push(license)
    });
  }

  editLicense(id: number){
    let license: License;

    this.licenses.forEach(element => {
      if(element.id === id){
        license = element;
      }
    });
  
    sessionStorage.setItem("licenseElement", JSON.stringify(license));
    this.router.navigate(["/edit-license"]);
  }

  deleteLicense(id: number){
    this.loading = true;

    this.licenseService.deleteLicense(id).subscribe(
      (data) => {
        try{
          if(data['status'] === 'License deleted'){
            this.loading = false;
            this.licenses = this.licenses.filter(c => c.id !== id);
            CallOut.addCallOut('success', 'License deleted', 5000);
          }
        }catch (error) {
          console.log('No logrado')
        } 
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'The License has not deleted.', 5000)     
      }
    );
  }
}
