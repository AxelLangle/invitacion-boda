export interface Guest {
  id: string;
  fullName: string;
  plusOne: boolean;
  companion: string;
  attendingEvents: EventType[];
  confirmed: boolean;
  confirmedAt: string;
}

export type EventType = 'civil' | 'buffet' | 'fiesta';

export interface TimelineEvent {
  id: string;
  title: string;
  time: string;
  locationName: string;
  coordinates: string;
  mapsUrl: string;
  icon: string;
  note?: string;
}

export interface AdminSettings {
  heroPhotoUrl: string;
  secondaryPhotoUrl: string;
  giftListUrl: string;
  bgTextureUrl: string;
  envelopeClosedUrl: string;
  envelopeOpenUrl: string;
}
