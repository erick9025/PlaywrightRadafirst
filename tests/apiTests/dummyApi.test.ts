import { test, APIResponse } from '@playwright/test';
import { Asserts } from '../../utils/asserts';
import { TestUtilities } from '../../utils/testUtilities';

test.describe('API test without POM directly into test', () => {
  test("GET place info", async ({ request }) => {     

    const response: APIResponse<any> = await request.get(
        'https://rahulshettyacademy.com/maps/api/place/get/json',
        {
        params: {
            key: 'qaclick123',
            place_id: '661440db19257741e1b908ceaeac6dc6'
        }
        }
    );

    // Validate status
    Asserts.assertEquals(200, response.status(), 'Response status should be 200');

    const body = await response.json();

    // Validate response fields
    Asserts.assertEquals('Cafe Unosquare Mentorship', body.name, 'Place name should match');
    Asserts.assertEquals('Constitucion 1990', body.address, 'Place address should match'); // Original was 'Patria', updated (PUT) was 'Constitucion'
    Asserts.assertEquals('United States-SP', body.language, 'Place language should match');

    const latitude = Number(body.location.latitude);
    const longitude = Number(body.location.longitude);
    Asserts.assertNumberGreaterThanOrEqual(latitude, -90, 'Latitude should be at least -90');
    Asserts.assertNumberLessThanOrEqual(latitude, 90, 'Latitude should be at most 90');
    Asserts.assertNumberGreaterThanOrEqual(longitude, -180, 'Longitude should be at least -180');
    Asserts.assertNumberLessThanOrEqual(longitude, 180, 'Longitude should be at most 180');

    // Validate nested object
    Asserts.assertEquals('-38.383494', body.location.latitude, 'Nested latitude should match');
    Asserts.assertEquals('33.427362', body.location.longitude, 'Nested longitude should match');

  });

  test('POST create new place', async ({ request }) => {

    const response = await request.post(
      'https://rahulshettyacademy.com/maps/api/place/add/json',
      {
        params: {
          key: 'qaclick123'
        },
        data: {
          location: {
            lat: -38.383494,
            lng: 33.427362
          },
          accuracy: 2,
          name: 'Cafe Unosquare Mentorship',
          phone_number: '(52) 55 4000 4000',
          address: 'Patria 123',
          types: [
            'coffe',
            'restaurant',
            'bar',
            'brunch'
          ],
          website: 'https://unosquare.com',
          language: 'United States-SP'
        }
      }
    );

    // Validate response status
    Asserts.assertEquals(200, response.status(), 'Response status should be 200');

    const body = await response.json();

    // Validate response body
    Asserts.assertEquals('OK', body.status, 'Response status field should be OK');
    Asserts.assertObjectNotNull(body.place_id, 'Response should include a place_id');

    const placeId: string = body.place_id;

    // Regex validation only numbers and letters (0-9 | A-Z | a-z)
    Asserts.assertTruthy(/^[a-zA-Z0-9]+$/.test(placeId), 'place_id should contain only alphanumeric characters'); // Validate place_id format
    Asserts.assertNumberGreaterThan(placeId.length, 31, 'place_id should be longer than 31 characters'); // Validate place_id length

    TestUtilities.logToConsole('Created place_id: ' + body.place_id);
  });
});
