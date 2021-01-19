export interface ICell {
    isLive: boolean;
    x: number;
    y: number;
    id: string;
    key: string;
    onClick(): any; 
}

export interface ICellData extends Array<any> {
    key: number,
    isActive: boolean,
    name: string,
}