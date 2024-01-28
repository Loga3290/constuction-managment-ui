import { Site } from "./Site";
import { LabourType } from "./labourType";

export interface EntryRequest {
    siteIds?:string[];
    foremanIds?:string[];
    fromDate?:string;
    toDate?:string;
}