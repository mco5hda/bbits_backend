import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { WorkStation } from '../../models/workstation.model';
import { CallOut} from './../../../utilities/callout';
import { WorkstationService } from '../workstation.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-workstation',
  templateUrl: './add-workstation.component.html',
  styleUrls: ['./add-workstation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddWorkstationComponent implements OnInit {
  workstation: WorkStation = new WorkStation();
  formValid = false;
  loading: boolean = false;
  imageSelectedFiles: FileList;
  imageFile: File;

  constructor( 
    private router: Router,
    private workStationService: WorkstationService,
  ) { }

  ngOnInit() {
  }

  preview_image(event):void  {
    let image = '<img class="img-responsive" id="previewImage">'

    let button = '<button class="btn-DeleteAll" id="btn-delete-preview-image" type="button">\n'
    button += '<span class="delete-icon"><svg version="1.1" id="Icon_x5F_contour_1_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><g><path d="M152,56h-4H44h-4V40h24h64h24V56z M140,160c0,4.4-3.6,8-8,8H60c-4.4,0-8-3.6-8-8V64h16v56h8V64h16v56h8V64h16v56h8V64h16V160z M80,24h32c4.4,0,8,3.6,8,8H72C72,27.6,75.6,24,80,24 M160,32h-32c0-8.8-7.2-16-16-16H80c-8.8,0-16,7.2-16,16H32v32h12v96c0,8.8,7.2,16,16,16h72c8.8,0,16-7.2,16-16V64h12V32z"/></g></svg></span>\n'
    button += 'Delete\n'
    button += '</button>'

    document.getElementById('image-list').innerHTML = image+button;


    let reader = new FileReader();
    reader.onload = function()
    {
      let output = (<HTMLImageElement>document.getElementById('previewImage'));
      output.src = reader.result.toString();
    }
    reader.readAsDataURL(event.target.files[0]);

    this.workstation.image = (<HTMLInputElement>document.getElementById('uploaderImage')).value;
    let uploader = (<HTMLInputElement>document.getElementById('uploaderImage')).files;
    this.imageSelectedFiles = uploader;
    document.getElementById('image-list').classList.remove("image-list")

    document.getElementById('btn-delete-preview-image').addEventListener("click", (event: Event) => {
      this.deletePreviewImage();
    });
  }

  //Delete the files with uploader in the uploader
  deletePreviewImage():void{
    (<HTMLInputElement>document.getElementById('uploaderImage')).value = '';
    document.getElementById('image-list').innerHTML = '';
    this.workstation.image = '';
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

  /*
  * Metodo para crear registrar una nueva camara
  */
  addWorkStation(){
    this.loading = true;
    this.imageFile = this.imageSelectedFiles.item(0);

    this.workStationService.createWorkStation(this.workstation, this.imageFile).subscribe(
      (data: HttpResponse< { status: string }> ) => {
        try{
          if(data.body.status === 'Workstation added'){
            this.loading = false;
            CallOut.added = true;
            this.router.navigate(["/consult-workstations"])
          }
        }catch (error) {
          this.loading = false;
          CallOut.addCallOut('error', 'The Workstation has not added.', 5000)     
        }
      }
    );
  }
}
