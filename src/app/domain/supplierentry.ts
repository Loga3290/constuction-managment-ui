import { Site } from "./Site";
import { Material } from "./material";
import { Supplier } from "./supplier";

export interface SupplierEntry {
    billAmount?: number;
    id?:string;
    site?:Site;
    material?:Material;
    supplier?:Supplier;
    units?: number;
    date?:string;
}