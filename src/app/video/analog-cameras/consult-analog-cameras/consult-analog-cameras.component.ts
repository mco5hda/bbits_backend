import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/app.environment';
import { AnalogCamera } from '../../models/cameras/analog-cameras.model';
import { CallOut } from './../../../utilities/callout';
import { AnalogCameraService } from '../analog-camera.service';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';

@Component({
  selector: 'app-consult-analog-cameras',
  templateUrl: './consult-analog-cameras.component.html',
  styleUrls: ['./consult-analog-cameras.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultAnalogCamerasComponent implements OnInit {
  loading = false;
  analogCameras: AnalogCamera[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;

  constructor(
    private router: Router,
    private analogCameraService: AnalogCameraService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.getAllAnalogCameras();

    if(CallOut.added){
      CallOut.addCallOut('success', 'Analog Camera added successfully', 5000);
      CallOut.added = false;
    }else if(CallOut.updated){
      CallOut.addCallOut('success', 'Analog Camera updated successfully', 5000);
      CallOut.updated = false;
    }else if(CallOut.deleted){
      CallOut.addCallOut('success', 'Analog Camera deleted successfully', 5000);
      CallOut.deleted = false;
    }
  }

  getAllAnalogCameras(){
    //Send the request to the  server and get the json with the analog cameras elements array

    this.analogCameraService.getAnalogCameras().subscribe(
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
      let analogCamera: AnalogCamera = new AnalogCamera();

      for(let key in element){
        if(key === 'ID'){
          analogCamera.id = element[key];
        }else if(key === 'NAME'){
          analogCamera.name = element[key];
        }else if(key === 'FAMILY'){
          analogCamera.family = element[key];
        }else if(key === 'CATEGORY'){
          analogCamera.category = element[key];
        }else if(key === 'IMAGE'){
          analogCamera.image = element[key];
        }else if(key === 'DATASHEET'){
          analogCamera.datasheet = element[key];
        }else if(key === 'CTN_CLASS'){
          analogCamera.ctnClass = element[key];
        }else if(key === 'CTN_CLASS_FULL'){
          analogCamera.ctnClassFull = element[key];
        }else if(key === 'PRICE'){
          analogCamera.price = element[key];
        }else if(key === 'MAX_RESOLUTION'){
          analogCamera.basicFeatures.maxResolution = element[key];
        }else if(key === 'SENSOR_TYPE'){
          analogCamera.basicFeatures.sensorType = element[key];
        }else if(key === 'INDOOR_OUTDOOR'){
          analogCamera.basicFeatures.indoorOutdoor = element[key];
        }else if(key === 'DAY_NIGHT'){
          analogCamera.basicFeatures.dayNight = element[key];
        }else if(key === 'WIDE_DYNAMIC_RANGE'){
          analogCamera.basicFeatures.wideDinamicRange = element[key];
        }else if(key === 'IR_SENSITIVE'){
          analogCamera.basicFeatures.irSensitive = element[key];
        }else if(key === 'PRIVACY_MASKING'){
          analogCamera.advancedFeatures.privacyMasking = element[key];
        }else if(key === 'TAMPER_DETECTION'){
          analogCamera.alarmTriggering.tamperDetection = element[key];
        }else if(key === 'MOTION_DETECTION'){
          analogCamera.alarmTriggering.videoMotionDetection = element[key];
        }else if(key === 'MIN_ILLUMINATION_DAY_MODE'){
          analogCamera.sensitivity.minIluminationDayMode = element[key];
        }else if(key === 'MIN_ILLUMINATION_NIGHT_MODE'){
          analogCamera.sensitivity.minIlluminationNightMode = element[key];
        }else if(key === 'MAX_RANGE_AT_NIGHT'){
          analogCamera.sensitivity.startLight = element[key];
        }else if(key === 'NIGHT_VISION'){
          analogCamera.sensitivity.integratedIr = element[key];
        }else if(key === 'FOCAL_LENGTH_FROM'){
          analogCamera.lens.focalLengthFrom = element[key];
        }else if(key === 'FOCAL_LENGTH_TILL'){
          analogCamera.lens.focalLengthTill = element[key];
        }else if(key === 'MAX_ANGLE_H'){
          analogCamera.lens.maxAngleH = element[key];
        }else if(key === 'MIN_ANGLE_H'){
          analogCamera.lens.minAngleH = element[key];;
        }else if(key === 'PTZ_ZOOM_DIGITAL'){
          analogCamera.lens.ptzZoomDigital = element[key];
        }else if(key === 'PTZ_OPTICAL_ZOOM'){
          analogCamera.lens.ptzOpticalZoom = element[key];
        }else if(key === 'TILT_ANGLE'){
          analogCamera.lens.tiltAngle = element[key];
        }else if(key === 'ALARM_INPUT_OUTPUT'){
          analogCamera.connections.alarmInputOutput = element[key];
        }else if(key === 'WEATHER_RATING'){
          analogCamera.housing.weatherRating = element[key];
        }else if(key === 'VANDAL_RESISTANT'){
          analogCamera.housing.vandalResistant = element[key];
        }else if(key === 'OPERATING_TEMPERATURE'){
          analogCamera.housing.operatingTemperature = element[key];
        }
      }
      this.analogCameras.push(analogCamera)
    });
      
    
  }

  detailsAnalogCamera(id: number){
    let analogCamera: AnalogCamera;

    this.analogCameras.forEach(element => {
      if(element.id === id){
        analogCamera = element;
      }
    });

    sessionStorage.setItem("analogCameraElement", JSON.stringify(analogCamera));
    this.router.navigate(["/details-analog-camera"]);
  }

  editAnalogCamera(id: number){
    let analogCamera: AnalogCamera;

    this.analogCameras.forEach(element => {
      if(element.id === id){
        analogCamera = element;
      }
    });

    sessionStorage.setItem("analogCameraElement", JSON.stringify(analogCamera));
    this.router.navigate(["/edit-analog-camera"]);
  }

  deleteAnalogCamera(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if ( res ){
          this.loading = true;

          this.analogCameraService.deleteAnalogCamera(id).subscribe(
            (data) => {
              try {
                console.log(data['status']);
                if(data['status'] === 'Analog Camera deleted'){
                  this.loading = false;
                  this.analogCameras = this.analogCameras.filter(c => c.id !== id);
                  CallOut.addCallOut('success', 'Analog Camera deleted.', 5000);
                }
              } catch (error) {
                console.log('No logrado')
              }  
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The Analog Camera has not deleted.', 5000)     
            }
          );
        }
      }
    );
  }

}
