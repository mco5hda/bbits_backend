import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnalogRecording } from '../../models/recordings/analog-recordings.model';
import { Router } from '@angular/router';
import { Environment } from 'src/app/app.environment';
import { CallOut } from './../../../utilities/callout';
import { AnalogRecordingService } from '../analog-recording.service';

@Component({
  selector: 'app-consult-analog-recordings',
  templateUrl: './consult-analog-recordings.component.html',
  styleUrls: ['./consult-analog-recordings.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultAnalogRecordingsComponent implements OnInit {

  analogRecordings: AnalogRecording[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;

  loading: boolean = false;

  constructor(
    private router: Router, 
    private analogRecordingService: AnalogRecordingService,
  ) { }

  ngOnInit() {
    this.getAllAnalogRecordings();

    if(CallOut.added){
      CallOut.addCallOut('success', 'Analog Recording Camera added successfully', 5000);
      CallOut.added = false;
    }else if(CallOut.updated){
      CallOut.addCallOut('success', 'Analog Recording updated successfully', 5000);
      CallOut.updated = false;
    }else if(CallOut.deleted){
      CallOut.addCallOut('success', 'Analog Recording deleted successfully', 5000);
      CallOut.deleted = false;
    }
  }
 
  getAllAnalogRecordings(){
    //Send the request to the  server and get the json with the ip cameras elements array
    this.analogRecordingService.getAnalogRecordings().subscribe(
      data => {
        this.fillList(data[0]);
        console.log(this.analogRecordings);
        this.loading = false;
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'Not found elements. Retry again.', 5000)     
      }
    );
  }

  fillList(data){
    console.log(data);
    data.forEach(element => {
      let analogRecording: AnalogRecording = new AnalogRecording();

      for(let key in element){
        if(key === 'ID'){
          analogRecording.id = element[key]
        }else if(key === 'NAME'){
          analogRecording.name = element[key];
        }else if(key === 'FAMILY'){
          analogRecording.family = element[key];
        }else if(key === 'CATEGORY'){
          analogRecording.category = element[key];
        }else if(key === 'CTN_CLASS'){
          analogRecording.ctnClass = element[key];
        }else if(key === 'CTN_CLASS_FULL'){
          analogRecording.ctnClassFull = element[key];
        }else if(key === 'IMAGE'){
          analogRecording.image = element[key];
        }else if(key === 'DATASHEET'){
          analogRecording.datasheet = element[key];
        }else if(key === 'PRICE'){
          analogRecording.price = element[key];
        }else if(key === 'DATA_FORMAT'){
          analogRecording.dataFormat = element[key];
        }else if(key === 'INPUTS_RELAY_OUTPUTS'){
          analogRecording.inputRelayOutputs = element[key];
        }else if(key === 'TARGET_SYSTEM_SIZE'){
          analogRecording.targetSystemSize = element[key];
        }else if(key === 'TIMELINE'){
          analogRecording.timeLine = element[key];
        }else if(key === 'USER_LEVELS'){
          analogRecording.userLevels = element[key];
        }else if(key === 'CHANNELS'){
          analogRecording.basicFeatures.channels = element[key];
        }else if(key === 'FRAME_RATE_IPS'){
          analogRecording.basicFeatures.frameRateIPS = element[key];
        }else if(key === 'IPS_PER_CAMERA'){
          analogRecording.basicFeatures.ipsPerCamera = element[key];
        }else if(key === 'LIVE_RESOLUTION'){
          analogRecording.basicFeatures.liveResolution = element[key];
        }else if(key === 'SYSTEM_SIZE'){
          analogRecording.basicFeatures.systemSize = element[key];
        }else if(key === 'LOOPING_VIDEO'){
          analogRecording.basicFeatures.loopinVideo = element[key];
        }else if(key === 'PREALARM'){
          analogRecording.basicFeatures.preAlarm = element[key];
        }else if(key === 'MOTION_DETECTION'){
          analogRecording.basicFeatures.motionDetection = element[key];
        }else if(key === 'MOUNTABLE_RACK'){
          analogRecording.basicFeatures.mountableRack = element[key];
        }else if(key === 'MULTIPLE_CAMERA'){
          analogRecording.basicFeatures.multipleCamera = element[key];
        }else if(key === 'VIDEO_COMPRESSION'){
          analogRecording.basicFeatures.videoCompression = element[key];
        }else if(key === 'H_RESOLUTION'){
          analogRecording.basicFeatures.hResolution = element[key];
        }else if(key === 'NETWORK'){
          analogRecording.basicFeatures.network = element[key];
        }else if(key === 'OPERATIVE_SYSTEM'){
          analogRecording.basicFeatures.operativeSystem = element[key];
        }else if(key === 'SMART_MOTION_SEARCH'){
          analogRecording.advancedFeatures.smartMotionSearch = element[key];
        }else if(key === 'INSTANT_PLAYBACK'){
          analogRecording.advancedFeatures.instantPlayBack = element[key];
        }else if(key === 'SEARCH_MODE'){
          analogRecording.advancedFeatures.searchMode = element[key];
        }else if(key === 'CALL_UP_PREPOSITION_ON_DOME'){
          analogRecording.advancedFeatures.callUpPrepositionOnDome = element[key];
        }else if(key === 'CAMERA_LOCKOUTS_BY_USER'){
          analogRecording.advancedFeatures.cameraLockoutsByUser = element[key];
        }else if(key === 'DATA_INTEGRITY_CHECK'){
          analogRecording.advancedFeatures.dataIntegrityCheck = element[key];
        }else if(key === 'INCREASE_FRAME_RATE_ON_ALARM'){
          analogRecording.advancedFeatures.increaseFrameRateOnAlarm = element[key];
        }else if(key === 'INDIVIDUAL_CAMERA_ADJUSTMENT'){
          analogRecording.advancedFeatures.individualCameraAdjustment = element[key];
        }else if(key === 'PTZ_CONTROLS'){
          analogRecording.aioFunctions.ptzControls = element[key];
        }else if(key === 'ADMIN_CONTROL'){
          analogRecording.aioFunctions.adminControl = element[key];
        }else if(key === 'EXPORT_OPTIONS'){
          analogRecording.aioFunctions.exportOptions = element[key];
        }else if(key === 'PTZ_JOYSTICK_CONTROL'){
          analogRecording.aioFunctions.ptzJoystickControl = element[key];
        }else if(key === 'IN_OUT_CHANELS'){
          analogRecording.audio.inOutChanels = element[key];
        }else if(key === 'ASSOCIATE_CAMERA_TO_AUDIO'){
          analogRecording.audio.associateCameraToAudio = element[key];
        }else if(key === 'BI_DIRECTIONAL_AUDIO'){
          analogRecording.audio.biDirectionalAudio = element[key];
        }else if(key === 'SYNCHRONOUS_AUDIO'){
          analogRecording.audio.synchronousAudio = element[key];
        }else if(key === 'OPTIONAL_ATPM_POS'){
          analogRecording.integration.optionalAtpmPos = element[key];
        }else if(key === 'SDK'){
          analogRecording.integration.sdk = element[key];
        }else if(key === 'MOBILE_CLIENT_ACCESS'){
          analogRecording.larViewing.mobileClientAccess = element[key];
        }else if(key === 'WEB_BROWSER_ACCESS'){
          analogRecording.larViewing.webBrowserAccess = element[key];
        }else if(key === 'SET_VIEWING_PERMISSIONS'){
          analogRecording.larViewing.setViewingPermissions = element[key];
        }else if(key === 'SIMULTANEOUS_ACCESSIBLE_USER'){
          analogRecording.larViewing.simultaneousAccessibleUser = element[key];
        }else if(key === 'SCHEDULE_RECORDING_MODES'){
          analogRecording.recording.scheduleRecordingModes = element[key];
        }else if(key === 'SCREEN_DIVISION_MULTI_SCREEN'){
          analogRecording.recording.screenDivisionMultiScreen = element[key];
        }else if(key === 'RECORDING_RESOLUTION'){
          analogRecording.recording.recordingResolution = element[key];
        }else if(key === 'DIGITAL_ZOOM_LIVE'){
          analogRecording.recording.digitalZoomLive = element[key];
        }else if(key === 'SUPPORT_DEVICES'){
          analogRecording.storageOptions.supportDevices = element[key];
        }else if(key === 'EXPANDABLE'){
          analogRecording.storageOptions.expandable = element[key];
        }else if(key === 'EXTERNAL_STORAGE'){
          analogRecording.storageOptions.externalStorage = element[key];
        }else if(key === 'ONBOARD_RAID'){
          analogRecording.storageOptions.onBoardRaid = element[key];
        }else if(key === 'NUMBER_OF_HD'){
          analogRecording.storageOptions.numberHD = element[key];
        }else if(key === 'EXPORT_OPTIONS_STORAGE'){
          analogRecording.storageOptions.exportOptionsStorage = element[key];
        }else if(key === 'BACK_UP_MODE'){
          analogRecording.storageOptions.backUpMode = element[key];
        }else if(key === 'CONNECTOR_TYPE'){
          analogRecording.videoOutput.connectorType = element[key];
        }else if(key === 'SPOT_MONITOR'){
          analogRecording.videoOutput.spotMonitor = element[key];
        }
      }
  
      this.analogRecordings.push(analogRecording)
    });
  }

  detailsAnalogRecording(id: number){
    let analogRecording: AnalogRecording;

    this.analogRecordings.forEach(element => {
      if(element.id === id){
        analogRecording = element;
      }
    });

    sessionStorage.setItem("analogRecordingElement", JSON.stringify(analogRecording));
    this.router.navigate(["/details-analog-recording"]);
  }

  editAnalogRecording(id: number){
    let analogRecording: AnalogRecording;

    this.analogRecordings.forEach(element => {
      if(element.id === id){
        analogRecording = element;
      }
    });

    sessionStorage.setItem("analogRecordingElement", JSON.stringify(analogRecording));
    this.router.navigate(["/edit-analog-recording"]);
  }

  deleteAnalogRecording(id: number){
    this.loading = true;

    this.analogRecordingService.deleteAnalogRecording(id).subscribe(
      (data) => {
        try {
          if(data['status'] === 'Analog Recording deleted'){
            this.loading = false;
            this.analogRecordings = this.analogRecordings.filter(c => c.id !== id);
            CallOut.addCallOut('success', 'Analog Recording deleted.', 5000);
          }
        } catch (error) {
          console.log('No logrado')
        }  
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'The Analog Recording has not deleted.', 5000)     
      }
    );
  }

}
