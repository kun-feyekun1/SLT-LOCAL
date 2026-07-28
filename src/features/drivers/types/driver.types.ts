export interface Driver {
  id: number;
  name: string;
  last_name: string;
  vehicle_plate: string;
  phone: string;
  email?: string | null;
  vehicle_type: string;
  is_active: boolean;
  is_available: boolean;
  created_at: string;
}

export interface DriverUpdate {
  phone?: string | null;
  email?: string | null;
  vehicle_plate?: string | null;
  vehicle_type?: string | null;
}

export interface DriverAvailability {
  driver_id: number;
  is_active: boolean;
  is_available: boolean;
}

export interface LocationUpdate {
  latitude: number;
  longitude: number;
}

export interface PasswordChange {
  old_password: string;
  new_password: string;
}
