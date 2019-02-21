import { BasicFeatures } from './basic-features.model';
import { AdvancedFeatures } from './advanced-features.model';
import { AlarmTriggering } from './alarm-triggering.model';
import { Sensitivity } from './sensitivity.model';
import { Lens } from './lens.model';
import { Connections } from './connections.model';
import { Housing } from './housing.model';
import { Accessory } from './../accessory.model';

export class AnalogCamera{
    id:number;
    name:string;
    family:string;
    category:string;
    image:string;
    datasheet:string;
    ctnClass:string;
    ctnClassFull:string;
    price:string;
    accessories: Accessory[] = new Array();
    basicFeatures: BasicFeatures = new BasicFeatures();
    advancedFeatures: AdvancedFeatures = new AdvancedFeatures();
    alarmTriggering: AlarmTriggering = new AlarmTriggering();
    sensitivity: Sensitivity = new Sensitivity();
    lens: Lens = new Lens();
    connections: Connections = new Connections;
    housing: Housing = new Housing();
}