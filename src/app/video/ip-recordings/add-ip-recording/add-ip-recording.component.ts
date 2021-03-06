import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPRecording } from '../../models/recordings/ip-recordings.model';
import { DatasheetService } from '../../datasheet.service';
import { CallOut } from './../../../utilities/callout';
import { IpRecordingService } from '../ip-recording.service';
import { HttpResponse } from '@angular/common/http';
import { AccessoryService } from '../../accessories/accessory.service';
import { Accessory } from '../../models/accessory.model';
import { Environment } from 'src/app/app.environment';
import { MatOption } from '@angular/material';
import { RaidDetails } from '../../models/recordings/raid-details.model';

@Component({
  selector: 'app-add-ip-recording',
  templateUrl: './add-ip-recording.component.html',
  styleUrls: ['./add-ip-recording.component.css',],
  encapsulation: ViewEncapsulation.None,
})
export class AddIpRecordingComponent implements OnInit {
  categories = ["All in one","Storage only"];
  raidLevels = ["RAID-5", "RAID-5 plus hot spare", "RAID-6"];
  @ViewChild('raid') raidSelect;

  currentTab = 0;
  ipRecording: IPRecording = new IPRecording();

  loading: boolean = false;
  datasheetSelectedFiles: FileList;
  imageSelectedFiles: FileList;
  datasheetFile: File;
  imageFile: File;
  productType : string = 'ip_recording';

  accessories: Accessory[] = new Array();
  imagesAccessories: String[] = new Array();

  constructor(
    private router: Router,
    private datasheetService: DatasheetService,
    private ipRecoridngService: IpRecordingService,
    private accessoryService: AccessoryService,
  ) { }

  ngOnInit() {
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
      this.addIPRecording();
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

    this.datasheetService.getDatasheetInformation(this.datasheetFile, this.productType)
      .subscribe(
        (data) => {
          let info = data['body']
          for(let key in info){
            if(key === 'name'){
              this.ipRecording.name = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'family'){
              this.ipRecording.family = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'category'){
              this.ipRecording.category = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'ctnClass'){
              this.ipRecording.ctnClass = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'ctnClassFull'){
              this.ipRecording.ctnClassFull = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'price'){
              this.ipRecording.price = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'dataFormat'){
              this.ipRecording.dataFormat = this.validateUndefinedValue(key, info[key]);
            }else if(key === 'basicFeaturesRecording'){
              for(let index in info[key]){
                if(index === 'systemSize'){
                  this.ipRecording.basicFeatures.systemSize = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'videoCompression'){
                  this.ipRecording.basicFeatures.videoCompression = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'ipChannels'){
                  this.ipRecording.basicFeatures.ipChannels = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'integratedVideoManagement'){
                  this.ipRecording.basicFeatures.integratedVideoManagement = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'bandwidth'){
                  this.ipRecording.basicFeatures.bandwidth = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'supportedResolution'){
                  this.ipRecording.basicFeatures.supportedResolution = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'onBoardTranscoding'){
                  this.ipRecording.basicFeatures.onBoardTranscoding = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'onvif'){
                  this.ipRecording.basicFeatures.onvif = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'psr'){
                  this.ipRecording.basicFeatures.psr = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'hotSwappablwHDD'){
                  this.ipRecording.basicFeatures.hotSwappablwHDD = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'monitorOutput'){
                  this.ipRecording.basicFeatures.monitorOutput = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'raid'){
                  this.ipRecording.basicFeatures.raid = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'advancedFeaturesRecording'){
              for(let index in info[key]){
                if(index === 'forensicSearchSupport'){
                  this.ipRecording.advancedFeatures.forensicSearchSupport = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'supportWebClient'){
                  this.ipRecording.advancedFeatures.supportWebClient = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'aioFunctionsRecording'){
              for(let index in info[key]){
                if(index === 'ptzControls'){
                  this.ipRecording.aioFunctions.ptzControls = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'adminControl'){
                  this.ipRecording.aioFunctions.adminControl = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'exportOptions'){
                  this.ipRecording.aioFunctions.exportOptions = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'cctvKeyboardSupport'){
                  this.ipRecording.aioFunctions.cctvKeyboardSupport = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'audioRecording'){
              for(let index in info[key]){
                if(index === 'inOutChanels'){
                  this.ipRecording.audio.inOutChanels = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'compressionType'){
                  this.ipRecording.audio.compressionType = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'synchronousType'){
                  this.ipRecording.audio.synchronousType = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'amcta'){
                  this.ipRecording.audio.amcta = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'backUpRecoding'){
              for(let index in info[key]){
                if(index === 'dvdWritter'){
                  this.ipRecording.backUp.dvdWritter = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'supportedDevices'){
                  this.ipRecording.backUp.supportedDevices = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'backUpMode'){
                  this.ipRecording.backUp.backUpMode = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'integrationRecording'){
              for(let index in info[key]){
                if(index === 'optionalAtpmPos'){
                  this.ipRecording.integration.optionalAtpmPos = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'integrationToolsSDK'){
                  this.ipRecording.integration.integrationToolsSDK = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'localRemoteViewingRecording'){
              for(let index in info[key]){
                if(index === 'videoSecurityApp'){
                  this.ipRecording.larViewing.videoSecurityApp = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'webBrowserAccess'){
                  this.ipRecording.larViewing.webBrowserAccess = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'simultaneousUsers'){
                  this.ipRecording.larViewing.simultaneousUsers = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'viewingBVC'){
                  this.ipRecording.larViewing.viewingBVC = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'bvms'){
                  this.ipRecording.larViewing.bvms = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'mechanicalRecording'){
              for(let index in info[key]){
                if(index === 'formFactor'){
                  this.ipRecording.mechanical.formFactor = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'networkConnection'){
                  this.ipRecording.mechanical.networkConnection = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'usbPorts'){
                  this.ipRecording.mechanical.usbPorts = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'numberOfPowerSupplies'){
                  this.ipRecording.mechanical.numberOfPowerSupplies = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'powerSuppliesHS'){
                  this.ipRecording.mechanical.powerSuppliesHS = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'recording'){
              for(let index in info[key]){
                if(index === 'videoRecordingManager'){
                  this.ipRecording.recording.videoRecordingManager = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'scheduleRecording'){
                  this.ipRecording.recording.scheduleRecording = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'storageOptionsExtensionsRecording'){
              for(let index in info[key]){
                if(index === 'maxNumberOfUnits'){
                  this.ipRecording.storageExtensions.maxNumberOfUnits = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'maximumDrievesSupported'){
                  this.ipRecording.storageExtensions.maximumDrievesSupported = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'availableCapacitiesPerDriveExtensions'){
                  this.ipRecording.storageExtensions.availableCapacitiesPerDriveExtensions = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'hotSwappable'){
                  this.ipRecording.storageExtensions.hotSwappable = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'storageOptionsRecording'){
              for(let index in info[key]){
                if(index === 'maxDrivesSupported'){
                  this.ipRecording.storageOptions.maxDrivesSupported = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'baseSystemCapacity'){
                  this.ipRecording.storageOptions.baseSystemCapacity = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'maxBaseSystemCapacity'){
                  this.ipRecording.storageOptions.maxBaseSystemCapacity = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'fullSystemCapacity'){
                  this.ipRecording.storageOptions.fullSystemCapacity = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'availableCapacitiesPerDrive'){
                  this.ipRecording.storageOptions.availableCapacitiesPerDrive = this.validateUndefinedValue(index, info[key][index]);
                }
              }
            }else if(key === 'videoOutputRecording'){
              for(let index in info[key]){
                if(index === 'connectorType'){
                  this.ipRecording.videoOutput.connectorType = this.validateUndefinedValue(index, info[key][index]);
                }else if(index === 'spotMonitor'){
                  this.ipRecording.videoOutput.spotMonitor = this.validateUndefinedValue(index, info[key][index]);
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
  addIPRecording(){
    this.loading = true;
    this.imageFile = this.imageSelectedFiles.item(0);

    let accessories = document.getElementsByClassName('accessories');
    
    for(let i = 0; i< accessories.length; i++){
      let element = <HTMLInputElement>accessories[i];
      
      if(element.checked === true){
        let accessory: Accessory = new Accessory();
        accessory.id = Number.parseInt(element.id);
        this.ipRecording.accessories.push(accessory)
      }
    }

    this.ipRecording.basicFeatures.raid = "";

    let array:MatOption[] = this.raidSelect.selected
    array.forEach(element => {
      let details: RaidDetails = new RaidDetails();
      details.raidVersion = element.value;

      if(element.value === 'RAID-5'){
        details.netStorage = Number.parseInt((<HTMLInputElement>document.getElementById('raid5Storage')).value);
      }else if(element.value === 'RAID-6'){
        details.netStorage = Number.parseInt((<HTMLInputElement>document.getElementById('raid6Storage')).value);
      }else if(element.value === 'RAID-5 plus hot spare'){
        details.netStorage = Number.parseInt((<HTMLInputElement>document.getElementById('raid5PlusStorage')).value);
      }

      this.ipRecording.raidDetails.push(details);
      this.ipRecording.basicFeatures.raid += element.value+',';
    });
    this.ipRecording.basicFeatures.raid = this.ipRecording.basicFeatures.raid.substring(0, this.ipRecording.basicFeatures.raid.length-1)

    this.ipRecoridngService.createIPRecording(this.ipRecording, this.datasheetFile, this.imageFile)
    .subscribe(
      (data: HttpResponse< { status :  string }> ) => {
        try {
          if(data.body.status === 'IP Recording added'){
            this.loading = false;
            CallOut.added = true;
            this.router.navigate(["/consult-ip-recordings"]);
          }
        } catch (error) {
          console.log('No logrado')
        }  
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'The IP Recording has not added.', 5000)     
      }
    );
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

      this.accessories.push(accessory)
    });
  }

  checkRaidValue(event){
    let raidDetails = document.getElementById('raidDetails')
    let raidDetailsStorage = document.getElementById('raidDetailsStorage')
    let raid5Label = (<HTMLInputElement>document.getElementById('raid5'))
    let raid5Storage = (<HTMLInputElement>document.getElementById('raid5Storage'))
    let raid5PlusLabel = (<HTMLInputElement>document.getElementById('raid5Plus'))
    let raid5PlusStorage = (<HTMLInputElement>document.getElementById('raid5PlusStorage'))
    let raid6Label = (<HTMLInputElement>document.getElementById('raid6'))
    let raid6Storage = (<HTMLInputElement>document.getElementById('raid6Storage'))

    raidDetails.style.display = "none";
    raidDetailsStorage.style.display = "none";
    raid5Label.style.display = "none";
    raid5Storage.style.display = "none";
    raid5PlusLabel.style.display = "none";
    raid5PlusStorage.style.display = "none";
    raid6Label.style.display = "none";
    raid6Storage.style.display = "none";

    if(event.value !== '' && event.value !== undefined){
      event.value.forEach(element => {
        if(element === 'RAID-5'){
          raid5Label.value = element;
          raid5Label.style.display = "block";
          raid5Storage.style.display = "block";
        }else if(element === 'RAID-6'){
          raid6Label.value = element;
          raid6Label.style.display = "block";
          raid6Storage.style.display = "block";
        }else if(element === 'RAID-5 plus hot spare'){
          raid5PlusLabel.value = element;
          raid5PlusLabel.style.display = "block";
          raid5PlusStorage.style.display = "block";
        }
      
        raidDetails.style.display = "block";
        raidDetailsStorage.style.display = "block";
      });
    }else{
      raidDetails.style.display = "none";
      raidDetailsStorage.style.display = "none";
    }
  }
}
