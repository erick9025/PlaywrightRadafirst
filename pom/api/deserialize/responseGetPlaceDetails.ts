export class ResponseGetPlaceDetails {
  location!: ResponseGetPlaceDetailsLocation;
  accuracy!: string;
  name!: string;
  phone_number!: string;
  address!: string;
  types!: string;
  website!: string;
  language!: string;
}

export class ResponseGetPlaceDetailsLocation {
  latitude!: string;
  longitude!: string;
}