import { test } from '@playwright/test';
import { MapsService } from '../../pom/api/services/mapsService';
import { ResponseGetPlaceDetails } from '../../pom/api/deserialize/responseGetPlaceDetails';
import { BodyPostNewPlace } from '../../pom/api/serialize/bodyPostNewPlace';
import { BodyPutUpdatePlace } from '../../pom/api/serialize/bodyPutUpdatePlace';
import { TestUtilities } from '../../utils/testUtilities';
import myJson from '../testData/samplePlaceInfo.json';

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

  /*test("POM with GET place location with JSON", async () => {    
    await mapsService.getPlaceDetails("7d4e3875cb641a63048d8bfa0faffe47", 200, myJson); // Alternatively, we can work with a JSON file (NOT RECOMMENDED)
  });*/

  test("POM with GET place location simpler", async () => {    
    await mapsService.getPlaceDetails("7d4e3875cb641a63048d8bfa0faffe47");
  });

  test("POM with GET place location", async () => {    
    const object: ResponseGetPlaceDetails = ResponseGetPlaceDetails.returnSampleObject();

    await mapsService.getPlaceDetails("7d4e3875cb641a63048d8bfa0faffe47", 200, object); // Better to work with an object, since we can reuse it in multiple places and it's more readable than a JSON file. However, both approaches are valid.
  });

  test.skip("POM with GET place location FAIL", async () => {    
    let object: ResponseGetPlaceDetails = ResponseGetPlaceDetails.returnSampleObject();

    // Object can be changed
    object.accuracy = "78"; // Intentional error to see the assertion fail

    await mapsService.getPlaceDetails("7d4e3875cb641a63048d8bfa0faffe47", 200, object); // Better to work with an object, since we can reuse it in multiple places and it's more readable than a JSON file. However, both approaches are valid.
  });

  test("POM with POST create new place", async () => {    
    const generatedPlaceId: string = await mapsService.postCreatePlace(BodyPostNewPlace.returnSampleObject());

    TestUtilities.logMessage("Generated place id: " + generatedPlaceId);
  });

  test("POM with PUT update place", async () => {    

    let bodyOrPayload: BodyPutUpdatePlace = new BodyPutUpdatePlace();
    bodyOrPayload.place_id = "c48de564bd9f5ebdc7c9e3b7005bb44f";
    bodyOrPayload.address = "Calle Falsa 123, Springfield";
    bodyOrPayload.key = "qaclick123";

    await mapsService.putUpdatePlace(bodyOrPayload);
  });
});