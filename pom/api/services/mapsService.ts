import { BaseApiService } from "../parent/baseApiService";
import { MapsConstants } from "../constants/mapsConstants";
import { TestUtilities } from "../../../utils/testUtilities";
import { Asserts } from "../../../utils/asserts";
import { ResponseGetPlaceDetails } from "../deserialize/responseGetPlaceDetails";
import { ResponsePostNewPlace } from "../deserialize/responsePostNewPlace";
import { ResponsePutUpdatePlace } from "../deserialize/responsePutUpdatePlace";
import { BodyPostNewPlace } from "../serialize/bodyPostNewPlace";
import { BodyPutUpdatePlace } from "../serialize/bodyPutUpdatePlace";
import { z } from "zod";

export class MapsService extends BaseApiService {
    // Bodies/Payloads
    public bodyPostNewPlace!: BodyPostNewPlace;
    public bodyPutUpdatePlace!: BodyPutUpdatePlace;

    // Responses
    public responseGetPlaceDetails!: ResponseGetPlaceDetails;
    public responsePostNewPlace!: ResponsePostNewPlace;
    public responsePutUpdatePlace!: ResponsePutUpdatePlace;

    // Constants
    private readonly _constants : MapsConstants = new MapsConstants();

    public async getPlaceDetails(placeId: string, expectedResponseCode: number = 200, expectedInfo?: ResponseGetPlaceDetails): Promise<void> {
        this.mainMethodStart("getPlaceDetails :: " + placeId);

        // Implementation for fetching place details
        let urlFinal: string = TestUtilities.replaceKeyName(this._constants.endpointGetPlaceDetails, "placeId", placeId);
        urlFinal = TestUtilities.replaceKeyName(urlFinal, "nickname", "qaclick123");

        await this.executeGetRequest(urlFinal);

        Asserts.assertEquals(expectedResponseCode, this.statusCode, "Status code should be the expected one");

        // Assign schema
        this.deserializingSchema = z.object({
            location: z.object({
                latitude: z.string(),
                longitude: z.string(),
            }),
            accuracy: z.string(),
            name: z.string(),
            phone_number: z.string(),
            address: z.string(),
            types: z.string(),
            website: z.string().url(),
            language: z.string(),
        });

        // Deserialize response
        //this.responseGetPlaceDetails = this.deserializeResponseWithoutSchema<ResponseGetPlaceDetails>(); // No schema: NOT RECOMMENDED
        this.responseGetPlaceDetails = this.deserializeResponse<ResponseGetPlaceDetails>(); // With schema: RECOMMENDED
        //this.responseGetPlaceDetails.printObjectDetails(); // Print details of the object using the method from the interface           

        // Only assert when the object was provided
        if(expectedInfo) {
            Asserts.assertObjectsEqual(expectedInfo, this.responseGetPlaceDetails, "The place details should match the expected info");
        }

        this.mainMethodEnd("getPlaceDetails :: " + placeId);
    }

    public async postCreatePlace(payload?: BodyPostNewPlace, expectedResponseCode: number = 200): Promise<string> {
        let placeId: string = "";
        
        this.mainMethodStart("postCreatePlace");

        if(!payload) {
            payload = BodyPostNewPlace.returnSampleObject();
        }

        // Implementation for fetching place details
        let urlFinal: string = TestUtilities.replaceKeyName(this._constants.endpointPostCreatePlace, "nickname", "qaclick123");

        await this.executePostRequest(urlFinal, payload);

        Asserts.assertEquals(expectedResponseCode, this.statusCode, "Status code should be the expected one");

        // Assign schema
        this.deserializingSchema = z.object({
            status: z.string(),
            place_id: z.string(),
            scope: z.string(),
            reference: z.string(),
            id: z.string()
        });

        // Deserialize response
        this.responsePostNewPlace = this.deserializeResponse<ResponsePostNewPlace>(); // With schema: RECOMMENDED

        Asserts.assertEquals("OK", this.responsePostNewPlace.status, "Status in response should be OK");

        placeId = this.responsePostNewPlace.place_id;

        this.mainMethodEnd("postCreatePlace");
        this.bodyPostNewPlace = payload; // Save the payload used for the POST request in case we want to use it later
        return placeId;
    }

    public async putUpdatePlace(payload: BodyPutUpdatePlace, expectedResponseCode: number = 200): Promise<void> {
        this.mainMethodStart("putUpdatePlace");

        await this.executePutRequest(this._constants.endpointPutUpdatePlace, payload);

        Asserts.assertEquals(expectedResponseCode, this.statusCode, "Status code should be the expected one");

        // Assign schema
        this.deserializingSchema = z.object({
            msg: z.string()
        });

        // Deserialize response
        this.responsePutUpdatePlace = this.deserializeResponse<ResponsePutUpdatePlace>(); // With schema: RECOMMENDED

        Asserts.assertEquals("Address successfully updated", this.responsePutUpdatePlace.msg, "Message in response should be correct");

        this.mainMethodEnd("putUpdatePlace");
        this.bodyPutUpdatePlace = payload; // Save the payload used for the PUT request in case we want to use it later
    }
}