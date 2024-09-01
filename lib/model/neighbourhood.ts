export type LatLng = {
  lat: number;
  lng: number;
};

export type Neighbourhood = {
  id: string;
  name: string;
  coords: Array<LatLng>;
  userId: string;
  imageUrls: Array<string>;
  imagesPath: string;
  currentPrayerRequest: string;
  status: NeighbourhoodStatusEnum;
};

export enum NeighbourhoodStatusEnum {
  'NEW' = 'NEW',
  'EDITABLE' = 'EDITABLE',
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
  'IN_REVIEW' = 'IN_REVIEW',
  'REJECTED' = 'REJECTED',
}
