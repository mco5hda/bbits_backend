import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AnalogCamera } from '../../models/cameras/analog-cameras.model';

let currentTab = 0; // Current tab is set to be the first tab (0)

@Component({
  selector: 'app-add-analog-camera',
  templateUrl: './add-analog-camera.component.html',
  styleUrls: ['./add-analog-camera.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddAnalogCameraComponent implements OnInit {
  analogCamera: AnalogCamera = new AnalogCamera(); 

  categories = ["Fixed AN cameras","Fixed AN Domes","PTZ AN Cameras","Specialty AN Cameras"];
  indoorOutdoorArray = ["Indoor", "Indoor/Outdoor", "Outdoor"];
  dayNightArray = ["Day", "Day/Night","E-Day/Night"];

  constructor(
    private router: Router 
  ) { }

  ngOnInit() {
    this.showTab(currentTab);
  }

  /*
  * Metodos para cargar y eliminar el datasheet y imagen
  */
  onLoadDataSheet(){
    let e = this;
    let uploader = (<HTMLInputElement>document.getElementById('file1')).files;

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
      document.getElementById("nextBtn").addEventListener("click", (event: Event) => {
        this.addAnalogCamera();
      });
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
    
    if (n == 1 && !this.validateForm()) return;

    // Hide the current tab:
    x[currentTab].style.display = "none";

    /*
      IF THE CURRENT TAB IS THE FIRST SEND THE VALUES TO PDF READER
      AND ADD THE RESPONSE TO THE INPUTS
    */
    if(currentTab == 0){
      document.getElementById('addProductForm').className += 'spinner-collapsed';
      document.getElementById('spinner').classList.remove('spinner-collapsed');

      this.fillInputs();
      //setTimeout(this.fillInputs, 3000);
    }

    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      (<HTMLFormElement>document.getElementById("addProductForm")).submit();
      return false;
    }
    // Otherwise, display the correct tab:
    this.showTab(currentTab);
  }

  fixStepIndicator(n): void{
    // This function removes the "active" class of all steps...
    let x = document.getElementsByClassName("step");
    for (let i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }

    //... and adds the "active" class to the current step:
    x[n].className += " active";

    window.scrollTo(0,0);
  }

  validateForm(): boolean{
    // This function deals with validation of the form fields
    let elements = undefined;
    let valid = true;

    let x = document.getElementsByClassName("tab");
    elements = x[currentTab].getElementsByTagName("input");

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
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }

    return valid; // return the valid status
  }

  /*
 * Metodos para precargar al momento de subir el datasheet cada uno de los input
 */
  fillInputs(): void {
    document.getElementById('spinner').className += ' spinner-collapsed';
    document.getElementById('addProductForm').classList.remove('spinner-collapsed');

    let data = {
      "id": "",
      "name": undefined,
      "family": undefined,
      "category": undefined,
      "accessories" : "LVF-5000C-D2811,LVF-5000C-D0550,LTC 3664/31,EX12LED-3BD-8M,EX12LED-3BD-8W,EX12LED-3BD-9M,EX12LED-3BD-9W,TC8235GIT,UPA-2430-60,UPA-2420-50,UPA-2450-50,UPA-2450-60,S1374,VP-CFGSFT",
      "image": undefined,
      "thumbnail": undefined,
      "datasheet": undefined,
      "ctnClass": undefined,
      "ctnClassFull": undefined,
      "subTypes": [
        {"name": "VBN-5085-C11","description": "DINION AN 5000"},
        {"name": "VBN-5085-C21","description": "DINION AN 5000"},
        {"name": "VBN-5085-C51","description": "DINION AN 5000"}
      ],
      "basicFeatures":{
        "maxResolution" : "720 TVL",
        "sensorType" : "9-POE,UPA-1220-60,S1460,VDA-455SMB-IP,VDA-PMT-DO60H, 1/3 DS CCD",
        "indoorOutdoor" : "Outdoor",
        "dayNight" : "Day",
        "wideDinamicRange" : "94 DB (WDR)",
        "irSensitive" : true
      },
      "advancedFeatures":{
        "privacyMasking" : true
      },"alarmTriggering":{
        "tamperDetection" : false,
        "videoMotionDetection" : true
      },"sensitivity":{
        "minIluminationDayMode" : "0.5",
        "minIlluminationNightMode" : "chrome0.2",
        "nightVision" : true,
        "maxRangeAtNight" : undefined
      },"lens":{
        "focalLengthFrom" : undefined,
        "focalLengthTill" : undefined,
        "maxAngleH" : undefined,
        "minAngleH" : undefined,
        "ptzZoomDigital" : false,
        "ptzOpticalZoom" : false,
        "tiltAngle" : false
      },"connections":{
        "alarmInputOutput" : true
      },"housing":{
        "weatherRating" : undefined,
        "vandalResistant" : undefined,
        "operatingTemperature" : "-20°C TO +55°C (-4°F TO 131°F)"
      },
      "price" : "1.0",
      "electricalData":{
        "inputVoltage" : " for camera. 120, 60 hz; 24",
        "normalVersion" : "36 ma (12 vdc)"
      }
    }


    for(let key in data){
      if(key === 'name'){
        this.analogCamera.name = this.validateUndefinedValue(data[key]);
      }else if(key === 'family'){
        this.analogCamera.family = this.validateUndefinedValue(data[key]);
      }else if(key === 'category'){
        this.analogCamera.category = this.validateUndefinedValue(data[key]);
      }else if(key === 'ctnClass'){
        this.analogCamera.ctnClass = this.validateUndefinedValue(data[key]);
      }else if(key === 'ctnClassFull'){
        this.analogCamera.ctnClassFull = this.validateUndefinedValue(data[key]);
      }else if(key === 'price'){
        this.analogCamera.price = this.validateUndefinedValue(data[key]);
      }else if(key === 'basicFeatures'){
        for(let index in data[key]){
          if(index === 'maxResolution'){
            this.analogCamera.basicFeatures.maxResolution = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'sensorType'){
            this.analogCamera.basicFeatures.sensorType = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'indoorOutdoor'){
            this.analogCamera.basicFeatures.indoorOutdoor = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'dayNight'){
            this.analogCamera.basicFeatures.dayNight = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'wideDinamicRange'){
            this.analogCamera.basicFeatures.wideDinamicRange = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'irSensitive'){
            this.analogCamera.basicFeatures.irSensitive = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'advancedFeatures'){
        for(let index in data[key]){
          if(index === 'privacyMasking'){
            this.analogCamera.advancedFeatures.privacyMasking = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'alarmTriggering'){
        for(let index in data[key]){
          if(index === 'tamperDetection'){
            this.analogCamera.alarmTriggering.tamperDetection = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'videoMotionDetection'){
            this.analogCamera.alarmTriggering.videoMotionDetection = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'sensitivity'){
        for(let index in data[key]){
          if(index === 'minIluminationDayMode'){
            this.analogCamera.sensitivity.minIluminationDayMode = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'minIlluminationNightMode'){
            this.analogCamera.sensitivity.minIlluminationNightMode = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'nightVision'){
            this.analogCamera.sensitivity.nightVision = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'maxRangeAtNight'){
            this.analogCamera.sensitivity.maxRangeAtNight = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'lens'){
        for(let index in data[key]){
          if(index === 'focalLengthFrom'){
            this.analogCamera.lens.focalLengthFrom = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'focalLengthTill'){
            this.analogCamera.lens.focalLengthTill = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'maxAngleH'){
            this.analogCamera.lens.maxAngleH = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'minAngleH'){
            this.analogCamera.lens.minAngleH = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'ptzZoomDigital'){
            this.analogCamera.lens.ptzZoomDigital = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'ptzOpticalZoom'){
            this.analogCamera.lens.ptzOpticalZoom = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'tiltAngle'){
            this.analogCamera.lens.tiltAngle = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'connections'){
        for(let index in data[key]){
          if(index === 'alarmInputOutput'){
            this.analogCamera.connections.alarmInputOutput = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'housing'){
        for(let index in data[key]){
          if(index === 'weatherRating'){
            this.analogCamera.housing.weatherRating = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'vandalResistant'){
            this.analogCamera.housing.vandalResistant = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'operatingTemperature'){
            this.analogCamera.housing.operatingTemperature = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'electricalData'){
        for(let index in data[key]){
          if(index === 'inputVoltage'){
            this.analogCamera.electricalData.inputVoltage = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'normalVersion'){
            this.analogCamera.electricalData.normalVersion = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'irVersion'){
            this.analogCamera.electricalData.irVersion = this.validateUndefinedValue(data[key][index]);
          }
        }
      }
    }
  }

  validateUndefinedValue(value){
    if(value === undefined){
      return '';
    }else{
      return value;
    }
  }

  /*
  * Metodo para crear registrar una nueva camara
  */
  addAnalogCamera(){
    this.router.navigate(["/home"])
  }
}
