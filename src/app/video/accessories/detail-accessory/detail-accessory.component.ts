import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Accessory } from '../../models/accessory.model';
import { AccessoryService } from '../accessory.service';
import { Router } from '@angular/router';
import { Environment } from 'src/app/app.environment';
import { CallOut } from 'src/app/utilities/callout';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';

@Component({
  selector: 'app-detail-accessory',
  templateUrl: './detail-accessory.component.html',
  styleUrls: ['./detail-accessory.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailAccessoryComponent implements OnInit {

  accessory: Accessory;
  image: string = '';
  loading = false;

  constructor(
    private router: Router,
    private accessoryService: AccessoryService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.accessory = JSON.parse(sessionStorage.getItem("accessoryElement"));

    if(this.accessory.image.includes('imagecache')){
      this.image = Environment.imageSelectorURL + this.accessory.image;
    }else{
      this.image = Environment.nodeServerURL+'static/assets/video/accessories/images/'+this.accessory.id+'-'+this.accessory.image;
    }
  }

  editAccessory(){
    sessionStorage.setItem("accessoryElement", JSON.stringify(this.accessory));
    this.router.navigate(["/edit-accessory"]);
  }

  deleteAccessory(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if ( res ){
          this.loading = true;

          this.accessoryService.deleteAccessory(id).subscribe(
            (data) => {
              try{
                if(data['status'] === 'Accessory deleted'){
                  this.loading = false;
                  CallOut.deleted = true;
                  this.router.navigate(['/consult-accessories']);
                }
              }catch (error) {
                console.log('No logrado')
              }  
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The accessory has not deleted.', 5000)     
            }
          )
        }
      }
    )
  }

}
