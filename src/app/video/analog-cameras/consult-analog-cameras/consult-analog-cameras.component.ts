import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/app.environment';
import { AnalogCamera } from '../../models/cameras/analog-cameras.model';

@Component({
  selector: 'app-consult-analog-cameras',
  templateUrl: './consult-analog-cameras.component.html',
  styleUrls: ['./consult-analog-cameras.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultAnalogCamerasComponent implements OnInit {

  analogCameras: AnalogCamera[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllAnalogCameras();
  }

  getAllAnalogCameras(){
    //Send the request to the  server and get the json with the ip cameras elements array

    let data = {
      "id": "",
      "name": "TINYON AN 1000",
      "family": "1000",
      "category": "Fixed AN cameras",
      "accessories" : "LVF-5000C-D2811,LVF-5000C-D0550,LTC 3664/31,EX12LED-3BD-8M,EX12LED-3BD-8W,EX12LED-3BD-9M,EX12LED-3BD-9W,TC8235GIT,UPA-2430-60,UPA-2420-50,UPA-2450-50,UPA-2450-60,S1374,VP-CFGSFT",
      "image": undefined,
      "thumbnail": undefined,
      "datasheet": undefined,
      "ctnClass": "VPC1055",
      "ctnClassFull": "VPC-1055",
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
      },
      "alarmTriggering":{
        "tamperDetection" : false,
        "videoMotionDetection" : true
      },
      "sensitivity":{
        "minIluminationDayMode" : "0.5",
        "minIlluminationNightMode" : "0.2",
        "nightVision" : true,
        "maxRangeAtNight" : 0
      },
      "lens":{
        "focalLengthFrom" : "2.50",
        "focalLengthTill" : "2.5",
        "maxAngleH" : "85.0",
        "minAngleH" : "65.0",
        "ptzZoomDigital" : false,
        "ptzOpticalZoom" : false,
        "tiltAngle" : false
      },
      "connections":{
        "alarmInputOutput" : true
      },
      "housing":{
        "weatherRating" : "IP65",
        "vandalResistant" : "IK9",
        "operatingTemperature" : "-20°C TO +55°C (-4°F TO 131°F)"
      },
      "price" : "1.0",
      "electricalData":{
        "inputVoltage" : "12",
        "normalVersion" : "1.20"
      }
    }

    for (let index = 0; index < 10; index++) {
      let analogCamera: AnalogCamera = new AnalogCamera();
      analogCamera.id = index;
      
      for(let key in data){
        if(key === 'name'){
          analogCamera.name = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'family'){
          analogCamera.family = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'category'){
          analogCamera.category = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'ctnClass'){
          analogCamera.ctnClass = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'ctnClassFull'){
          analogCamera.ctnClassFull = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'price'){
          analogCamera.price = this.validateUndefinedValue(key, data[key]);
        }else if(key === 'basicFeatures'){
          for(let index in data[key]){
            if(index === 'maxResolution'){
              analogCamera.basicFeatures.maxResolution = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'sensorType'){
              analogCamera.basicFeatures.sensorType = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'indoorOutdoor'){
              analogCamera.basicFeatures.indoorOutdoor = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'dayNight'){
              analogCamera.basicFeatures.dayNight = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'wideDinamicRange'){
              analogCamera.basicFeatures.wideDinamicRange = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'irSensitive'){
              analogCamera.basicFeatures.irSensitive = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'advancedFeatures'){
          for(let index in data[key]){
            if(index === 'privacyMasking'){
              analogCamera.advancedFeatures.privacyMasking = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'alarmTriggering'){
          for(let index in data[key]){
            if(index === 'tamperDetection'){
              analogCamera.alarmTriggering.tamperDetection = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'videoMotionDetection'){
              analogCamera.alarmTriggering.videoMotionDetection = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'sensitivity'){
          for(let index in data[key]){
            if(index === 'minIluminationDayMode'){
              analogCamera.sensitivity.minIluminationDayMode = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'minIlluminationNightMode'){
              analogCamera.sensitivity.minIlluminationNightMode = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'nightVision'){
              analogCamera.sensitivity.nightVision = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'maxRangeAtNight'){
              analogCamera.sensitivity.maxRangeAtNight = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'lens'){
          for(let index in data[key]){
            if(index === 'focalLengthFrom'){
              analogCamera.lens.focalLengthFrom = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'focalLengthTill'){
              analogCamera.lens.focalLengthTill = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'maxAngleH'){
              analogCamera.lens.maxAngleH = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'minAngleH'){
              analogCamera.lens.minAngleH = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'ptzZoomDigital'){
              analogCamera.lens.ptzZoomDigital = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'ptzOpticalZoom'){
              analogCamera.lens.ptzOpticalZoom = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'tiltAngle'){
              analogCamera.lens.tiltAngle = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'connections'){
          for(let index in data[key]){
            if(index === 'alarmInputOutput'){
              analogCamera.connections.alarmInputOutput = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'housing'){
          for(let index in data[key]){
            if(index === 'weatherRating'){
              analogCamera.housing.weatherRating = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'vandalResistant'){
              analogCamera.housing.vandalResistant = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'operatingTemperature'){
              analogCamera.housing.operatingTemperature = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'electricalData'){
          for(let index in data[key]){
            if(index === 'inputVoltage'){
              analogCamera.electricalData.inputVoltage = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'normalVersion'){
              analogCamera.electricalData.normalVersion = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'irVersion'){
              analogCamera.electricalData.irVersion = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }
      }
      
      this.analogCameras.push(analogCamera)
    }
  }

  validateUndefinedValue(key, value){
    if(value === undefined){
      return '';
    }else{
      return value;
    }
  }

  detailsAnalogCamera(id: number){
    sessionStorage.setItem("analogCameraElement", JSON.stringify(this.analogCameras[id]));
    this.router.navigate(["/details-analog-camera"]);
  }

  editAnalogCamera(id: number){
    sessionStorage.setItem("analogCameraElement", JSON.stringify(this.analogCameras[id]));
    this.router.navigate(["/edit-analog-camera"]);
  }

  deleteAnalogCamera(id: number){
    alert('Delete');
  }

}
