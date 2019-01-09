import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/app.environment';
import { IPRecording } from '../../models/recordings/ip-recordings.model';

@Component({
  selector: 'app-consult-ip-recordings',
  templateUrl: './consult-ip-recordings.component.html',
  styleUrls: ['./consult-ip-recordings.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultIpRecordingsComponent implements OnInit {

  ipRecordings: IPRecording[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllIPRecordings();
  }

  getAllIPRecordings(){
    //Send the request to the  server and get the json with the ip cameras elements array

    let data = {
      "id": "",
      "name": undefined,
      "family": undefined,
      "category": undefined,
      "accessories" : "DIP-6703-HDD,DIP-6704-HDD,DIP-6706-HDD,DIP-6708-HDD,DLA-XVRM-064",
      "image": undefined,
      "thumbnail": undefined,
      "datasheet": undefined,
      "ctnClass": undefined,
      "ctnClassFull": undefined,
      "dataFormat": undefined,
      "subTypes": [
        {"name": "DIP-6183-4HD","description": "DIVAR IP 6000 2U, 4 x 3 TB HDD"},
        {"name": "DIP-6183-8HD","description": "DIVAR IP 6000 2U, 8 x 3 TB HDD"},
        {"name": "DIP-6184-4HD","description": "4 | DIVAR IP 6000 2U"},
        {"name": "DIP-6184-8HD","description": "DIVAR IP 6000 2U, 8 x 4 TB HDD"},
        {"name": "DIP-6186-8HD","description":"DIVAR IP 6000 2U, 8 x 6 TB HDD"},
        {"name": "DIP-6188-8HD","description": "DIVAR IP 6000 2U, 8 x 8 TB HDD"},
        {"name": "DIP-6180-00N","description": "DIVAR IP 6000 2U, w/o HDD"}
      ],
      "basicFeaturesRecording":{
        "systemSize" : undefined,
        "videoCompression" : undefined,
        "ipChannels" : undefined,
        "integratedVideoManagement" : true,
        "bandwidth" : undefined,
        "supportedResolution" : undefined,
        "onBoardTranscoding" : false,
        "onvif" : false,
        "psr" : false,
        "hotSwappablwHDD" : true,
        "monitorOutput" : true,
        "raid" : "RAID-5,RAID‑5,RAID‑6,RAID-1"
      },
      "advancedFeaturesRecording":{
        "forensicSearchSupport" : false,
        "supportWebClient" : false
      },
      "aioFunctionsRecording":{
        "ptzControls" : false,
        "adminControl" : true,
        "exportOptions" : false,
        "cctvKeyboardSupport" : false
      },
      "audioRecording":{
        "inOutChanels" : false,
        "compressionType" : false,
        "synchronousType" : false,
        "amcta" : false
      },
      "backUpRecoding":{
        "dvdWritter" : false,
        "supportedDevices" : undefined,
        "backUpMode" : "Manual"
      },
      "integrationRecording":{
        "optionalAtpmPos" : false,
        "integrationToolsSDK" : false
      },
      "localRemoteViewingRecording":{
        "videoSecurityApp" : false,
        "webBrowserAccess" : false,
        "simultaneousUsers" : undefined,
        "viewingBVC" : true,
        "bvms" : false
      },
      "mechanicalRecording":{
        "formFactor" : "2HU rack mount",
        "networkConnection" : "Dual Intel i210AT Gigabit LAN",
        "usbPorts" : "Front: 2 USB 2.0 ports, Rear: 2 USB 2.0 ports, 2 USB 3.0 ports",
        "numberOfPowerSupplies" : "740 W Platinum Level Redundant",
        "powerSuppliesHS" : true
      },
      "recording":{
        "videoRecordingManager" : true,
        "scheduleRecording" : false
      },
      "storageOptionsExtensionsRecording":{
        "maxNumberOfUnits" : undefined,
        "maximumDrievesSupported" : undefined,
        "availableCapacitiesPerDriveExtensions" : undefined,
        "hotSwappable" : true
      },
      "storageOptionsRecording":{
        "maxDrivesSupported" : undefined,
        "baseSystemCapacity" : undefined,
        "maxBaseSystemCapacity" : undefined,
        "fullSystemCapacity" : undefined,
        "availableCapacitiesPerDrive" : undefined
      },
      "videoOutputRecording":{
        "connectorType" : undefined,
        "spotMonitor" : undefined
      },
      "price" : "1.0",
      "electricalData":{
        "inputVoltage" : "140",
        "normalVersion" : "4hd: 200.5"
      }
    }

    for (let index = 0; index < 10; index++) {
      let ipRecording: IPRecording = new IPRecording();

      ipRecording.id = index;
      for(let key in data){
        if(key === 'name'){
          ipRecording.name = 'Prueba'+index;
        }else if(key === 'family'){
          ipRecording.family = 'Prueba'
        }else if(key === 'category'){
          ipRecording.category = 'Prueba'
        }else if(key === 'ctnClass'){
          ipRecording.ctnClass = 'Prueba'
        }else if(key === 'ctnClassFull'){
          ipRecording.ctnClassFull = 'Prueba'
        }else if(key === 'price'){
          ipRecording.price = 'Prueba'
        }else if(key === 'dataFormat'){
          ipRecording.dataFormat = 'Prueba'
        }else if(key === 'basicFeaturesRecording'){
          for(let index in data[key]){
            if(index === 'systemSize'){
              ipRecording.basicFeatures.systemSize = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'videoCompression'){
              ipRecording.basicFeatures.videoCompression = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'ipChannels'){
              ipRecording.basicFeatures.ipChannels = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'integratedVideoManagement'){
              ipRecording.basicFeatures.integratedVideoManagement = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'bandwidth'){
              ipRecording.basicFeatures.bandwidth = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'supportedResolution'){
              ipRecording.basicFeatures.supportedResolution = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'onBoardTranscoding'){
              ipRecording.basicFeatures.onBoardTranscoding = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'onvif'){
              ipRecording.basicFeatures.onvif = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'psr'){
              ipRecording.basicFeatures.psr = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'hotSwappablwHDD'){
              ipRecording.basicFeatures.hotSwappablwHDD = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'monitorOutput'){
              ipRecording.basicFeatures.monitorOutput = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'raid'){
              ipRecording.basicFeatures.raid = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'advancedFeaturesRecording'){
          for(let index in data[key]){
            if(index === 'forensicSearchSupport'){
              ipRecording.advancedFeatures.forensicSearchSupport = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'supportWebClient'){
              ipRecording.advancedFeatures.supportWebClient = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'aioFunctionsRecording'){
          for(let index in data[key]){
            if(index === 'ptzControls'){
              ipRecording.aioFunctions.ptzControls = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'adminControl'){
              ipRecording.aioFunctions.adminControl = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'exportOptions'){
              ipRecording.aioFunctions.exportOptions = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'cctvKeyboardSupport'){
              ipRecording.aioFunctions.cctvKeyboardSupport = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'audioRecording'){
          for(let index in data[key]){
            if(index === 'inOutChanels'){
              ipRecording.audio.inOutChanels = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'compressionType'){
              ipRecording.audio.compressionType = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'synchronousType'){
              ipRecording.audio.synchronousType = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'amcta'){
              ipRecording.audio.amcta = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'backUpRecoding'){
          for(let index in data[key]){
            if(index === 'dvdWritter'){
              ipRecording.backUp.dvdWritter = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'supportedDevices'){
              ipRecording.backUp.supportedDevices = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'backUpMode'){
              ipRecording.backUp.backUpMode = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'integrationRecording'){
          for(let index in data[key]){
            if(index === 'optionalAtpmPos'){
              ipRecording.integration.optionalAtpmPos = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'integrationToolsSDK'){
              ipRecording.integration.integrationToolsSDK = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'localRemoteViewingRecording'){
          for(let index in data[key]){
            if(index === 'videoSecurityApp'){
              ipRecording.larViewing.videoSecurityApp = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'webBrowserAccess'){
              ipRecording.larViewing.webBrowserAccess = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'simultaneousUsers'){
              ipRecording.larViewing.simultaneousUsers = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'viewingBVC'){
              ipRecording.larViewing.viewingBVC = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'bvms'){
              ipRecording.larViewing.bvms = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'mechanicalRecording'){
          for(let index in data[key]){
            if(index === 'formFactor'){
              ipRecording.mechanical.formFactor = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'networkConnection'){
              ipRecording.mechanical.networkConnection = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'usbPorts'){
              ipRecording.mechanical.usbPorts = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'numberOfPowerSupplies'){
              ipRecording.mechanical.numberOfPowerSupplies = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'powerSuppliesHS'){
              ipRecording.mechanical.powerSuppliesHS = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'recording'){
          for(let index in data[key]){
            if(index === 'videoRecordingManager'){
              ipRecording.recording.videoRecordingManager = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'scheduleRecording'){
              ipRecording.recording.scheduleRecording = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'storageOptionsExtensionsRecording'){
          for(let index in data[key]){
            if(index === 'maxNumberOfUnits'){
              ipRecording.storageExtensions.maxNumberOfUnits = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'maximumDrievesSupported'){
              ipRecording.storageExtensions.maximumDrievesSupported = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'availableCapacitiesPerDriveExtensions'){
              ipRecording.storageExtensions.availableCapacitiesPerDriveExtensions = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'hotSwappable'){
              ipRecording.storageExtensions.hotSwappable = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'storageOptionsRecording'){
          for(let index in data[key]){
            if(index === 'maxDrivesSupported'){
              ipRecording.storageOptions.maxDrivesSupported = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'baseSystemCapacity'){
              ipRecording.storageOptions.baseSystemCapacity = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'maxBaseSystemCapacity'){
              ipRecording.storageOptions.maxBaseSystemCapacity = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'fullSystemCapacity'){
              ipRecording.storageOptions.fullSystemCapacity = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'availableCapacitiesPerDrive'){
              ipRecording.storageOptions.availableCapacitiesPerDrive = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'videoOutputRecording'){
          for(let index in data[key]){
            if(index === 'connectorType'){
              ipRecording.videoOutput.connectorType = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'spotMonitor'){
              ipRecording.videoOutput.spotMonitor = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'electricalData'){
          for(let index in data[key]){
            if(index === 'inputVoltage'){
              ipRecording.electricalData.inputVoltage = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'normalVersion'){
              ipRecording.electricalData.normalVersion = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'irVersion'){
              ipRecording.electricalData.irVersion = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }
      }

      this.ipRecordings.push(ipRecording)
    }
      
  }

  validateUndefinedValue(key, value){
    if(value === undefined){
      return '';
    }else{
      return value;
    }
  }

  detailsIPRecording(id: number){
    sessionStorage.setItem("ipRecordingElement", JSON.stringify(this.ipRecordings[id]));
    this.router.navigate(["/details-ip-recording"]);
  }

  editIPRecording(id: number){
    sessionStorage.setItem("ipRecordingElement", JSON.stringify(this.ipRecordings[id]));
    this.router.navigate(["/edit-ip-recording"]);
  }

  deleteIPRecording(id: number){
    alert('Delete');
  }
}
