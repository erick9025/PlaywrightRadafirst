import { IPrintableObject } from "../models/iPrintableObject";
import { TestUtilities } from "../../../utils/testUtilities";

export class ResponseGetPlaceDetails implements IPrintableObject {
  location!: ResponseGetPlaceDetailsLocation;
  accuracy!: string;
  name!: string;
  phone_number!: string;
  address!: string;
  types!: string;
  website!: string;
  language!: string;

  public printObjectDetails(): void {
    TestUtilities.logMessage("Response for getPlaceDetails:");
    TestUtilities.logMessage("Location:");
    TestUtilities.logMessage("...Latitude: " + this.location.latitude);
    TestUtilities.logMessage("...Longitude: " + this.location.longitude);
    TestUtilities.logMessage("Accuracy: " + this.accuracy);
    TestUtilities.logMessage("Name: " + this.name);
    TestUtilities.logMessage("Phone Number: " + this.phone_number);
    TestUtilities.logMessage("Address: " + this.address);
    TestUtilities.logMessage("Types: " + this.types);
    TestUtilities.logMessage("Website: " + this.website);
    TestUtilities.logMessage("Language: " + this.language);
  }

  public static returnSampleObject(): ResponseGetPlaceDetails {
    let object: ResponseGetPlaceDetails = new ResponseGetPlaceDetails();

    // Use factory pattern to return known objects/places STATIC METHOD INSIDE CLASS 'ResponseGetPlaceDetails' (ToDo)
    object.location = {
        latitude: "-38.383494",
        longitude: "33.427362"
      };
    object.accuracy = "2";
    object.name = "Cafe Unosquare";
    object.phone_number = "(52) 55 4000 4000";
    object.address = "Constitucion 1990";
    object.types = "coffe,restaurant,bar,brunch";
    object.website = "https://unosquare.com"; // Intentional Error with .mx
    object.language = "United States-SP";
    return object;
  }
}

export class ResponseGetPlaceDetailsLocation {
  latitude!: string;
  longitude!: string;
}