export interface Terminal {
  id: number;
  name: string;
  name_am?: string | null;
  alternative_names?: string | null;
  latitude: number;
  longitude: number;
  sub_city?: string | null;
  woreda?: string | null;
  category: string;
  terminal_type?: string | null;
  operating_hours?: string | null;
  address?: string | null;
  is_verified: boolean;
  is_active: boolean;
  updated_at?: string | null;
}

export interface TerminalCreate {
  name: string;
  name_am?: string | null;
  alternative_names?: string | null;
  latitude: number;
  longitude: number;
  sub_city?: string | null;
  woreda?: string | null;
  category: string;
  terminal_type?: string | null;
  operating_hours?: string | null;
  address?: string | null;
}

export interface TerminalListParams {
  skip?: number;
  limit?: number;
  category?: string;
}

export interface NearbyTerminalParams {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
}
