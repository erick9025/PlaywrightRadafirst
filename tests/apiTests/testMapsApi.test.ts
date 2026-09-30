import { test } from '@playwright/test';
import { MapsService } from '../../pom/api/services/mapsService';
import { ResponseGetPlaceDetails } from '../../pom/api/deserialize/responseGetPlaceDetails';
import { BodyPostNewPlace } from '../../pom/api/serialize/bodyPostNewPlace';
import { BodyPutUpdatePlace } from '../../pom/api/serialize/bodyPutUpdatePlace';
import { TestUtilities } from '../../utils/testUtilities';

test.describe('Tests for Apis with POM', () => {

  let mapsService: MapsService;

  ////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
  test.beforeAll(async () => {
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

  const knownPlaceId: string = "91e58adcb36efb1bf536cc3bcb43f6cb";

  test("POM with GET place location simpler", async () => {    
    await mapsService.getPlaceDetails(knownPlaceId);
  });

  test("POM with GET place location", async () => {    
    const objectKnownPlace: ResponseGetPlaceDetails = ResponseGetPlaceDetails.returnSampleObject();
    await mapsService.getPlaceDetails(knownPlaceId, 200, objectKnownPlace); // Better to work with an object, since we can reuse it in multiple places and it's more readable than a JSON file. However, both approaches are valid.
  });

  test("POM with GET place location with non-existing place id 404", async () => {    
    await mapsService.getPlaceDetails("erickJimenez", 404);
  });

  test("POM with GET place location with non-existing place id 403", async () => {    
    await mapsService.getPlaceDetails("erickJimenez", 403);
  });

  test("POM with GET place location FAIL", async () => {    
    let object: ResponseGetPlaceDetails = ResponseGetPlaceDetails.returnSampleObject();

    // Object can be changed
    object.accuracy = "78"; // Intentional error to see the assertion fail

    await mapsService.getPlaceDetails(knownPlaceId, 200, object); // Better to work with an object, since we can reuse it in multiple places and it's more readable than a JSON file. However, both approaches are valid.
  });

  test("POM with POST create new place", async () => {    
    const generatedPlaceId: string = await mapsService.postCreatePlace(BodyPostNewPlace.returnSampleObject());

    TestUtilities.logToConsole("Generated place id: " + generatedPlaceId);
  });

  test("POM with PUT update place", async () => {    

    let bodyOrPayload: BodyPutUpdatePlace = new BodyPutUpdatePlace();
    bodyOrPayload.place_id = knownPlaceId;
    bodyOrPayload.address = "Calle Falsa 123, Springfield";
    bodyOrPayload.key = "qaclick123";

    await mapsService.putUpdatePlace(bodyOrPayload);
  });
});
