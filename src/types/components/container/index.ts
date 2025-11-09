export interface ContainerItemType {
  id: number;
  containerNumber: string;
  ownerCompanyId: number;
  isoDetailId: number;
  weightCapacity: number | null;
  detentionDate: string | null;
  ISOCodeId: number;
  flmJobNo: string | null;
}

export interface ApiContainerGradeType {
  id: number;
  grade: string;
  shippingLineId: number;
  requireServices: boolean;
  damageServices: boolean;
}

export interface StoreContainerGradeType {
  id: number;
  grade: string;
  shippingLineId: number;
  code: string;
}

