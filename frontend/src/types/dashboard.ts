export interface Dashboard {
  carId: number;
  carName: string;
  currentKm: number;
  maintenanceItems: DashboardMaintenanceItem[];
}

export interface DashboardMaintenanceItem {
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
  status: 'Overdue' | 'DueSoon' | 'OK';
  kmUntilDue?: number;
  daysUntilDue?: number;
}
