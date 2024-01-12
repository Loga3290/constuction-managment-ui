import { Site } from "./Site";
import { Labour } from "./labour";

export interface Entry {
    id?:string;
    site?:Site;
    labour?:Labour;
    date?:string;
    overtime?:boolean
}