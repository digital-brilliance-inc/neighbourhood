export type EventModel = {
  id: string;
  title: string;
  imageUrl: string;
  locationName: string;
  locationAddress: string;
  shortDescription: string;
  description: string;
  startDate?: string;
  startTime: string;
  endTime?: string;
  hubspotCTALabel?: string;
  hubspotCTAClass?: string;
  rruleOptions: any; // rrule options, to be instantiated with toRRule() util
};
