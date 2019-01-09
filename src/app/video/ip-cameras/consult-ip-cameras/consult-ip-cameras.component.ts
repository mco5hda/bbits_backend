import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IPCamera } from '../../models/cameras/ip-cameras.model';
import { Router } from '@angular/router';
import { Environment } from 'src/app/app.environment';

@Component({
  selector: 'app-consult-ip-cameras',
  templateUrl: './consult-ip-cameras.component.html',
  styleUrls: ['./consult-ip-cameras.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultIpCamerasComponent implements OnInit {

  ipCameras: IPCamera[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.getAllIPCameras();
  }

  getAllIPCameras(){
    //Send the request to the  server and get the json with the ip cameras elements array

    let data = {
      "name": 'Prueba',
      "family": 'Prueba',
      "category": 'Prueba',
      "ctnClass": 'Prueba',
      "ctnClassFull": 'Prueba',
      "basicFeatures":{
        "maxResolution" : "2MP",
        "sensorType" : "1/2.8‑inch CMOS",
        "maxFPS" : "60",
        "indoorOutdoor" : "Outdoor",
        "dayNight" : "Day",
        "wideDinamicRange" : "dB WDR",
        "onvif" : true,
        "microphone" : false,
        "poe" : true,
        "irSensitive" : false
      },
      "advancedFeatures":{
        "compression" : "H.264 (MP); M- JPEG",
        "multiStreaming" : "Multiple configurable streams in H.264 and M-",
        "idnr" : true,
        "iae" : true,
        "privacyMasking" : true,
        "regionOfInterest" : true,
        "interestTracking" : true,
        "noPresets" : false,
        "wiper" : false,
        "thermal" : false
      },
      "alarmTriggering":{
        "tamperDetection" : true,
        "videoMotionDetection" : true,
        "audioDetection" : false,
        "faceDetection" : false,
        "intelligentTracking" : true
      },
      "sensitivity":{
        "minIluminationDayMode" : undefined,
        "minIlluminationNightMode" : undefined,
        "startLight" :true,
        "integratedIr" : false,
        "optionalIr" : true
      },
      "lens":{
        "automaticBackFocus" : false,
        "varifocal" : true,
        "superResolutionLens" : true,
        "focalLengthFrom" : "3",
        "focalLengthTill" : "9",
        "maxAngleH" : "117",
        "maxAngleV" : "59",
        "minAngleH" : "37",
        "minAngleV" : "21",
        "ptzZoomDigital" : false,
        "ptzOpticalZoom" : false,
        "tiltAngle" : undefined,
        "autoVarifocal" : true,
        "iva" : "IVA"
      },
      "dcri":{
        "detection" : undefined,
        "clasification" : undefined,
        "recognition" : undefined,
        "identification" : undefined
      },
      "storage":{
        "builtInStorage" : true,
        "directToIscsi" : true,
        "cloudStorage" : true
      },
      "connections":{
        "alarmInputOutput" : true,
        "audioInOut" : true,
        "hybrid" : true,
        "confrontationMonitor" : true
      },
      "housing":{
        "weatherRating" : "IP66",
        "vandalResistant" : "IK10).",
        "corrosionProof" : false,
        "explosionProof" : false,
        "operatingTemperature" : "EnvironmentalEN 50130-5:2011 Class IV"
      },
      "price" : "1.0",
      "electricalData":{
        "inputVoltage" : undefined,
        "normalVersion" : "7.2 w max.",
        "irVersion" : undefined
      }
    }

    for (let index = 0; index < 10; index++) {
      let ipCamera: IPCamera = new IPCamera();
      ipCamera.id = index;
      for(let key in data){
        if(key === 'name'){
          ipCamera.name = 'Prueba: '+index;
        }else if(key === 'family'){
          ipCamera.family = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'category'){
          ipCamera.category = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'ctnClass'){
          ipCamera.ctnClass = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'ctnClassFull'){
          ipCamera.ctnClassFull = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'price'){
          ipCamera.price = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'basicFeatures'){
          for(let index in data[key]){
            if(index === 'maxResolution'){
              ipCamera.basicFeatures.maxResolution = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'sensorType'){
              ipCamera.basicFeatures.sensorType = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'maxFPS'){
              ipCamera.basicFeatures.maxFPS = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'indoorOutdoor'){
              ipCamera.basicFeatures.indoorOutdoor = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'dayNight'){
              ipCamera.basicFeatures.dayNight = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'wideDinamicRange'){
              ipCamera.basicFeatures.wideDinamicRange = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'onvif'){
              ipCamera.basicFeatures.onvif = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'microphone'){
              ipCamera.basicFeatures.microphone = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'poe'){
              ipCamera.basicFeatures.poe = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'irSensitive'){
              ipCamera.basicFeatures.irSensitive = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'advancedFeatures'){
          for(let index in data[key]){
            if(index === 'compression'){
              ipCamera.advancedFeatures.compression = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'multiStreaming'){
              ipCamera.advancedFeatures.multiStreaming = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'idnr'){
              ipCamera.advancedFeatures.idnr = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'iae'){
              ipCamera.advancedFeatures.iae = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'privacyMasking'){
              ipCamera.advancedFeatures.privacyMasking = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'regionOfInterest'){
              ipCamera.advancedFeatures.regionOfInterest = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'interestTracking'){
              ipCamera.advancedFeatures.interestTracking = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'noPresets'){
              ipCamera.advancedFeatures.noPresets = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'wiper'){
              ipCamera.advancedFeatures.wiper = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'thermal'){
              ipCamera.advancedFeatures.thermal = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'alarmTriggering'){
          for(let index in data[key]){
            if(index === 'tamperDetection'){
              ipCamera.alarmTriggering.tamperDetection = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'videoMotionDetection'){
              ipCamera.alarmTriggering.videoMotionDetection = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'audioDetection'){
              ipCamera.alarmTriggering.audioDetection = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'faceDetection'){
              ipCamera.alarmTriggering.faceDetection = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'intelligentTracking'){
              ipCamera.alarmTriggering.intelligentTracking = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'sensitivity'){
          for(let index in data[key]){
            if(index === 'minIluminationDayMode'){
              ipCamera.sensitivity.minIluminationDayMode = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'minIlluminationNightMode'){
              ipCamera.sensitivity.minIlluminationNightMode = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'startLight'){
              ipCamera.sensitivity.startLight = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'integratedIr'){
              ipCamera.sensitivity.integratedIr = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'optionalIr'){
              ipCamera.sensitivity.optionalIr = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'lens'){
          for(let index in data[key]){
            if(index === 'automaticBackFocus'){
              ipCamera.lens.automaticBackFocus = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'varifocal'){
              ipCamera.lens.varifocal = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'superResolutionLens'){
              ipCamera.lens.superResolutionLens = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'focalLengthFrom'){
              ipCamera.lens.focalLengthFrom = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'focalLengthTill'){
              ipCamera.lens.focalLengthTill = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'maxAngleH'){
              ipCamera.lens.maxAngleH = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'maxAngleV'){
              ipCamera.lens.maxAngleV = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'minAngleH'){
              ipCamera.lens.minAngleH = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'minAngleV'){
              ipCamera.lens.minAngleV = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'ptzZoomDigital'){
              ipCamera.lens.ptzZoomDigital = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'ptzOpticalZoom'){
              ipCamera.lens.ptzOpticalZoom = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'tiltAngle'){
              ipCamera.lens.tiltAngle = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'autoVarifocal'){
              ipCamera.lens.autoVarifocal = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'iva'){
              ipCamera.lens.iva = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'dcri'){
          for(let index in data[key]){
            if(index === 'detection'){
              ipCamera.dcri.detection = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'clasification'){
              ipCamera.dcri.clasification = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'recognition'){
              ipCamera.dcri.recognition = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'identification'){
              ipCamera.dcri.identification = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'storage'){
          for(let index in data[key]){
            if(index === 'builtInStorage'){
              ipCamera.storage.builtInStorage = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'directToIscsi'){
              ipCamera.storage.directToIscsi = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'cloudStorage'){
              ipCamera.storage.cloudStorage = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'connections'){
          for(let index in data[key]){
            if(index === 'alarmInputOutput'){
              ipCamera.connections.alarmInputOutput = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'audioInOut'){
              ipCamera.connections.audioInOut = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'hybrid'){
              ipCamera.connections.hybrid = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'confrontationMonitor'){
              ipCamera.connections.confrontationMonitor = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'housing'){
          for(let index in data[key]){
            if(index === 'weatherRating'){
              ipCamera.housing.weatherRating = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'vandalResistant'){
              ipCamera.housing.vandalResistant = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'corrosionProof'){
              ipCamera.housing.corrosionProof = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'explosionProof'){
              ipCamera.housing.explosionProof = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'operatingTemperature'){
              ipCamera.housing.operatingTemperature = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'electricalData'){
          for(let index in data[key]){
            if(index === 'inputVoltage'){
              ipCamera.electricalData.inputVoltage = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'normalVersion'){
              ipCamera.electricalData.normalVersion = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'irVersion'){
              ipCamera.electricalData.irVersion = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }
      }
      
      this.ipCameras.push(ipCamera)
    }
  }

  validateUndefinedValue(key, value){
    if(value === undefined){
      return '';
    }else{
      return value;
    }
  }

  detailsIPCamera(id: number){
    sessionStorage.setItem("ipCameraElement", JSON.stringify(this.ipCameras[id]));
    this.router.navigate(["/details-ip-camera"]);
  }

  editIPCamera(id: number){
    sessionStorage.setItem("ipCameraElement", JSON.stringify(this.ipCameras[id]));
    this.router.navigate(["/edit-ip-camera"]);
  }

  deleteIPCamera(id: number){
    alert('Delete');
  }
}
