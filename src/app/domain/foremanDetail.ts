import { LabourDetail } from "./labourDetail";

export interface ForemanDetail {
    total?: number;
    siteName?:string;
    labourDetails?: LabourDetail[];
}