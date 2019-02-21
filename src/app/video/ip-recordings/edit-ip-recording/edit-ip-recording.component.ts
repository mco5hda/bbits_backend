import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IPRecording } from '../../models/recordings/ip-recordings.model';
import { CallOut } from './../../../utilities/callout';
import { IpRecordingService } from '../ip-recording.service';
import { HttpResponse } from '@angular/common/http';
import { Accessory } from '../../models/accessory.model';
import { AccessoryService } from '../../accessories/accessory.service';
import { Environment } from 'src/app/app.environment';

@Component({
  selector: 'app-edit-ip-recording',
  templateUrl: './edit-ip-recording.component.html',
  styleUrls: ['./edit-ip-recording.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class EditIpRecordingComponent implements OnInit {

  ipRecording: IPRecording;
  currentTab: number = 0; // Current tab is set to be the first tab (0)

  categories = ["All in one","Storage only"];
  datasheetSelectedFiles: FileList;
  imageSelectedFiles: FileList;
  datasheetFile: File;
  imageFile: File;
  loading: boolean = false;

  accessories: Accessory[] = new Array();
  imagesAccessories: String[] = new Array();
  checkedAccessories: Boolean[] = new Array();
  
  constructor(
    private router: Router,
    private ipRecordingService: IpRecordingService,
    private accessoryService: AccessoryService,
    ) { }

  ngOnInit() {
    this.ipRecording = JSON.parse(sessionStorage.getItem("ipRecordingElement"));
    this.getAllAccessories();
    this.showTab(this.currentTab);//se muestra la etapa inicial del form
  }

  /*
  * Metodos para cargar y eliminar el datasheet y imagen
  */
  onLoadDataSheet(){
    let e = this;
    let uploader = (<HTMLInputElement>document.getElementById('file1')).files;
    this.datasheetSelectedFiles = uploader;
    this.ipRecording.datasheet = (<HTMLInputElement>document.getElementById('file1')).value;

    if(uploader[0] !== undefined){
        let input = '<div class="fileUploader-file">'
        input += '\n<svg xmlns="http://www.w3.org/2000/svg" class="fileUploader-file-icon" viewBox="0 0 192 192"><path d="M121.8 16H40v160h112V50.5L121.8 16zm2.2 14.6L139.2 48H124V30.6zM48 168V24h68v32h28v112H48z"/></svg>'
        input += '\n<div class="fileUploader-file-metadata">'
        input += '\n<div class="fileUploader-file-name">' + uploader[0].name + '</div>'
        input += '\n<div class="fileUploader-file-size">' + this.getUnitStorage(uploader[0].size) +'</div>'
        input += '\n</div>'
        input += '\n</div>'

        let button = '<button class="btn-DeleteAll" id="btn-delete-datasheet" type="button">\n'
        button += '<span class="delete-icon"><svg version="1.1" id="Icon_x5F_contour_1_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><g><path d="M152,56h-4H44h-4V40h24h64h24V56z M140,160c0,4.4-3.6,8-8,8H60c-4.4,0-8-3.6-8-8V64h16v56h8V64h16v56h8V64h16v56h8V64h16V160z M80,24h32c4.4,0,8,3.6,8,8H72C72,27.6,75.6,24,80,24 M160,32h-32c0-8.8-7.2-16-16-16H80c-8.8,0-16,7.2-16,16H32v32h12v96c0,8.8,7.2,16,16,16h72c8.8,0,16-7.2,16-16V64h12V32z"/></g></svg></span>\n'
        button += 'Delete\n'
        button += '</button>'

        document.getElementById('files-list').innerHTML = input+button;

        document.getElementById('btn-delete-datasheet').addEventListener("click", (event: Event) => {
          this.deleteFile();
        });
    }else{
        document.getElementById('files-list').classList.remove("hidden")
    }

  }

  preview_image(event):void  {
    let image = '<img class="img-responsive preview-image" id="previewImage">'

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

    this.ipRecording.image = (<HTMLInputElement>document.getElementById('uploaderImage')).value;
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
    this.ipRecording.image = '';
  }

  //Delete the files with uploader in the uploader
  deleteFile(): void{
    document.getElementById('files-list').innerHTML = '';
    this.ipRecording.datasheet = '';
  }

  //Return the storage unit according to file size
  getUnitStorage(value)
  {
      if (0 === value) return "0 Bytes";
      let t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
          n = Math.floor(Math.log(value) / Math.log(1024));
      return parseFloat((value / Math.pow(1024, n)).toFixed(0)) + " " + t[n]
  }


/*
 * Metodos para cambiar a cada seccion del formulario y que cambia cada etapa o step
 */
  showTab(n) {
    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    this.fixStepIndicator(n)
  }

  nextPrev(n) {
    // This function will figure out which tab to display
    let x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    // Exit the function if any field in the current tab is invalid:
    
    if (n == 1 && !this.validateForm()){
      window.scrollTo(0,0);
      CallOut.addCallOut('warning','Some inputs have no value. Please complete them before forward', 5000);
      return;
    }

    // Hide the current tab:
    x[this.currentTab].style.display = "none"

    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + n;

    // if you have reached the end of the form... :
    if (this.currentTab >= x.length) {
      //...the form gets submitted:
      this.updateIPRecording();
      return false;
    }
    // Otherwise, display the correct tab:
    this.showTab(this.currentTab);

  }

  fixStepIndicator(n): void{
    // This function removes the "active" class of all steps...
    let x = document.getElementsByClassName("step");
    for (let i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }

    for (let i = 0; i <= this.currentTab; i++) {
      x[i].className+=" active";
    }

    //... and adds the "active" class to the current step:
    //x[n].className += " active";

    window.scrollTo(0,0);
  }

  validateForm(): boolean{
    // This function deals with validation of the form fields
    let elements = undefined;
    let valid = true;

    let x = document.getElementsByClassName("tab");
    elements = x[this.currentTab].getElementsByTagName("input");

    // A loop that checks every input field in the current tab:

    for (let i = 0; i < elements.length; i++) {
      // If a field is empty...
      if (elements[i].value == "") {
        // add an "invalid" class to the field:
        elements[i].className += " invalid";
        // and set the current valid status to false
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[this.currentTab].className += " active";
    }

    return valid; // return the valid status
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
  }
  /*
  * Metodo para crear registrar una nueva camara
  */
  updateIPRecording(){
    this.loading = true;
    this.imageFile = this.imageSelectedFiles.item(0);
    this.datasheetFile = this.datasheetSelectedFiles.item(0);

    //Clean the list of accessories
    this.ipRecording.accessories = new Array();

    let accessories = document.getElementsByClassName('accessories');
    
    for(let i = 0; i< accessories.length; i++){
      let element = <HTMLInputElement>accessories[i];
      
      if(element.checked === true){
        let accessory: Accessory = new Accessory();
        accessory.id = Number.parseInt(element.id);
        this.ipRecording.accessories.push(accessory)
      }
    }

    this.ipRecordingService.updateIPRecording(this.ipRecording, this.datasheetFile, this.imageFile)
    .subscribe(
      (data: HttpResponse< { status :  string }> ) => {
        try {
          if(data.body.status === 'IP Recording updated'){
            this.loading = false;
            CallOut.updated = true;
            this.router.navigate(["/consult-ip-recordings"])
          }
        } catch (error) {
          console.log('No logrado')
        }  
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'The IP Recording has not updated.', 5000)     
      }
    );
    CallOut.updated = true;
    this.router.navigate(["/consult-ip-recordings"])
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

      if(accessory.image.includes('imagecache')){
        this.imagesAccessories.push(Environment.imageSelectorURL + accessory.image);
      }else{
        this.imagesAccessories.push(Environment.nodeServerURL+'static/assets/video/accessories/images/'+accessory.id+'-'+accessory.image);
      }

      if(this.ipRecording.accessories.some(e => e.id === accessory.id)){
        this.checkedAccessories.push(true);
      }else{
        this.checkedAccessories.push(false);
      }

      this.accessories.push(accessory)
    });
  }
}
