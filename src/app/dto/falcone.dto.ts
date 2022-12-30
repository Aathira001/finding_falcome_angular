import { falconeStatus } from "../enums/falcone-status.enum";
import { planets } from "./planets.dto";
import { vehicles } from "./vehicles.dto";


export interface tokenResponse {
    token: string;
}

export interface findFalconeReq {
    token: string;
    planet_names: Array<planets['name']>;
    vehicle_names: Array<vehicles['name']>
}

export interface findFalconeResponse {
    planet_name?: string;
    status: falconeStatus | boolean;
}

export interface falconeErrorResponse {
    error: string;
}