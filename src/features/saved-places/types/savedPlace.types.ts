export interface SavedPlace {
  id: number;
  name: string;
  name_am?: string | null;
  longitude: number;
  latitude: number;
  address?: string | null;
}

export interface CreateSavedPlaceRequest {
  name: string;
  name_am: string;
  longitude: number;
  latitude: number;
  address?: string;
}
