import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IPRecording } from '../../models/recordings/ip-recordings.model';

let currentTab = 0;
@Component({
  selector: 'app-add-ip-recording',
  templateUrl: './add-ip-recording.component.html',
  styleUrls: ['./add-ip-recording.component.css',],
  encapsulation: ViewEncapsulation.None,
})
export class AddIpRecordingComponent implements OnInit {
  categories = ["All in one","Storage only"];


  ipRecording: IPRecording = new IPRecording();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  /*
  * Metodos para cargar y eliminar el datasheet y imagen
  */
  onLoadDataSheet(){
    let e = this;
    let uploader = (<HTMLInputElement>document.getElementById('file1')).files;

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

    this.ipRecording.image = (<HTMLInputElement>document.getElementById('uploaderImage')).value;

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
      document.getElementById("nextBtn").addEventListener("click", (event: Event) => {
        this.addIPRecording();
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
      "name": "undefined",
      "family": "undefined",
      "category": "undefined",
      "accessories" : "DIP-6703-HDD,DIP-6704-HDD,DIP-6706-HDD,DIP-6708-HDD,DLA-XVRM-064",
      "image": "undefined",
      "thumbnail": "undefined",
      "datasheet": "undefined",
      "ctnClass": "undefined",
      "ctnClassFull": "undefined",
      "dataFormat": "undefined",
      "subTypes": [
        {"name": "DIP-6183-4HD","description": "DIVAR IP 6000 2U, 4 x 3 TB HDD"},
        {"name": "DIP-6183-8HD","description": "DIVAR IP 6000 2U, 8 x 3 TB HDD"},
        {"name": "DIP-6184-4HD","description": "4 | DIVAR IP 6000 2U"},
        {"name": "DIP-6184-8HD","description": "DIVAR IP 6000 2U, 8 x 4 TB HDD"},
        {"name": "DIP-6186-8HD","description":"DIVAR IP 6000 2U, 8 x 6 TB HDD"},
        {"name": "DIP-6188-8HD","description": "DIVAR IP 6000 2U, 8 x 8 TB HDD"},
        {"name": "DIP-6180-00N","description": "DIVAR IP 6000 2U, w/o HDD"}
      ],"basicFeaturesRecording":{
        "systemSize" : "undefined",
        "videoCompression" : "undefined",
        "ipChannels" : "undefined",
        "integratedVideoManagement" : "Yes",
        "bandwidth" : "undefined",
        "supportedResolution" : "undefined",
        "onBoardTranscoding" : "No",
        "onvif" : "No",
        "psr" : "No",
        "hotSwappablwHDD" : "Yes",
        "monitorOutput" : "Yes",
        "raid" : "RAID-5,RAID‑5,RAID‑6,RAID-1"
      },"advancedFeaturesRecording":{
        "forensicSearchSupport" : "No",
        "supportWebClient" : "No"
      },"aioFunctionsRecording":{
        "ptzControls" : "No",
        "adminControl" : "Yes",
        "exportOptions" : "No",
        "cctvKeyboardSupport" : "No"
      },"audioRecording":{
        "inOutChanels" : "No",
        "compressionType" : "No",
        "synchronousType" : "No",
        "amcta" : "No"
      },"backUpRecoding":{
        "dvdWritter" : "No",
        "supportedDevices" : "undefined",
        "backUpMode" : "Manual"
      },"integrationRecording":{
        "optionalAtpmPos" : "No",
        "integrationToolsSDK" : "No"
      },"localRemoteViewingRecording":{
        "videoSecurityApp" : "No",
        "webBrowserAccess" : "No",
        "simultaneousUsers" : "undefined",
        "viewingBVC" : "Yes",
        "bvms" : "No"
      },"mechanicalRecording":{
        "formFactor" : "2HU rack mount",
        "networkConnection" : "Dual Intel i210AT Gigabit LAN",
        "usbPorts" : "Front: 2 USB 2.0 ports, Rear: 2 USB 2.0 ports, 2 USB 3.0 ports",
        "numberOfPowerSupplies" : "740 W Platinum Level Redundant",
        "powerSuppliesHS" : "Yes"
      },"recording":{
        "videoRecordingManager" : "Yes",
        "scheduleRecording" : "No"
      },"storageOptionsExtensionsRecording":{
        "maxNumberOfUnits" : "undefined",
        "maximumDrievesSupported" : "undefined",
        "availableCapacitiesPerDrive" : "undefined",
        "hotSwappable" : "Yes"
      },"storageOptionsRecording":{
        "maxDrivesSupported" : "undefined",
        "baseSystemCapacity" : "undefined",
        "maxBaseSystemCapacity" : "undefined",
        "fullSystemCapacity" : "undefined",
        "availableCapacitiesPerDrive" : "undefined"
      },"videoOutputRecording":{
        "connectorType" : "undefined",
        "spotMonitor" : "undefined"
      },"price" : "1.0",
      "electricalData":{
        "inputVoltage" : "140",
        "normalVersion" : "4hd: 200.5"
      }
    }

    for(let key in data){
      if(key === 'name'){
        this.ipRecording.name = this.validateUndefinedValue(data[key]);
      }else if(key === 'family'){
        this.ipRecording.family = this.validateUndefinedValue(data[key]);
      }else if(key === 'category'){
        this.ipRecording.category = this.validateUndefinedValue(data[key]);
      }else if(key === 'ctnClass'){
        this.ipRecording.ctnClass = this.validateUndefinedValue(data[key]);
      }else if(key === 'ctnClassFull'){
        this.ipRecording.ctnClassFull = this.validateUndefinedValue(data[key]);
      }else if(key === 'price'){
        this.ipRecording.price = this.validateUndefinedValue(data[key]);
      }else if(key === 'dataFormat'){
        this.ipRecording.dataFormat = this.validateUndefinedValue(data[key]);
      }else if(key === 'basicFeaturesRecording'){
        for(let index in data[key]){
          if(index === 'systemSize'){
            this.ipRecording.basicFeatures.systemSize = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'videoCompression'){
            this.ipRecording.basicFeatures.videoCompression = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'ipChannels'){
            this.ipRecording.basicFeatures.ipChannels = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'integratedVideoManagement'){
            this.ipRecording.basicFeatures.integratedVideoManagement = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'bandwidth'){
            this.ipRecording.basicFeatures.bandwidth = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'supportedResolution'){
            this.ipRecording.basicFeatures.supportedResolution = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'onBoardTranscoding'){
            this.ipRecording.basicFeatures.onBoardTranscoding = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'onvif'){
            this.ipRecording.basicFeatures.onvif = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'psr'){
            this.ipRecording.basicFeatures.psr = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'hotSwappablwHDD'){
            this.ipRecording.basicFeatures.hotSwappablwHDD = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'monitorOutput'){
            this.ipRecording.basicFeatures.monitorOutput = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'raid'){
            this.ipRecording.basicFeatures.raid = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'advancedFeaturesRecording'){
        for(let index in data[key]){
          if(index === 'forensicSearchSupport'){
            this.ipRecording.advancedFeatures.forensicSearchSupport = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'supportWebClient'){
            this.ipRecording.advancedFeatures.supportWebClient = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'aioFunctionsRecording'){
        for(let index in data[key]){
          if(index === 'ptzControls'){
            this.ipRecording.aioFunctions.ptzControls = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'adminControl'){
            this.ipRecording.aioFunctions.adminControl = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'exportOptions'){
            this.ipRecording.aioFunctions.exportOptions = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'cctvKeyboardSupport'){
            this.ipRecording.aioFunctions.cctvKeyboardSupport = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'audioRecording'){
        for(let index in data[key]){
          if(index === 'inOutChanels'){
            this.ipRecording.audio.inOutChanels = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'compressionType'){
            this.ipRecording.audio.compressionType = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'synchronousType'){
            this.ipRecording.audio.synchronousType = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'amcta'){
            this.ipRecording.audio.amcta = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'backUpRecoding'){
        for(let index in data[key]){
          if(index === 'dvdWritter'){
            this.ipRecording.backUp.dvdWritter = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'supportedDevices'){
            this.ipRecording.backUp.supportedDevices = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'backUpMode'){
            this.ipRecording.backUp.backUpMode = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'integrationRecording'){
        for(let index in data[key]){
          if(index === 'optionalAtpmPos'){
            this.ipRecording.integration.optionalAtpmPos = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'integrationToolsSDK'){
            this.ipRecording.integration.integrationToolsSDK = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'localRemoteViewingRecording'){
        for(let index in data[key]){
          if(index === 'videoSecurityApp'){
            this.ipRecording.larViewing.videoSecurityApp = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'webBrowserAccess'){
            this.ipRecording.larViewing.webBrowserAccess = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'simultaneousUsers'){
            this.ipRecording.larViewing.simultaneousUsers = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'viewingBVC'){
            this.ipRecording.larViewing.viewingBVC = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'bvms'){
            this.ipRecording.larViewing.bvms = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'mechanicalRecording'){
        for(let index in data[key]){
          if(index === 'alarmInputOutput'){
            this.ipRecording.mechanical.formFactor = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'audioInOut'){
            this.ipRecording.mechanical.networkConnection = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'hybrid'){
            this.ipRecording.mechanical.usbPorts = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'confrontationMonitor'){
            this.ipRecording.mechanical.numberOfPowerSupplies = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'confrontationMonitor'){
            this.ipRecording.mechanical.powerSuppliesHS = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'recording'){
        for(let index in data[key]){
          if(index === 'videoRecordingManager'){
            this.ipRecording.recording.videoRecordingManager = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'scheduleRecording'){
            this.ipRecording.recording.scheduleRecording = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'storageOptionsExtensionsRecording'){
        for(let index in data[key]){
          if(index === 'maxNumberOfUnits'){
            this.ipRecording.storageExtensions.maxNumberOfUnits = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'maximumDrievesSupported'){
            this.ipRecording.storageExtensions.maximumDrievesSupported = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'availableCapacitiesPerDrive'){
            this.ipRecording.storageExtensions.availableCapacitiesPerDrive = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'hotSwappable'){
            this.ipRecording.storageExtensions.hotSwappable = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'storageOptionsRecording'){
        for(let index in data[key]){
          if(index === 'maxDrivesSupported'){
            this.ipRecording.storageOptions.maxDrivesSupported = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'baseSystemCapacity'){
            this.ipRecording.storageOptions.baseSystemCapacity = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'maxBaseSystemCapacity'){
            this.ipRecording.storageOptions.maxBaseSystemCapacity = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'fullSystemCapacity'){
            this.ipRecording.storageOptions.fullSystemCapacity = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'availableCapacitiesPerDrive'){
            this.ipRecording.storageOptions.availableCapacitiesPerDrive = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'videoOutputRecording'){
        for(let index in data[key]){
          if(index === 'connectorType'){
            this.ipRecording.videoOutput.connectorType = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'spotMonitor'){
            this.ipRecording.videoOutput.spotMonitor = this.validateUndefinedValue(data[key][index]);
          }
        }
      }else if(key === 'electricalData'){
        for(let index in data[key]){
          if(index === 'inputVoltage'){
            this.ipRecording.electricalData.inputVoltage = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'normalVersion'){
            this.ipRecording.electricalData.normalVersion = this.validateUndefinedValue(data[key][index]);
          }else if(index === 'irVersion'){
            this.ipRecording.electricalData.irVersion = this.validateUndefinedValue(data[key][index]);
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
  addIPRecording(){
    this.router.navigate(["/home"])
  }
}
