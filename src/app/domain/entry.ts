import { Site } from "./Site";
import { Foreman } from "./foreman";
import { LabourType } from "./labourType";

export interface Entry {
    id?:string;
    site?:Site;
    labourType?:LabourType;
    foreman?:Foreman;
    noOfPersons?: number;
    date?:string;
    overtime?:boolean
}