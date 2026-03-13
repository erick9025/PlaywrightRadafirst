export class BodyPostNewPlace {
  location!: BodyPostNewPlaceLocation;
  accuracy!: number;
  name!: string;
  phone_number!: string;
  address!: string;
  types!: string[];
  website!: string;
  language!: string;

  public static returnSampleObject(): BodyPostNewPlace {
    let object: BodyPostNewPlace = new BodyPostNewPlace();
    // Use factory pattern to return known objects/places STATIC METHOD INSIDE CLASS 'BodyPostNewPlace' (ToDo)
    object.location = {
        lat: -38.383494,
        lng: 33.427362
      };
    object.accuracy = 50;
    object.name = "Cafe Unosquare";
    object.phone_number = "(52) 55 4000 4000";
    object.address = "Patria 2026";
    object.types = ["coffe", "restaurant", "bar", "brunch"];
    object.website = "https://unosquare.com";
    object.language = "Mexico-SP";
    return object;
  }
}

export class BodyPostNewPlaceLocation {
  lat!: number;
  lng!: number;
}