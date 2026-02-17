export interface MaintenanceTemplate {
  id: number;
  name: string;
  intervalType: 'km' | 'time';
  intervalValue: number;
  archived: boolean;
  createdAt: string;
}

export interface CreateMaintenanceTemplateDto {
  name: string;
  intervalType: string;
  intervalValue: number;
}

export interface ValidationError {
  errors: {
    [key: string]: string[];
  };
}
