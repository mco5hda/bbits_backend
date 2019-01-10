import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AnalogRecording } from '../../models/recordings/analog-recordings.model';
import { DatasheetService } from '../../datasheet.service';

@Component({
  selector: 'app-add-analog-recording',
  templateUrl: './add-analog-recording.component.html',
  styleUrls: ['./add-analog-recording.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddAnalogRecordingComponent implements OnInit {
  categories = ["AN Recording"];

  currentTab = 0;
  analogRecording: AnalogRecording = new AnalogRecording();

  selectedFiles: FileList;
  currentFileUpload: File;
  productType : string = 'analog_recording';

  constructor(
    private router: Router,
    private datasheetService: DatasheetService
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
    this.selectedFiles = uploader;
    this.analogRecording.datasheet = (<HTMLInputElement>document.getElementById('file1')).value;

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

    this.analogRecording.image = (<HTMLInputElement>document.getElementById('uploaderImage')).value;

    document.getElementById('image-list').classList.remove("image-list")

    document.getElementById('btn-delete-preview-image').addEventListener("click", (event: Event) => {
      this.deletePreviewImage();
    });
  }

  //Delete the files with uploader in the uploader
  deletePreviewImage():void{
    (<HTMLInputElement>document.getElementById('uploaderImage')).value = '';
    document.getElementById('image-list').innerHTML = '';
    this.analogRecording.image = '';
  }

  //Delete the files with uploader in the uploader
  deleteFile(): void{
    document.getElementById('files-list').innerHTML = '';
    this.analogRecording.datasheet = '';
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
    
    if (n == 1 && !this.validateForm()) return;

    // Hide the current tab:
    x[this.currentTab].style.display = "none";

    /*
      IF THE CURRENT TAB IS THE FIRST SEND THE VALUES TO PDF READER
      AND ADD THE RESPONSE TO THE INPUTS
    */
    if(this.currentTab == 0){
      document.getElementById('addProductForm').className += 'spinner-collapsed';
      document.getElementById('spinner').classList.remove('spinner-collapsed');

      this.fillInputs();
      //setTimeout(this.fillInputs, 3000);
    }

    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + n;

    // if you have reached the end of the form... :
    if (this.currentTab >= x.length) {
      //...the form gets submitted:
      this.addAnalogRecording()
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
    document.getElementById('spinner').className += ' spinner-collapsed';
    document.getElementById('addProductForm').classList.remove('spinner-collapsed');

    this.currentFileUpload = this.selectedFiles.item(0);

    this.datasheetService.getDatasheetInformation(this.currentFileUpload, this.productType)
      .subscribe((data) => {
        let info = data['body']
        for(let key in info){
          if(key === 'name'){
            this.analogRecording.name = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'family'){
            this.analogRecording.family = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'category'){
            this.analogRecording.category = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'ctnClass'){
            this.analogRecording.ctnClass = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'ctnClassFull'){
            this.analogRecording.ctnClassFull = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'price'){
            this.analogRecording.price = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'dataFormat'){
            this.analogRecording.dataFormat = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'inputRelayOutputs'){
            this.analogRecording.inputRelayOutputs = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'targetSystemSize'){
            this.analogRecording.targetSystemSize = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'timeLine'){
            this.analogRecording.timeLine = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'userLevels'){
            this.analogRecording.userLevels = this.validateUndefinedValue(key, info[key]);
          }else if(key === 'basicFeaturesRecording'){
            for(let index in info[key]){
              if(index === 'channels'){
                this.analogRecording.basicFeatures.channels = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'frameRateIPS'){
                this.analogRecording.basicFeatures.frameRateIPS = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'ipsPerCamera'){
                this.analogRecording.basicFeatures.ipsPerCamera = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'liveResolution'){
                this.analogRecording.basicFeatures.liveResolution = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'systemSize'){
                this.analogRecording.basicFeatures.systemSize = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'loopinVideo'){
                this.analogRecording.basicFeatures.loopinVideo = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'preAlarm'){
                this.analogRecording.basicFeatures.preAlarm = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'motionDetection'){
                this.analogRecording.basicFeatures.motionDetection = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'mountableRack'){
                this.analogRecording.basicFeatures.mountableRack = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'multipleCamera'){
                this.analogRecording.basicFeatures.multipleCamera = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'videoCompression'){
                this.analogRecording.basicFeatures.videoCompression = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'hResolution'){
                this.analogRecording.basicFeatures.hResolution = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'network'){
                this.analogRecording.basicFeatures.network = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'operativeSystem'){
                this.analogRecording.basicFeatures.operativeSystem = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }else if(key === 'advancedFeaturesRecording'){
            for(let index in info[key]){
              if(index === 'smartMotionSearch'){
                this.analogRecording.advancedFeatures.smartMotionSearch = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'instantPlayBack'){
                this.analogRecording.advancedFeatures.instantPlayBack = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'searchMode'){
                this.analogRecording.advancedFeatures.searchMode = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'callUpPrepositionOnDome'){
                this.analogRecording.advancedFeatures.callUpPrepositionOnDome = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'cameraLockoutsByUser'){
                this.analogRecording.advancedFeatures.cameraLockoutsByUser = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'dataIntegrityCheck'){
                this.analogRecording.advancedFeatures.dataIntegrityCheck = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'increaseFrameRateOnAlarm'){
                this.analogRecording.advancedFeatures.increaseFrameRateOnAlarm = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'individualCameraAdjustment'){
                this.analogRecording.advancedFeatures.individualCameraAdjustment = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }else if(key === 'aioFunctionsRecording'){
            for(let index in info[key]){
              if(index === 'ptzControls'){
                this.analogRecording.aioFunctions.ptzControls = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'adminControl'){
                this.analogRecording.aioFunctions.adminControl = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'exportOptions'){
                this.analogRecording.aioFunctions.exportOptions = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'ptzJoystickControl'){
                this.analogRecording.aioFunctions.ptzJoystickControl = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }else if(key === 'audioRecording'){
            for(let index in info[key]){
              if(index === 'inOutChanels'){
                this.analogRecording.audio.inOutChanels = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'associateCameraToAudio'){
                this.analogRecording.audio.associateCameraToAudio = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'biDirectionalAudio'){
                this.analogRecording.audio.biDirectionalAudio = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'synchronousAudio'){
                this.analogRecording.audio.synchronousAudio = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }else if(key === 'integrationRecording'){
            for(let index in info[key]){
              if(index === 'optionalAtpmPos'){
                this.analogRecording.integration.optionalAtpmPos = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'sdk'){
                this.analogRecording.integration.sdk = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }else if(key === 'localRemoteViewingRecording'){
            for(let index in info[key]){
              if(index === 'mobileClientAccess'){
                this.analogRecording.larViewing.mobileClientAccess = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'webBrowserAccess'){
                this.analogRecording.larViewing.webBrowserAccess = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'setViewingPermissions'){
                this.analogRecording.larViewing.setViewingPermissions = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'simultaneousAccessibleUser'){
                this.analogRecording.larViewing.simultaneousAccessibleUser = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }else if(key === 'recording'){
            for(let index in info[key]){
              if(index === 'scheduleRecordingModes'){
                this.analogRecording.recording.scheduleRecordingModes = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'screenDivisionMultiScreen'){
                this.analogRecording.recording.screenDivisionMultiScreen = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'recordingResolution'){
                this.analogRecording.recording.recordingResolution = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'digitalZoomLive'){
                this.analogRecording.recording.digitalZoomLive = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }else if(key === 'storageOptionsRecording'){
            for(let index in info[key]){
              if(index === 'supportDevices'){
                this.analogRecording.storageOptions.supportDevices = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'expandable'){
                this.analogRecording.storageOptions.expandable = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'externalStorage'){
                this.analogRecording.storageOptions.externalStorage = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'onBoardRaid'){
                this.analogRecording.storageOptions.onBoardRaid = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'numberHD'){
                this.analogRecording.storageOptions.numberHD = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'exportOptionsStorage'){
                this.analogRecording.storageOptions.exportOptionsStorage = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'backUpMode'){
                this.analogRecording.storageOptions.backUpMode = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }else if(key === 'videoOutputRecording'){
            for(let index in info[key]){
              if(index === 'connectorType'){
                this.analogRecording.videoOutput.connectorType = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'spotMonitor'){
                this.analogRecording.videoOutput.spotMonitor = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }else if(key === 'electricalData'){
            for(let index in info[key]){
              if(index === 'inputVoltage'){
                this.analogRecording.electricalData.inputVoltage = this.validateUndefinedValue(index, info[key][index]);
              }else if(index === 'normalVersion'){
                this.analogRecording.electricalData.normalVersion = this.validateUndefinedValue(index, info[key][index]);
              }
            }
          }
        }
      });
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
  addAnalogRecording(){
      alert('Added');
      this.router.navigate(["/consult-analog-recordings"]);
  } 
}