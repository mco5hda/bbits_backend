export class WorkStation {
    id: number;
    model: string;
    baseUnit: string;
    hdd: string;
    dvdDrive: string;
    processor: string;
    memory: string;
    operativeSystem: string;
    graphicsCard: string;
    application: string;
    description: string;
    cardsSupported: string;
    maxMonitorsPerCard: string;
    maxMonitorPerWorkstation: string;
    gpuDecoding: boolean =  false;
    price: string;
}