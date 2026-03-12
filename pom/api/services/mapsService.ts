import { BaseApiService } from "../parent/baseApiService";
import { MapsConstants } from "../constants/mapsConstants";
import { TestUtilities } from "../../../utils/testUtilities";
import { Asserts } from "../../../utils/asserts";
import { ResponseGetPlaceDetails } from "../deserialize/responseGetPlaceDetails";
import { z } from "zod";

export class MapsService extends BaseApiService {
    // Bodies/Payloads

    // Responses
    public responseGetPlaceDetails!: ResponseGetPlaceDetails;

    // Constants
    private readonly _constants : MapsConstants = new MapsConstants();

    public async getPlaceDetails(placeId: string, expectedResponseCode: number = 200, expectedInfo?: ResponseGetPlaceDetails): Promise<MapsService> {
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

        // Print every property of the response in a readable format (ToDo MOVE TO METHOD INSIDE CLASS)
        this.logMessageBold("Response for getPlaceDetails:");
        this.logMessage("Location:");
        this.logMessage("...Latitude: " + this.responseGetPlaceDetails.location.latitude);
        this.logMessage("...Longitude: " + this.responseGetPlaceDetails.location.longitude);
        this.logMessage("Accuracy: " + this.responseGetPlaceDetails.accuracy);
        this.logMessage("Name: " + this.responseGetPlaceDetails.name);
        this.logMessage("Phone Number: " + this.responseGetPlaceDetails.phone_number);
        this.logMessage("Address: " + this.responseGetPlaceDetails.address);
        this.logMessage("Types: " + this.responseGetPlaceDetails.types);
        this.logMessage("Website: " + this.responseGetPlaceDetails.website);
        this.logMessage("Language: " + this.responseGetPlaceDetails.language);

        // Only assert when the object was provided
        if(expectedInfo){
            Asserts.assertObjectsEqual(expectedInfo, this.responseGetPlaceDetails, "The place details should match the expected info");
        }        

        this.mainMethodEnd("getPlaceDetails :: " + placeId);
        return this;
    }
}