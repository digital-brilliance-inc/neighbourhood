type ChurchLeader = {
  name: string;
  title: string;
  imageUrl: string;
};

export type Church = {
  id: string;
  name: string;
  address: string;
  description: string;
  shortDescription: string;
  leaders: Array<ChurchLeader>;
  contactEmail: string;
  contactUrl: string;
  primaryImageUrl: string;
  additionalImageUrls: Array<string>;
  lat: number;
  lng: number;
  isSponsor: boolean;
};
