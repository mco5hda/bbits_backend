import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { License } from '../../models/license.model';
import { LicenseService } from '../license.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { CallOut } from 'src/app/utilities/callout';

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddLicenseComponent implements OnInit {
  license: License = new License();
  formValid = false;
  loading: boolean = false;

  //Selects data
  types = ['BVMS Viewer', 'Bosch Video Client', 'BVMS']
  licenseTypes = ['Base', 'Expansion', 'Maintenance', 'Optional']

  constructor(
    private router: Router,
    private licenseService: LicenseService
  ) { }

  ngOnInit() {
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

  addLicense(){
    this.loading = true;
    
    this.licenseService.createLicense(this.license).subscribe(
      (data: HttpResponse< {status: string } >) => {
        try{
          if(data.body.status === 'License added'){
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
        CallOut.addCallOut('error', 'The License has not added.', 5000)     
      }
    );
  }
}
