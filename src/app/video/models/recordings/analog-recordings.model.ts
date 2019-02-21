import { BasicFeaturesRecording } from './basic-features-recording.model';
import { AdvancedFeaturesRecording } from './advanced-features-recording.model';
import { AIOFunctionsRecording } from './aio-recording.model';
import { AudioRecording } from './audio-recording-model';
import { IntegrationRecording } from './integration-recording.model';
import { LARRecording } from './lar-recording.model';
import { RecordingRecording } from './recording-recording.model';
import { StorageOptionsRecording } from './storage-options-recording.model';
import { VideoOutputRecording } from './video-output-recording.model';
import { Accessory } from './../accessory.model';

export class AnalogRecording {
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
    inputRelayOutputs:string;
    targetSystemSize:string;
    userLevels:string;
    timeLine: boolean;
    accessories: Accessory[] = new Array();
    basicFeatures: BasicFeaturesRecording = new BasicFeaturesRecording();
    advancedFeatures: AdvancedFeaturesRecording = new AdvancedFeaturesRecording();
    aioFunctions: AIOFunctionsRecording = new AIOFunctionsRecording();
    audio: AudioRecording = new AudioRecording();
    integration: IntegrationRecording = new IntegrationRecording();
    larViewing: LARRecording = new LARRecording();
    recording: RecordingRecording = new RecordingRecording();
    storageOptions: StorageOptionsRecording = new StorageOptionsRecording();
    videoOutput: VideoOutputRecording = new VideoOutputRecording();
}