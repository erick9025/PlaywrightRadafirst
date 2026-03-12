import { test } from '@playwright/test';
import { MapsService } from '../../pom/api/services/mapsService';
import { ResponseGetPlaceDetails } from '../../pom/api/deserialize/responseGetPlaceDetails';

test.describe('Tests for Apis with POM', () => {

  let mapsService: MapsService;

  ////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
  test.beforeAll(async ({ playwright }, testInfo) => {
    mapsService = new MapsService();
  });

  test.beforeEach(async () => {

  });

  test.afterEach(async () => {

  });

  test.afterAll(async () => {
    await mapsService.closeConnection();
  });

  /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

  test("POM with GET place location", async () => {    
    /*
    {
    "location": {
        "latitude": "-38.383494",
        "longitude": "33.427362"
    },
    "accuracy": "2",
    "name": "Cafe Unosquare",
    "phone_number": "(52) 55 4000 4000",
    "address": "Constitucion 1990",
    "types": "coffe,restaurant,bar,brunch",
    "website": "https://unosquare.com",
    "language": "United States-SP"
}
    */
    
    const object: ResponseGetPlaceDetails = new ResponseGetPlaceDetails();

    object.location = {
        latitude: "-38.383494",
        longitude: "33.427362"
      };
    object.accuracy = "2";
    object.name = "Cafe Unosquare";
    object.phone_number = "(52) 55 4000 4000";
    object.address = "Constitucion 1990";
    object.types = "coffe,restaurant,bar,brunch";
    object.website = "https://unosquare.com.mx"; // Intentional Error with .mx
    object.language = "United States-SP";

    await mapsService.getPlaceDetails("7d4e3875cb641a63048d8bfa0faffe47", 200, object);      
  });
});