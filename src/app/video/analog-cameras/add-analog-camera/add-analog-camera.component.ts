import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AnalogCamera } from '../../models/cameras/analog-cameras.model';
import { DatasheetService } from '../../datasheet.service';
import { CallOut } from './../../../utilities/callout';

@Component({
  selector: 'app-add-analog-camera',
  templateUrl: './add-analog-camera.component.html',
  styleUrls: ['./add-analog-camera.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddAnalogCameraComponent implements OnInit {
  analogCamera: AnalogCamera = new AnalogCamera(); 
  currentTab = 0; // Current tab is set to be the first tab (0)

  families = ["1000", "2000", "4000", "5000"]
  categories = ["Fixed AN cameras","Fixed AN Domes","PTZ AN Cameras","Specialty AN Cameras"];
  indoorOutdoorArray = ["Indoor", "Indoor/Outdoor", "Outdoor"];
  dayNightArray = ["Day", "Day/Night","E-Day/Night"];
  loading: boolean = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  productType : string = 'analog_camera';

  constructor(
    private router: Router,
    private datasheetService: DatasheetService
  ) { }

  ngOnInit() {
    this.showTab(this.currentTab);
  }

  /*
  * Metodos para cargar y eliminar el datasheet y imagen
  */
  onLoadDataSheet(){
    let e = this;
    let uploader = (<HTMLInputElement>document.getElementById('file1')).files;
    this.selectedFiles = uploader;
    this.analogCamera.datasheet = (<HTMLInputElement>document.getElementById('file1')).value;

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

    this.analogCamera.image = (<HTMLInputElement>document.getElementById('uploaderImage')).value;

    document.getElementById('image-list').classList.remove("image-list")

    document.getElementById('btn-delete-preview-image').addEventListener("click", (event: Event) => {
      this.deletePreviewImage();
    });
  }

  //Delete the files with uploader in the uploader
  deletePreviewImage():void{
    (<HTMLInputElement>document.getElementById('uploaderImage')).value = '';
    document.getElementById('image-list').innerHTML = '';
    this.analogCamera.image = '';
  }

  //Delete the files with uploader in the uploader
  deleteFile(): void{
    document.getElementById('files-list').innerHTML = '';
    this.analogCamera.datasheet = '';
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
      this.addAnalogCamera();
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

    this.currentFileUpload = this.selectedFiles.item(0);

    this.datasheetService.getDatasheetInformation(this.currentFileUpload, this.productType)
      .subscribe(
        (data) => {
          let info = data['body']
          for(let key in info){
            if(key === 'name'){
              this.analogCamera.name = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'family'){
              this.analogCamera.family = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'category'){
              this.analogCamera.category = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'ctnClass'){
              this.analogCamera.ctnClass = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'ctnClassFull'){
              this.analogCamera.ctnClassFull = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'price'){
              this.analogCamera.price = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'basicFeatures'){
              for(let index in info[key]){
                if(index === 'maxResolution'){
                  this.analogCamera.basicFeatures.maxResolution = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'sensorType'){
                  this.analogCamera.basicFeatures.sensorType = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'indoorOutdoor'){
                  this.analogCamera.basicFeatures.indoorOutdoor = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'dayNight'){
                  this.analogCamera.basicFeatures.dayNight = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'wideDinamicRange'){
                  this.analogCamera.basicFeatures.wideDinamicRange = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'irSensitive'){
                  this.analogCamera.basicFeatures.irSensitive = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'advancedFeatures'){
              for(let index in info[key]){
                if(index === 'privacyMasking'){
                  this.analogCamera.advancedFeatures.privacyMasking = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'alarmTriggering'){
              for(let index in info[key]){
                if(index === 'tamperDetection'){
                  this.analogCamera.alarmTriggering.tamperDetection = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'videoMotionDetection'){
                  this.analogCamera.alarmTriggering.videoMotionDetection = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'sensitivity'){
              for(let index in info[key]){
                if(index === 'minIluminationDayMode'){
                  this.analogCamera.sensitivity.minIluminationDayMode = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'minIlluminationNightMode'){
                  this.analogCamera.sensitivity.minIlluminationNightMode = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'nightVision'){
                  this.analogCamera.sensitivity.nightVision = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'maxRangeAtNight'){
                  this.analogCamera.sensitivity.maxRangeAtNight = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'lens'){
              for(let index in info[key]){
                if(index === 'focalLengthFrom'){
                  this.analogCamera.lens.focalLengthFrom = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'focalLengthTill'){
                  this.analogCamera.lens.focalLengthTill = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'maxAngleH'){
                  this.analogCamera.lens.maxAngleH = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'minAngleH'){
                  this.analogCamera.lens.minAngleH = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'ptzZoomDigital'){
                  this.analogCamera.lens.ptzZoomDigital = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'ptzOpticalZoom'){
                  this.analogCamera.lens.ptzOpticalZoom = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'tiltAngle'){
                  this.analogCamera.lens.tiltAngle = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'connections'){
              for(let index in info[key]){
                if(index === 'alarmInputOutput'){
                  this.analogCamera.connections.alarmInputOutput = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'housing'){
              for(let index in info[key]){
                if(index === 'weatherRating'){
                  this.analogCamera.housing.weatherRating = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'vandalResistant'){
                  this.analogCamera.housing.vandalResistant = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'operatingTemperature'){
                  this.analogCamera.housing.operatingTemperature = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'electricalData'){
              for(let index in info[key]){
                if(index === 'inputVoltage'){
                  this.analogCamera.electricalData.inputVoltage = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'normalVersion'){
                  this.analogCamera.electricalData.normalVersion = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'irVersion'){
                  this.analogCamera.electricalData.irVersion = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }
          }

          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  validateUndefinedValue(key, value){
    if(value === 'undefined'){
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
  addAnalogCamera(){
    CallOut.added = true;
    this.router.navigate(["/consult-analog-cameras"])
  } 
}
