// Shared 3-field truck info
export interface TruckBase {
    id: number | string;
    truckNumber: string;
    transporterId: number | string;
}

// Shared 3-field driver info
export interface DriverBase {
    id: number | string;
    driverId: string;
    name: string;
    transporterId: number | string;
}

// Full types
export interface TruckType extends TruckBase {
    driverId?: string;
    driverName?: string;
    Driver?: DriverBase;
}

export interface DriverType extends DriverBase {
    Truck?: TruckBase & { code?: string };
}

// Union type if needed
export type TruckOrDriver = TruckType | DriverType;

// src/types/components/driver-ids.ts
export interface DriverIdsType {
    id: number | string;
    name: string;
    transporterId: number | string;
    mobile?: string;
    driverId: string;
    countryOfOrigin?: string | null;
    countryOfResidence?: string | null;
    status?: string;
    createdFrom?: string;
    createdBy?: number | string;
    updatedBy?: number | string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}

