import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Accessory } from '../../models/accessory.model';
import { Environment } from 'src/app/app.environment';
import { Router } from '@angular/router';
import { AccessoryService } from '../accessory.service';
import { CallOut } from 'src/app/utilities/callout';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-consult-accessories',
  templateUrl: './consult-accessories.component.html',
  styleUrls: ['./consult-accessories.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultAccessoriesComponent implements OnInit {

  loading:boolean = false;
  accessories: Accessory[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;
  
  animal: string;
  name: string;
  constructor(
    private router: Router,
    private accessoryService: AccessoryService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.getAllAccessories();

    if(CallOut.added){
      CallOut.addCallOut('success', 'Accessory added successfully', 5000);
      CallOut.added = false;
    }else if(CallOut.updated){
      CallOut.addCallOut('success', 'Accessory updated successfully', 5000);
      CallOut.updated = false;
    }else if(CallOut.deleted){
      CallOut.addCallOut('success', 'Accessory deleted successfully', 5000);
      CallOut.deleted = false;
    }
  }

  getAllAccessories(){
    this.loading = true;

    this.accessoryService.getAccessories().subscribe(
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
      let accessory: Accessory = new Accessory();

      for(let key in element){
        if(key === 'id'){
          accessory.id = element[key];
        }else if(key === 'name'){
          accessory.name = element[key];
        }else if(key === 'category'){
          accessory.category = element[key];
        }else if(key === 'subCategory'){
          accessory.subCategory = element[key];
        }else if(key === 'image'){
          accessory.image = element[key];
        }else if(key === 'ctnClass'){
          accessory.ctnClass = element[key];
        }else if(key === 'ctnClassFull'){
          accessory.ctnClassFull = element[key];
        }else if(key === 'description'){
          accessory.description = element[key];
        }else if(key === 'price'){
          accessory.price = element[key];
        }
      }

      this.accessories.push(accessory)
    });
  }

  detailsAccessory(id: number){
    let accessory: Accessory;

    this.accessories.forEach(element => {
      if(element.id === id){
        accessory = element;
      }
    });

    sessionStorage.setItem("accessoryElement", JSON.stringify(accessory));
    this.router.navigate(["/details-accessory"]);
  }

  editAccessory(id: number){
    let accessory: Accessory;

    this.accessories.forEach(element => {
      if(element.id === id){
        accessory = element;
      }
    });

    sessionStorage.setItem("accessoryElement", JSON.stringify(accessory));
    this.router.navigate(["/edit-accessory"]);
  }

  deleteAccessory(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if( res ) {
          this.loading = true;

          this.accessoryService.deleteAccessory(id).subscribe(
            (data) => {
              try{
                if(data['status'] === 'Accessory deleted'){
                  this.loading = false;
                  this.accessories = this.accessories.filter( c => c.id !== id);
                  CallOut.addCallOut('success', 'Accessory deleted succesfully.', 5000);
                }
              }catch(error){
                console.log('No logrado')
              }
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The accessory has not deleted', 5000);
            }
          );
        }
      }
    );
  }
}
