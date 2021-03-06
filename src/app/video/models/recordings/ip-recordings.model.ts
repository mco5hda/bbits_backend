import { BasicFeaturesRecording } from './basic-features-recording.model';
import { AdvancedFeaturesRecording } from './advanced-features-recording.model';
import { AIOFunctionsRecording } from './aio-recording.model';
import { AudioRecording } from './audio-recording-model';
import { BackUpRecording } from './back-up-recording.model';
import { IntegrationRecording } from './integration-recording.model';
import { LARRecording } from './lar-recording.model';
import { MechanicalRecording } from './mechanical-recording.model';
import { RecordingRecording } from './recording-recording.model';
import { StorageOptionsExtensionsRecording } from './storage-options-extensions-recording.model';
import { StorageOptionsRecording } from './storage-options-recording.model';
import { VideoOutputRecording } from './video-output-recording.model';
import { Accessory } from './../accessory.model';
import { RaidDetails } from './raid-details.model';

export class IPRecording{
    id:number;
    name:string;
    family:string;
    category:string;
    image:string;
    datasheet:string;
    ctnClass:string;
    ctnClassFull:string;
    price:string;
    dataFormat:string;
    accessories: Accessory[] = new Array();
    raidDetails: RaidDetails[] = new Array();
    basicFeatures: BasicFeaturesRecording = new BasicFeaturesRecording();
    advancedFeatures: AdvancedFeaturesRecording = new AdvancedFeaturesRecording();
    aioFunctions: AIOFunctionsRecording = new AIOFunctionsRecording();
    audio: AudioRecording = new AudioRecording();
    backUp: BackUpRecording = new BackUpRecording();
    integration: IntegrationRecording = new IntegrationRecording();
    larViewing: LARRecording = new LARRecording();
    mechanical: MechanicalRecording = new MechanicalRecording();
    recording: RecordingRecording = new RecordingRecording();
    storageExtensions: StorageOptionsExtensionsRecording = new StorageOptionsExtensionsRecording();
    storageOptions: StorageOptionsRecording = new StorageOptionsRecording();
    videoOutput: VideoOutputRecording = new VideoOutputRecording();
}