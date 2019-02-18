import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LicenseService } from '../license.service';
import { License } from '../../models/license.model';
import { HttpResponse } from '@angular/common/http';
import { CallOut } from 'src/app/utilities/callout';

@Component({
  selector: 'app-edit-license',
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.css'],
  encapsulation: ViewEncapsulation.None, 
})
export class EditLicenseComponent implements OnInit {

  license: License;
  formValid: boolean = true;
  loading: boolean = false;

  //Selects data
  types = ['BVMS Viewer', 'Bosch Video Client', 'BVMS']
  licenseTypes = ['Base', 'Expansion', 'Maintenance', 'Optional']
  bvmsVersions = ['9.0', '8.0', '7.5', '7.0', '6.5', '6.0']

  constructor(
    private router: Router,
    private licenseService: LicenseService,
  ) { }

  ngOnInit() {
    this.license = JSON.parse(sessionStorage.getItem('licenseElement'));

    if(this.license.type === 'BVMS'){
      document.getElementById('bvms-version').classList.remove('bvms-version')
    }
  }

  licenseTypeChange(event) {
    if( event.target.value === 'BVMS'){
      document.getElementById('bvms-version').classList.remove('bvms-version')
    }else{
      document.getElementById('bvms-version').classList.add('bvms-version')
    }
  }

  validateInput(event){
    if(event.target.value !== ''){
      event.target.classList.remove("warning-validation");
      event.target.classList.remove("error-validation");
      event.target.className += " success-validation"
    }else{
      event.target.classList.remove("success-validation");
      event.target.classList.remove("warning-validation");
      event.target.className += " error-validation"
    }

    let emptyValues = false;
    let elements = document.getElementsByTagName("input");
    
    for (let i = 0; i < elements.length; i++) {
      if(elements[i].value === undefined || elements[i].value === ''){
        emptyValues = true;
      }
    }

    if(!emptyValues){
      this.formValid = true;
    }else{
      this.formValid = false;
    }
  }

  updateLicense(){
    this.loading = true;
    
    let selectValue = (<HTMLInputElement>document.getElementById('type')).value;
    
    if(selectValue === 'BVMS'){
      this.license.version = (<HTMLInputElement>document.getElementById('version')).value;
    }else {
      this.license.version = '0';
    }

    this.licenseService.updateLicense(this.license).subscribe(
      (data: HttpResponse< {status: string } >) => {
        try{
          if(data.body.status === 'License updated'){
            this.loading = false;
            CallOut.added = true;
            this.router.navigate(["/consult-licenses"])
          }
        }catch (error) {
          console.log('No logrado')
        }  
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'The License has not updated.', 5000)     
      }
    );
  }

}
