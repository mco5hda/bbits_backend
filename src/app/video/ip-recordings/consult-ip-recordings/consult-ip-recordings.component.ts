import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/app.environment';
import { IPRecording } from '../../models/recordings/ip-recordings.model';
import { CallOut } from './../../../utilities/callout';
import { IpRecordingService } from '../ip-recording.service';

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

  loading: boolean = false;

  constructor( 
    private router: Router,
    private ipRecordingService: IpRecordingService,
  ) { }

  ngOnInit() {
    this.getAllIPRecordings();

    if(CallOut.added){
      CallOut.addCallOut('success', 'IP Recording added successfully', 5000);
      CallOut.added = false;
    }else if(CallOut.updated){
      CallOut.addCallOut('success', 'IP Recording updated successfully', 5000);
      CallOut.updated = false;
    }else if(CallOut.deleted){
      CallOut.addCallOut('success', 'IP Recording deleted successfully', 5000);
      CallOut.deleted = false;
    }
  }

  getAllIPRecordings(){
    //Send the request to the  server and get the json with the ip cameras elements array
    this.ipRecordingService.getIPRecordings().subscribe(
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
      let ipRecording: IPRecording = new IPRecording();

      for(let key in element){
        if(key === 'ID'){
          ipRecording.id = element[key];
        }else if(key === 'NAME'){
          ipRecording.name = element[key];
        }else if(key === 'FAMILY'){
          ipRecording.family = element[key];
        }else if(key === 'CATEGORY'){
          ipRecording.category = element[key];
        }else if(key === 'CTN_CLASS'){
          ipRecording.ctnClass = element[key];
        }else if(key === 'CTN_CLASS_FULL'){
          ipRecording.ctnClassFull = element[key];
        }else if(key === 'PRICE'){
          ipRecording.price = element[key];
        }else if(key === 'IMAGE'){
          ipRecording.image = element[key];
        }else if(key === 'DATASHEET'){
          ipRecording.datasheet = element[key];
        }else if(key === 'DATA_FORMAT'){
          ipRecording.dataFormat = element[key];
        }else if(key === 'SYSTEM_SIZE'){
          ipRecording.basicFeatures.systemSize = element[key];
        }else if(key === 'VIDEO_COMPRESSION'){
          ipRecording.basicFeatures.videoCompression = element[key];
        }else if(key === 'IP_CHANNELS'){
          ipRecording.basicFeatures.ipChannels = element[key];
        }else if(key === 'INTEGRATED_VIDEO_MANAGEMENT'){
          ipRecording.basicFeatures.integratedVideoManagement = element[key];
        }else if(key === 'BANDWIDTH'){
          ipRecording.basicFeatures.bandwidth = element[key];
        }else if(key === 'SUPPORTED_RESOLUTION'){
          ipRecording.basicFeatures.supportedResolution = element[key];
        }else if(key === 'ON_BOARD_TRANSCODING'){
          ipRecording.basicFeatures.onBoardTranscoding = element[key];
        }else if(key === 'ONVIF'){
          ipRecording.basicFeatures.onvif = element[key];
        }else if(key === 'PSR'){
          ipRecording.basicFeatures.psr = element[key];
        }else if(key === 'HOT_SWAPPABLW_HDD'){
          ipRecording.basicFeatures.hotSwappablwHDD = element[key];
        }else if(key === 'MONITOR_OUTPUT'){
          ipRecording.basicFeatures.monitorOutput = element[key];
        }else if(key === 'RAID'){
          ipRecording.basicFeatures.raid = element[key];
        }else if(key === 'FORENSIC_SEARCH_SUPPORT'){
          ipRecording.advancedFeatures.forensicSearchSupport = element[key];
        }else if(key === 'SUPPORT_WEB_CLIENT'){
          ipRecording.advancedFeatures.supportWebClient = element[key];
        }else if(key === 'PTZ_CONTROLS'){
          ipRecording.aioFunctions.ptzControls = element[key];
        }else if(key === 'ADMIN_CONTROL'){
          ipRecording.aioFunctions.adminControl = element[key];
        }else if(key === 'EXPORT_OPTIONS'){
          ipRecording.aioFunctions.exportOptions = element[key];
        }else if(key === 'CCTV_KEYBOARD_SUPPORT'){
          ipRecording.aioFunctions.cctvKeyboardSupport = element[key];
        }else if(key === 'IN_OUT_CHANELS'){
          ipRecording.audio.inOutChanels = element[key];
        }else if(key === 'COMPRESSION_TYPE'){
          ipRecording.audio.compressionType = element[key];
        }else if(key === 'SYNCHRONOUS_TYPE'){
          ipRecording.audio.synchronousType = element[key];
        }else if(key === 'AMCTA'){
          ipRecording.audio.amcta = element[key];
        }else if(key === 'DVD_WRITER'){
          ipRecording.backUp.dvdWritter = element[key];
        }else if(key === 'SUPPORTED_DEVICES'){
          ipRecording.backUp.supportedDevices = element[key];
        }else if(key === 'BACK_UP_MODE'){
          ipRecording.backUp.backUpMode = element[key];
        }else if(key === 'OPTIONAL_ATPM_POS'){
          ipRecording.integration.optionalAtpmPos = element[key];
        }else if(key === 'INTEGRATION_TOOLS_SDK'){
          ipRecording.integration.integrationToolsSDK = element[key];
        }else if(key === 'VIDEO_SECURITY_APP'){
          ipRecording.larViewing.videoSecurityApp = element[key];
        }else if(key === 'WEB_BROWSER_ACCESS'){
          ipRecording.larViewing.webBrowserAccess = element[key];
        }else if(key === 'SIMULTANEOUS_USERS'){
          ipRecording.larViewing.simultaneousUsers = element[key];
        }else if(key === 'VIEWING_BVC'){
          ipRecording.larViewing.viewingBVC = element[key];
        }else if(key === 'BVMS'){
          ipRecording.larViewing.bvms = element[key];
        }else if(key === 'FORM_FACTOR'){
          ipRecording.mechanical.formFactor = element[key];
        }else if(key === 'NETWORK_CONNECTION'){
          ipRecording.mechanical.networkConnection = element[key];
        }else if(key === 'USB_PORTS'){
          ipRecording.mechanical.usbPorts = element[key];
        }else if(key === 'NUMBER_OF_POWER_SUPPLIES'){
          ipRecording.mechanical.numberOfPowerSupplies = element[key];
        }else if(key === 'POWER_SUPPLIES_HS'){
          ipRecording.mechanical.powerSuppliesHS = element[key];
        }else if(key === 'VIDEO_RECORDING_MANAGER'){
          ipRecording.recording.videoRecordingManager = element[key];
        }else if(key === 'SCHEDULE_RECORDING'){
          ipRecording.recording.scheduleRecording = element[key];
        }else if(key === 'MAX_NUMBER_OF_UNITS'){
          ipRecording.storageExtensions.maxNumberOfUnits = element[key];
        }else if(key === 'MAXIMUM_DRIEVES_SUPPORTED'){
          ipRecording.storageExtensions.maximumDrievesSupported = element[key];
        }else if(key === 'AVAILABLE_CAPACITIES_PER_DRIVE_EXTENSIONS'){
          ipRecording.storageExtensions.availableCapacitiesPerDriveExtensions = element[key];
        }else if(key === 'HOT_SWAPPABLE'){
          ipRecording.storageExtensions.hotSwappable = element[key];
        }else if(key === 'MAX_DRIVES_SUPPORTED'){
          ipRecording.storageOptions.maxDrivesSupported = element[key];
        }else if(key === 'BASE_SYSTEM_CAPACITY'){
          ipRecording.storageOptions.baseSystemCapacity = element[key];
        }else if(key === 'MAX_BASE_SYSTEM_CAPACITY'){
          ipRecording.storageOptions.maxBaseSystemCapacity = element[key];
        }else if(key === 'FULL_SYSTEM_CAPACITY'){
          ipRecording.storageOptions.fullSystemCapacity = element[key];
        }else if(key === 'AVAILABLE_CAPACITIES_PER_DRIVE'){
          ipRecording.storageOptions.availableCapacitiesPerDrive = element[key];
        }else if(key === 'CONNECTOR_TYPE'){
          ipRecording.videoOutput.connectorType = element[key];
        }else if(key === 'SPOT_MONITOR'){
          ipRecording.videoOutput.spotMonitor = element[key];
        }
      }
      this.ipRecordings.push(ipRecording)
    });
  }

  detailsIPRecording(id: number){
    let ipRecording: IPRecording;

    this.ipRecordings.forEach(element => {
      if(element.id === id){
        ipRecording = element;
      }
    });

    sessionStorage.setItem("ipRecordingElement", JSON.stringify(ipRecording));
    this.router.navigate(["/details-ip-recording"]);
  }

  editIPRecording(id: number){
    let ipRecording: IPRecording;

    this.ipRecordings.forEach(element => {
      if(element.id === id){
        ipRecording = element;
      }
    });

    sessionStorage.setItem("ipRecordingElement", JSON.stringify(ipRecording));    this.router.navigate(["/edit-ip-recording"]);
  }

  deleteIPRecording(id: number){
    CallOut.addCallOut('success', 'IP Recording deleted succesfully.', 5000);
  }
}
