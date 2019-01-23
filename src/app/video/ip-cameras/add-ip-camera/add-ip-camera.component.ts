import { Component, OnInit, ViewEncapsulation, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { IPCamera } from '../../models/cameras/ip-cameras.model';
import { DatasheetService } from '../../datasheet.service';
import { IpCameraService } from '../ip-camera.service';
import { CallOut } from './../../../utilities/callout';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-ip-camera',
  templateUrl: './add-ip-camera.component.html',
  styleUrls: ['./add-ip-camera.component.css',],
  encapsulation: ViewEncapsulation.None,
})


export class AddIpCameraComponent implements OnInit {
  ipCamera: IPCamera = new IPCamera();
  currentTab: number = 0; // Current tab is set to be the first tab (0)

  families = ["2000", "4000", "5000", "6000", "7000", "8000", "9000"]
  categories = ["Fixed IP Cameras","Fixed IP Domes","Panoramic cameras","PTZ IP Cameras","Specialty Cameras"];
  indoorOutdoorArray = ["Indoor", "Outdoor"];
  dayNightArray = ["Day/Night","E-Day/Night","Thermal"];

  loading: boolean = false;
  datasheetSelectedFiles: FileList;
  imageSelectedFiles: FileList;
  datasheetFile: File;
  imageFile: File;
  productType : string = 'ip_camera';

  constructor(
    private router: Router,
    private datasheetService: DatasheetService,
    private ipCameraService: IpCameraService,
  ) { }

  ngOnInit() {    
    this.showTab(this.currentTab);//se muestra la etapa inicial del form
  }

  /*
  * Metodos para cargar y eliminar el datasheet y imagen
  */
  onLoadDataSheet(){
    let e = this;
    let uploader = (<HTMLInputElement>document.getElementById('file1')).files;
    this.datasheetSelectedFiles = uploader;
    this.ipCamera.datasheet = (<HTMLInputElement>document.getElementById('file1')).value;

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

    this.ipCamera.image = (<HTMLInputElement>document.getElementById('uploaderImage')).value;
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
    this.ipCamera.image = '';
  }

  //Delete the files with uploader in the uploader
  deleteFile(): void{
    document.getElementById('files-list').innerHTML = '';
    this.ipCamera.datasheet = '';
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
    
    if (n == 1 && !this.validateForm()) {
      window.scrollTo(0,0);
      CallOut.addCallOut('warning','Some inputs have no value. Please complete them before forward', 5000);
      return;
    }

    // Hide the current tab:
    x[this.currentTab].style.display = "none";

    /*
      IF THE CURRENT TAB IS THE FIRST SEND THE VALUES TO PDF READER
      AND ADD THE RESPONSE TO THE INPUTS
    */
    if(this.currentTab == 0){
      this.fillInputs();
    }

    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + n;

    // if you have reached the end of the form... :
    if (this.currentTab >= x.length) {
      //...the form gets submitted:
      this.addIPCamera();
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

/*
 * Metodos para precargar al momento de subir el datasheet cada uno de los input
 */
  fillInputs(): void {
    this.loading = true;
    this.datasheetFile = this.datasheetSelectedFiles.item(0);

    this.datasheetService
      .getDatasheetInformation(this.datasheetFile, this.productType)
      .subscribe(
        (data) => {
          let info = data['body']
          for(let key in info){
            if(key === 'name'){
              this.ipCamera.name = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'family'){
              this.ipCamera.family = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'category'){
              this.ipCamera.category = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'ctnClass'){
              this.ipCamera.ctnClass = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'ctnClassFull'){
              this.ipCamera.ctnClassFull = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'price'){
              this.ipCamera.price = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'basicFeatures'){
              for(let index in info[key]){
                if(index === 'maxResolution'){
                  this.ipCamera.basicFeatures.maxResolution = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'sensorType'){
                  this.ipCamera.basicFeatures.sensorType = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'maxFPS'){
                  this.ipCamera.basicFeatures.maxFPS = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'indoorOutdoor'){
                  this.ipCamera.basicFeatures.indoorOutdoor = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'dayNight'){
                  this.ipCamera.basicFeatures.dayNight = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'wideDinamicRange'){
                  this.ipCamera.basicFeatures.wideDinamicRange = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'onvif'){
                  this.ipCamera.basicFeatures.onvif = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'microphone'){
                  this.ipCamera.basicFeatures.microphone = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'poe'){
                  this.ipCamera.basicFeatures.poe = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'irSensitive'){
                  this.ipCamera.basicFeatures.irSensitive = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'advancedFeatures'){
              for(let index in info[key]){
                if(index === 'compression'){
                  this.ipCamera.advancedFeatures.compression = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'multiStreaming'){
                  this.ipCamera.advancedFeatures.multiStreaming = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'idnr'){
                  this.ipCamera.advancedFeatures.idnr = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'iae'){
                  this.ipCamera.advancedFeatures.iae = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'privacyMasking'){
                  this.ipCamera.advancedFeatures.privacyMasking = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'regionOfInterest'){
                  this.ipCamera.advancedFeatures.regionOfInterest = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'interestTracking'){
                  this.ipCamera.advancedFeatures.interestTracking = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'noPresets'){
                  this.ipCamera.advancedFeatures.noPresets = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'wiper'){
                  this.ipCamera.advancedFeatures.wiper = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'thermal'){
                  this.ipCamera.advancedFeatures.thermal = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'alarmTriggering'){
              for(let index in info[key]){
                if(index === 'tamperDetection'){
                  this.ipCamera.alarmTriggering.tamperDetection = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'videoMotionDetection'){
                  this.ipCamera.alarmTriggering.videoMotionDetection = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'audioDetection'){
                  this.ipCamera.alarmTriggering.audioDetection = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'faceDetection'){
                  this.ipCamera.alarmTriggering.faceDetection = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'intelligentTracking'){
                  this.ipCamera.alarmTriggering.intelligentTracking = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'sensitivity'){
              for(let index in info[key]){
                if(index === 'minIluminationDayMode'){
                  this.ipCamera.sensitivity.minIluminationDayMode = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'minIlluminationNightMode'){
                  this.ipCamera.sensitivity.minIlluminationNightMode = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'startLight'){
                  this.ipCamera.sensitivity.startLight = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'integratedIr'){
                  this.ipCamera.sensitivity.integratedIr = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'optionalIr'){
                  this.ipCamera.sensitivity.optionalIr = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'lens'){
              for(let index in info[key]){
                if(index === 'automaticBackFocus'){
                  this.ipCamera.lens.automaticBackFocus = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'varifocal'){
                  this.ipCamera.lens.varifocal = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'superResolutionLens'){
                  this.ipCamera.lens.superResolutionLens = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'focalLengthFrom'){
                  this.ipCamera.lens.focalLengthFrom = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'focalLengthTill'){
                  this.ipCamera.lens.focalLengthTill = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'maxAngleH'){
                  this.ipCamera.lens.maxAngleH = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'maxAngleV'){
                  this.ipCamera.lens.maxAngleV = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'minAngleH'){
                  this.ipCamera.lens.minAngleH = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'minAngleV'){
                  this.ipCamera.lens.minAngleV = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'ptzZoomDigital'){
                  this.ipCamera.lens.ptzZoomDigital = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'ptzOpticalZoom'){
                  this.ipCamera.lens.ptzOpticalZoom = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'tiltAngle'){
                  this.ipCamera.lens.tiltAngle = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'autoVarifocal'){
                  this.ipCamera.lens.autoVarifocal = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'iva'){
                  this.ipCamera.lens.iva = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'dcri'){
              for(let index in info[key]){
                if(index === 'detection'){
                  this.ipCamera.dcri.detection = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'clasification'){
                  this.ipCamera.dcri.clasification = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'recognition'){
                  this.ipCamera.dcri.recognition = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'identification'){
                  this.ipCamera.dcri.identification = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'storage'){
              for(let index in info[key]){
                if(index === 'builtInStorage'){
                  this.ipCamera.storage.builtInStorage = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'directToIscsi'){
                  this.ipCamera.storage.directToIscsi = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'cloudStorage'){
                  this.ipCamera.storage.cloudStorage = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'connections'){
              for(let index in info[key]){
                if(index === 'alarmInputOutput'){
                  this.ipCamera.connections.alarmInputOutput = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'audioInOut'){
                  this.ipCamera.connections.audioInOut = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'hybrid'){
                  this.ipCamera.connections.hybrid = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'confrontationMonitor'){
                  this.ipCamera.connections.confrontationMonitor = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'housing'){
              for(let index in info[key]){
                if(index === 'weatherRating'){
                  this.ipCamera.housing.weatherRating = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'vandalResistant'){
                  this.ipCamera.housing.vandalResistant = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'corrosionProof'){
                  this.ipCamera.housing.corrosionProof = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'explosionProof'){
                  this.ipCamera.housing.explosionProof = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'operatingTemperature'){
                  this.ipCamera.housing.operatingTemperature = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          alert('Server not found')
        }
      );
  }

  validateUndefinedValue(key, value){
    if(value === "undefined"){
      (<HTMLInputElement>document.getElementById(key)).value = '';
      (<HTMLInputElement>document.getElementById(key)).className += " warning-validation"
      return '';
    }else{
      (<HTMLInputElement>document.getElementById(key)).value = value;
      (<HTMLInputElement>document.getElementById(key)).className += " success-validation"
      return value;
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
  }

  /*
  * Metodo para crear registrar una nueva camara
  */
  addIPCamera(){
    this.loading = true;
    this.imageFile = this.imageSelectedFiles.item(0);

    this.ipCameraService.createIPCamera(this.ipCamera, this.datasheetFile, this.imageFile)
    .subscribe(
      (data: HttpResponse< { status :  string }> ) => {
        try {
          if(data.body.status === 'IP Camera added'){
            this.loading = false;
            CallOut.added = true;
            this.router.navigate(["/consult-ip-cameras"])
          }
        } catch (error) {
          console.log('No logrado')
        }  
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'The IP Camera has not added.', 5000)     
      }
    );
  }
}
