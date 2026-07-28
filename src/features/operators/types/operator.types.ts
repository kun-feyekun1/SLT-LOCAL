export interface Operator {
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  vehicle_type: string;
  is_active: boolean;
}
