import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { License } from '../../models/license.model';
import { Environment } from 'src/app/app.environment';
import { Router } from '@angular/router';
import { LicenseService } from '../license.service';
import { CallOut } from 'src/app/utilities/callout';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';

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
    private dialogService: DialogService,
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
        this.fillList(data);
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
        if(key === 'id'){
          license.id = element[key];
        }else if(key === 'name'){
          license.name = element[key];
        }else if(key === 'ctnClassFull'){
          license.ctnClassFull = element[key];
        }else if(key === 'type'){
          license.type = element[key];
        }else if(key === 'licenseType'){
          license.licenseType = element[key];
        }else if(key === 'includedChannels'){
          license.channelsIncluded = element[key];
        }else if(key === 'maxChannels'){
          license.maxChannels = element[key];
        }else if(key === 'price'){
          license.price = element[key];
        }else if(key === 'version'){
          license.version = element[key];
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
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if ( res ){
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
    );    
  }
}
