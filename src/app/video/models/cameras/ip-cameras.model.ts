import { BasicFeatures } from './basic-features.model';
import { AdvancedFeatures } from './advanced-features.model';
import { AlarmTriggering } from './alarm-triggering.model';
import { Sensitivity } from './sensitivity.model';
import { Lens } from './lens.model';
import { DCRI } from './dcri.model';
import { Connections } from './connections.model';
import { Housing } from './housing.model';
import { ElectricalData } from '../electrical-data.model';
import { Storage } from './storage.model';

export class IPCamera {
    id:number;
    name:string;
    family:string;
    category:string;
    ctnClass:string;
    ctnClassFull:string;
    price:string;
    image:string;
    datasheet:string;
    basicFeatures: BasicFeatures = new BasicFeatures();
    advancedFeatures: AdvancedFeatures = new AdvancedFeatures();
    alarmTriggering: AlarmTriggering = new AlarmTriggering();
    sensitivity: Sensitivity = new Sensitivity();
    lens: Lens = new Lens();
    dcri: DCRI = new DCRI();
    storage: Storage = new Storage;
    connections: Connections = new Connections;
    housing: Housing = new Housing();
}