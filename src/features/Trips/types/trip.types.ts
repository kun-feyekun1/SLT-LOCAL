export interface Trip {
  id: number;
  driver_id: number;
  route_id: number;
  status: string;
  start_time: string;
  end_time?: string | null;
}
