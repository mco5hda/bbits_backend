import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Accessory } from '../../models/accessory.model';
import { Environment } from 'src/app/app.environment';
import { Router } from '@angular/router';
import { AccessoryService } from '../accessory.service';
import { CallOut } from 'src/app/utilities/callout';


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
  

  constructor(
    private router: Router,
    private accessoryService: AccessoryService,
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
      let accessory: Accessory = new Accessory();

      for(let key in element){
        if(key === 'ID'){
          accessory.id = element[key];
        }else if(key === 'NAME'){
          accessory.name = element[key];
        }else if(key === 'CATEGORY'){
          accessory.category = element[key];
        }else if(key === 'SUB_CATEGORY'){
          accessory.subCategory = element[key];
        }else if(key === 'IMAGE'){
          accessory.image = element[key];
        }else if(key === 'CTN_CLASS'){
          accessory.ctnClass = element[key];
        }else if(key === 'CTN_CLASS_FULL'){
          accessory.ctnClassFull = element[key];
        }else if(key === 'DESCRIPTION'){
          accessory.description = element[key];
        }else if(key === 'PRICE'){
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
    )
  }
}
