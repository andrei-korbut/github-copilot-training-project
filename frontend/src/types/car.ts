export interface Car {
  id: number;
  name: string;
  currentKm: number;
  createdAt: string;
  maintenanceItems: CarMaintenanceItem[];
}

export interface CarMaintenanceItem {
  id: number;
  carId: number;
  maintenanceTemplateId: number;
  maintenanceTemplateName: string;
  intervalType: 'km' | 'time';
  intervalValue: number;
  lastServiceKm?: number;
  lastServiceDate?: string;
  calculatedNextKm?: number;
  calculatedNextDate?: string;
}

export interface CreateCarDto {
  name: string;
  currentKm: number;
  maintenanceItems: CreateCarMaintenanceItemDto[];
}

export interface CreateCarMaintenanceItemDto {
  maintenanceTemplateId: number;
  intervalValue: number;
  intervalType: string;
  lastServiceKm?: number;
  lastServiceDate?: string;
}

export interface UpdateCarMileageDto {
  currentKm: number;
}

export interface CreateTrackChangeDto {
  km?: number;
  date?: string;
}

export interface TrackChangeDto {
  id: number;
  carMaintenanceItemId: number;
  km?: number;
  date?: string;
}
