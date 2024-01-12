import { Site } from "./Site";
import { Labour } from "./labour";

export interface EntryRequest {
    siteIds?:string[];
    labourIds?:string[];
    fromDate?:string;
    toDate?:string;
}