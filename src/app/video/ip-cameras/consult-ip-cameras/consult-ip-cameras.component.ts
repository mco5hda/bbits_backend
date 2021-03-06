import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IPCamera } from '../../models/cameras/ip-cameras.model';
import { Router } from '@angular/router';
import { Environment } from 'src/app/app.environment';
import { IpCameraService } from '../ip-camera.service';
import { CallOut } from './../../../utilities/callout';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';
import { Accessory } from '../../models/accessory.model';

@Component({
  selector: 'app-consult-ip-cameras',
  templateUrl: './consult-ip-cameras.component.html',
  styleUrls: ['./consult-ip-cameras.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultIpCamerasComponent implements OnInit {
  loading = false;
  ipCameras: IPCamera[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;


  constructor(
    private router: Router,
    private ipCameraService: IpCameraService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.getAllIPCameras();

    if(CallOut.added){
      CallOut.addCallOut('success', 'IP Camera added successfully', 5000);
      CallOut.added = false;
    }else if(CallOut.updated){
      CallOut.addCallOut('success', 'IP Camera updated successfully', 5000);
      CallOut.updated = false;
    }else if(CallOut.deleted){
      CallOut.addCallOut('success', 'IP Camera deleted successfully', 5000);
      CallOut.deleted = false;
    }
  }

  getAllIPCameras(){
    this.loading = true;

    this.ipCameraService.getIPCameras().subscribe(
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
      let ipCamera: IPCamera = new IPCamera();

      for(let key in element){
        if(key === 'ID'){
          ipCamera.id = element[key];
        }else if(key === 'NAME'){
          ipCamera.name = element[key];
        }else if(key === 'FAMILY'){
          ipCamera.family = element[key];
        }else if(key === 'CATEGORY'){
          ipCamera.category = element[key];
        }else if(key === 'IMAGE'){
          ipCamera.image = element[key];
        }else if(key === 'DATASHEET'){
          ipCamera.datasheet = element[key];
        }else if(key === 'CTN_CLASS'){
          ipCamera.ctnClass = element[key];
        }else if(key === 'CTN_CLASS_FULL'){
          ipCamera.ctnClassFull = element[key];
        }else if(key === 'PRICE'){
          ipCamera.price = element[key];
        }else if(key === 'RESOLUTION'){
          ipCamera.basicFeatures.maxResolution = element[key];
        }else if(key === 'IMAGE_SENSOR'){
          ipCamera.basicFeatures.sensorType = element[key];
        }else if(key === 'MAX_FPS'){
          ipCamera.basicFeatures.maxFPS = element[key];
        }else if(key === 'INDOOR_OUTDOOR'){
          ipCamera.basicFeatures.indoorOutdoor = element[key];
        }else if(key === 'DAY_NIGHT'){
          ipCamera.basicFeatures.dayNight = element[key];
        }else if(key === 'WDR'){
          ipCamera.basicFeatures.wideDinamicRange = element[key];
        }else if(key === 'ONVIF'){
          ipCamera.basicFeatures.onvif = element[key];
        }else if(key === 'MICROPHONE'){
          ipCamera.basicFeatures.microphone = element[key];
        }else if(key === 'POE'){
          ipCamera.basicFeatures.poe = element[key];
        }else if(key === 'IR_SENSITIVE'){
          ipCamera.basicFeatures.irSensitive = element[key];
        }else if(key === 'COMPRESSION'){
          ipCamera.advancedFeatures.compression = element[key];
        }else if(key === 'MULTI_STREAMING'){
          ipCamera.advancedFeatures.multiStreaming = element[key];
        }else if(key === 'IDNR'){
          ipCamera.advancedFeatures.idnr = element[key];
        }else if(key === 'IAE'){
          ipCamera.advancedFeatures.iae = element[key];
        }else if(key === 'PRIVACY_MASKING'){
          ipCamera.advancedFeatures.privacyMasking = element[key];
        }else if(key === 'ROI'){
          ipCamera.advancedFeatures.regionOfInterest = element[key];
        }else if(key === 'INTEREST_TRAKING'){
          ipCamera.advancedFeatures.interestTracking = element[key];
        }else if(key === 'PRESETS'){
          ipCamera.advancedFeatures.noPresets = element[key];
        }else if(key === 'WIPER'){
          ipCamera.advancedFeatures.wiper = element[key];
        }else if(key === 'THERMAL'){
          ipCamera.advancedFeatures.thermal = element[key];
        }else if(key === 'TAMPER_DETECTION'){
          ipCamera.alarmTriggering.tamperDetection = element[key];
        }else if(key === 'MOTION_DETECTION'){
          ipCamera.alarmTriggering.videoMotionDetection = element[key];
        }else if(key === 'AUDIO_DETECTION'){
          ipCamera.alarmTriggering.audioDetection = element[key];
        }else if(key === 'FACE_DETECTION'){
          ipCamera.alarmTriggering.faceDetection = element[key];
        }else if(key === 'INTELLIGENT_TRACKING'){
          ipCamera.alarmTriggering.intelligentTracking = element[key];
        }else if(key === 'MIN_ILLUMINATION_DAY'){
          ipCamera.sensitivity.minIluminationDayMode = element[key];
        }else if(key === 'MIN_ILLUMINATION_NIGHT'){
          ipCamera.sensitivity.minIlluminationNightMode = element[key];
        }else if(key === 'STARLIGHT'){
          ipCamera.sensitivity.startLight = element[key];
        }else if(key === 'INTEGRATED_IR'){
          ipCamera.sensitivity.integratedIr = element[key];
        }else if(key === 'OPTIONAL_IR'){
          ipCamera.sensitivity.optionalIr = element[key];
        }else if(key === 'ABF'){
          ipCamera.lens.automaticBackFocus = element[key];
        }else if(key === 'VARIFOCAL'){
          ipCamera.lens.varifocal = element[key];
        }else if(key === 'SUPER_RESOLUTION_LENS'){
          ipCamera.lens.superResolutionLens = element[key];
        }else if(key === 'FOCAL_LENGTH_FROM'){
          ipCamera.lens.focalLengthFrom = element[key];
        }else if(key === 'FOCAL_LENGTH_TILL'){
          ipCamera.lens.focalLengthTill = element[key];
        }else if(key === 'MAX_ANGLE_H'){
          ipCamera.lens.maxAngleH = element[key];
        }else if(key === 'MAX_ANGLE_V'){
          ipCamera.lens.maxAngleV = element[key];
        }else if(key === 'MIN_ANGLE_H'){
          ipCamera.lens.minAngleH = element[key];
        }else if(key === 'MIN_ANGLE_V'){
          ipCamera.lens.minAngleV = element[key];
        }else if(key === 'PTZ_ZOOM_DIGITAL'){
          ipCamera.lens.ptzZoomDigital = element[key];
        }else if(key === 'PTZ_OPTICAL_ZOOM'){
          ipCamera.lens.ptzOpticalZoom = element[key];
        }else if(key === 'TILT_ANGLE'){
          ipCamera.lens.tiltAngle = element[key];
        }else if(key === 'AUTO_VARIFOCAL'){
          ipCamera.lens.autoVarifocal = element[key];
        }else if(key === 'IVA'){
          ipCamera.lens.iva = element[key];
        }else if(key === 'DETECTION'){
          ipCamera.dcri.detection = element[key];
        }else if(key === 'CLASIFICATION'){
          ipCamera.dcri.clasification = element[key];
        }else if(key === 'RECOGNITION'){
          ipCamera.dcri.recognition = element[key];
        }else if(key === 'IDENTIFICATION'){
          ipCamera.dcri.identification = element[key];
        }else if(key === 'BUILD_IN_STORAGE'){
          ipCamera.storage.builtInStorage = element[key];
        }else if(key === 'DIRECT_TO_ISCSI'){
          ipCamera.storage.directToIscsi = element[key];
        }else if(key === 'CLOUD_STORAGE'){
          ipCamera.storage.cloudStorage = element[key];
        }else if(key === 'ALARM_INPUT_OUTPUT'){
          ipCamera.connections.alarmInputOutput = element[key];
        }else if(key === 'AUDIO_IN_OUT'){
          ipCamera.connections.audioInOut = element[key];
        }else if(key === 'HYBRID'){
          ipCamera.connections.hybrid = element[key];
        }else if(key === 'CONFRONTATION_MONITOR'){
          ipCamera.connections.confrontationMonitor = element[key];
        }else if(key === 'WEATHER_RATING'){
          ipCamera.housing.weatherRating = element[key];
        }else if(key === 'VANDAL_RESISTANT'){
          ipCamera.housing.vandalResistant = element[key];
        }else if(key === 'CORROSION_PROOF'){
          ipCamera.housing.corrosionProof = element[key];
        }else if(key === 'EXPLOSION_PROOF'){
          ipCamera.housing.explosionProof = element[key];
        }else if(key === 'OPERATING_TEMPERATURE'){
          ipCamera.housing.operatingTemperature = element[key];
        }
      }

      this.getIPCameraAccessories(ipCamera);

      this.ipCameras.push(ipCamera)
    });
  }

  getIPCameraAccessories(ipCamera: IPCamera){
    this.ipCameraService.getIPCameraAccessories(ipCamera.id).subscribe(
      data => {
        this.fillListAccessories(data[0], ipCamera);
        this.loading = false;
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'Not found elements. Retry again.', 5000)     
      }
    );
  }
 
  fillListAccessories(data, ipCamera: IPCamera){
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

      ipCamera.accessories.push(accessory)
    });
  }

  detailsIPCamera(id: number){
    let ipCamera: IPCamera;

    this.ipCameras.forEach(element => {
      if(element.id === id){
        ipCamera = element;
      }
    });
  
    sessionStorage.setItem("ipCameraElement", JSON.stringify(ipCamera));
    this.router.navigate(["/details-ip-camera"]);
  }

  editIPCamera(id: number){
    let ipCamera: IPCamera;

    this.ipCameras.forEach(element => {
      if(element.id === id){
        ipCamera = element;
      }
    });
  
    sessionStorage.setItem("ipCameraElement", JSON.stringify(ipCamera));
    this.router.navigate(["/edit-ip-camera"]);
  }

  deleteIPCamera(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if ( res ){
          this.loading = true;

          this.ipCameraService.deleteIPCamera(id).subscribe(
            (data) => {
              try {
                if(data['status'] === 'IP Camera deleted'){
                  this.loading = false;
                  this.ipCameras = this.ipCameras.filter(c => c.id !== id);
                  CallOut.addCallOut('success', 'IP Camera deleted.', 5000);
                }
              } catch (error) {
                console.log('No logrado')
              }  
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The IP Camera has not deleted.', 5000)     
            }
          );
        }
      }
    );
  }
}
