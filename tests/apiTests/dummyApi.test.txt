import { test, expect } from '@playwright/test';

test("Testing REST API GET maps directly", async ({ request }) => {     

    const response = await request.get(
        'https://rahulshettyacademy.com/maps/api/place/get/json',
        {
        params: {
            key: 'qaclick123',
            place_id: '7d4e3875cb641a63048d8bfa0faffe47'
        }
        }
    );

    // Validate status
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validate response fields
    expect(body.name).toBe('Cafe Unosquare');
    expect(body.address).toBe('Constitucion 1990');
    expect(body.language).toBe('United States-SP');

    // Validate nested object
    expect(body.location.latitude).toBe('-38.383494');
    expect(body.location.longitude).toBe('33.427362');
});

test('POST create place', async ({ request }) => {

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
        name: 'Cafe Unosquare',
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
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validate response body
  expect(body.status).toBe('OK');
  expect(body).toHaveProperty('place_id');
  expect(body.place_id).not.toBeNull();

  const placeId: string = body.place_id;

  expect(placeId).toMatch(/^[a-zA-Z0-9]+$/); // Validate place_id format
  expect(placeId.length).toBeGreaterThan(31); // Validate place_id length

  console.log('Created place_id:', body.place_id);
});