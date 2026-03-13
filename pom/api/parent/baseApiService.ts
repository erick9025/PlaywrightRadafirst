import { HttpMethod } from "../../../utils/enums/httpMethod.ts";
import { TestUtilities } from "../../../utils/testUtilities.ts";
import { Asserts } from "../../../utils/asserts.ts";
import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { z } from "zod";

export abstract class BaseApiService {

    private readonly _closeConnection : boolean = false; // close after each call, or close ONCE at the end of all tests using hooks

    // These 4 are NOT exposed

    // BELOW ERROR is caused when you add a tsconfig.json in your solution: this adds additional restriction to the languages, like forcing you to declare parameters type inside method signatures, etc.
    // ... Property 'requestContext' has no initializer and is not definitely assigned in the constructor.
    // ... You can fix this error by adding the definite assignment assertion operator (!) to the declaration of 'requestContext', indicating to TypeScript that it will be assigned before use.
    
    protected requestContext!: APIRequestContext;
    protected responseObject!: APIResponse;
    protected defaultHeaders!: Record<string, string>;
    protected deserializingSchema?: z.ZodType;

    // We want these 2 exposed in case we want to use them directly in tests
    private _statusCode : number = -1;
    private _responseJson! : string; //can be 'any' instead of 'string'

    public get statusCode() : number { return this._statusCode; }
    private set statusCode(value: number) { this._statusCode = value; }

    public get responseJson() : string { return this._responseJson; }
    private set responseJson(value: string) { this._responseJson = value; }

    constructor() {
        // We can initialize default headers here if needed, or leave it to be set by child classes or individual tests
    }
    
    // ***************************************** INTERNAL METHODS - NOT EXPOSED TO TESTS *****************************************

    private async init() : Promise<void> {
        if(this.requestContext) {
            //Do nothing, already defined/instanced
        }  
        else {
            this.requestContext = await request.newContext();
        }      
    }

    private async closeConnectionInternally(fromWhere : HttpMethod) : Promise<void> {
        if(this._closeConnection) {
            this.logMessage("Closing connection from HTTP call: " + fromWhere);
            await this.closeConnection();
        }        
    }

    public async closeConnection() : Promise<void> {
        try {
            if(this.requestContext) {
                await this.requestContext.dispose();
            }
        }
        catch (error) {
            this.error("Error while closing connection: " + error);
        }
    }

    protected async assignReturnValues() : Promise<void>{
        try {
            this.statusCode = await this.responseObject.status();
            this.responseJson = await this.responseObject.json(); 
        }
        catch(error) {
            this.logMessageImportant("Response is not in correct format, possibly a 403 - Forbidden status. Error: " + error);
        }            
    }

    // ***************************************** UTILITY METHODS *****************************************

    protected methodStart(methodName: string, additionallogMessage: string = "") : void {
        const haslogMessage: boolean = !TestUtilities.isNullOrEmpty(additionallogMessage);
        console.log("");        
        TestUtilities.logMethodStart(haslogMessage ? "...Starting method [" + methodName + "] " + additionallogMessage : "...Starting method [" + methodName + "]");
    }

    protected methodEnd(methodName: string, additionallogMessage: string = "") : void {
        const haslogMessage: boolean = !TestUtilities.isNullOrEmpty(additionallogMessage);
        TestUtilities.logMethodEnd(haslogMessage ? "...Ending method [" + methodName + "] " + additionallogMessage : "...Ending method [" + methodName + "]");
        console.log(""); 
    }

    protected mainMethodStart(mainMethodName : string, additionallogMessage : string = "") : void {
        const haslogMessage: boolean = !TestUtilities.isNullOrEmpty(additionallogMessage);
        console.log("");        
        TestUtilities.logMainMethodStart(haslogMessage ? "...Starting method [" + mainMethodName + "] " + additionallogMessage : "...Starting method [" + mainMethodName + "]");
    }

    protected mainMethodEnd(mainMethodName : string, additionallogMessage : string = "") : void {
        const haslogMessage: boolean = !TestUtilities.isNullOrEmpty(additionallogMessage);
        TestUtilities.logMainMethodEnd(haslogMessage ? "...Ending method [" + mainMethodName + "] " + additionallogMessage : "...Ending method [" + mainMethodName + "]");
        console.log("");
    }

    protected newEmptyLine(): void {
        TestUtilities.logMessageNoTimestamp(""); // Just a blank line for better console readability
    }

    protected logMessage(message : string) : void {
        TestUtilities.logMessage(message);
    }

    protected logMessageImportant(message: string, printBlankLineAfter: boolean = true) : void {
        TestUtilities.logMessageImportant(message, printBlankLineAfter);
    }

    protected logMessageWarning(message: string, printBlankLineAfter: boolean = true) : void {
        TestUtilities.logMessageWarning(message, printBlankLineAfter);
    }

    protected logMessageBold(message: string) : void {
        TestUtilities.logMessageBold(message);
    }

    protected error(errorMessage : string) : void {
        TestUtilities.logErrorToConsole(errorMessage);
    }

    protected printResponseDetails() : void {
        this.logMessage("Response status: " + this.statusCode);
        this.logMessage("Response body: " + JSON.stringify(this.responseJson));
    }

    private printRequestURL(url: string, method: HttpMethod): void {
        this.logMessageImportant(`Executing HTTP '${method}' REST request with URL:`, false);
        this.logMessageBold(url);
    } 

    private printHeaders(headers?: Record<string, string>): void {
        if (headers && Object.keys(headers).length > 0) {
            this.logMessage("Headers:");
            for (const [key, value] of Object.entries(headers)) {
                this.logMessage(`  ${key}: ${value}`);
            }
        } 
        else {
            this.logMessage("No additional headers provided.");
        }
    }

    // ***************************************** HTTP METHODS *****************************************

    protected async executeGetRequest(url: string, headers?: Record<string, string>): Promise<void> {
        this.printRequestURL(url, HttpMethod.GET);
        this.printHeaders(headers);

        await this.init();
        this.responseObject = await this.requestContext.get(url, { headers });

        await this.assignReturnValues();
        await this.closeConnectionInternally(HttpMethod.GET);
    }

    //bodyOrPayload can be 'object' (more specific) or 'any' (more general)
    protected async executePostRequest(url: string, bodyOrPayload: object, headers?: Record<string, string>): Promise<void> {
        this.printRequestURL(url, HttpMethod.POST);
        this.logMessage("POST Body: " + JSON.stringify(bodyOrPayload)); // Serialize the bodyOrPayload to a JSON string for logging purposes, but we will pass the original object to the request method to let Playwright handle the serialization. This way we can maintain the benefits of type checking and avoid issues with manual stringification.
        this.printHeaders(headers);

        await this.init();
        this.responseObject = await this.requestContext.post(url, { 
            headers,
            //data: JSON.stringify(body) // Explicit 'SERIALIZE' Transform an object of a CLASS into a JSON
            data: bodyOrPayload // Implicit 'SERIALIZE' Transform an object of a CLASS into a JSON
        });

        await this.assignReturnValues();
        await this.closeConnectionInternally(HttpMethod.POST);
    }

    protected async executePostRequestFormURLEncoded(url: string, paramsInPairs: any, headers?: Record<string, string>): Promise<void> {
        this.printRequestURL(url, HttpMethod.POST);

        this.printHeaders(headers);

        await this.init();
        this.responseObject = await this.requestContext.post(url, { 
            headers,
            form: paramsInPairs
        });

        await this.assignReturnValues();
        await this.closeConnectionInternally(HttpMethod.POST);
    }

    protected async executePutRequest(url: string, body: any, headers?: Record<string, string>): Promise<void> {
        this.printRequestURL(url, HttpMethod.PUT);
        this.logMessage("PUT Body: " + JSON.stringify(body));
        this.printHeaders(headers);

        await this.init();
        this.responseObject = await this.requestContext.put(url, { 
            headers,
            //data: JSON.stringify(body) // Explicit 'SERIALIZE' Transform an object of a CLASS into a JSON
            data: body 
        });

        await this.assignReturnValues();
        await this.closeConnectionInternally(HttpMethod.PUT);
    }

    protected async executePatchRequest(url: string, body: any, headers?: Record<string, string>): Promise<void> {
        this.printRequestURL(url, HttpMethod.PATCH);
        this.logMessage("PATCH Body: " + JSON.stringify(body));
        this.printHeaders(headers);

        await this.init();
        this.responseObject = await this.requestContext.patch(url, { 
            headers,
            data: body 
        });

        await this.assignReturnValues();
        await this.closeConnectionInternally(HttpMethod.PATCH);
    }

    protected async executeDeleteRequest(url: string, headers?: Record<string, string>): Promise<void> {
        this.printRequestURL(url, HttpMethod.DELETE);
        this.printHeaders(headers);

        await this.init();
        this.responseObject = await this.requestContext.delete(url, { headers });

        await this.assignReturnValues();
        await this.closeConnectionInternally(HttpMethod.DELETE);
    }

    // ***************************************** RESPONSE DESERIALIZATION METHODS *****************************************

    // We can do 2 things and deserialization will not fail, 1ST : Remove/Comment a field, 2nd: Add a field that is not in the api response (public fake: string;)
    protected deserializeResponseWithoutSchema<T>(): T { // Way #1 - without schema checking (SIMPLER)
        this.logMessage("Standardly deserializing response to the specified Class model.");

        let deserializedObjectFromClassT: T;

        try{
            deserializedObjectFromClassT = this.responseJson as unknown as T; // Must be explicit 'DESERIALIZE': Transform a JSON into an object of a CLASS
        }
        catch(error) { // HEADS UP: This catch will almost never actually happen because JavaScript is so flexible, so we can't really validate unless we add endless methods to validate typeof (see below commented function)
            throw error;
        }

        return deserializedObjectFromClassT; 
    }
    
    /*private isFakeResponsePersonInfo(obj: any): obj is FakeResponsePersonInfo {
        return typeof obj.firstName === 'string' &&
                typeof obj.lastName === 'string' &&
                typeof obj.age === 'number' &&
                obj.education !== null &&
                typeof obj.education?.degree === 'string' &&
                typeof obj.education?.graduationDate === 'string'; // or instanceof Date if parsed
    }*/    

    // Declare Schema for later deserialization
    // We can
    // ...1 : Declare a field that does NOT exist on the response JSON (--> ¿?)
    // ...2 : Do not declare a field (or comment) that EXISTS on the response JSON (--> still passes)
    protected deserializeResponse<T>(): T { // Way #2 - with schema checking (SAFER & MORE COMPLEX)
        return this.deserializeResponseWithExplicitSchema<T>(this.deserializingSchema as z.ZodType<T>);
    }

    // Declare Schema for later deserialization
    // We can
    // ...1 : Declare a field that does NOT exist on the response JSON (--> ¿?)
    // ...2 : Do not declare a field (or comment) that EXISTS on the response JSON (--> still passes)
    protected deserializeResponseWithExplicitSchema<T>(schema?: z.ZodSchema<T>): T { // Way #2 - with schema checking (SAFER & MORE COMPLEX)
        this.logMessage("Safely deserializing response to the specified Zod Schema.");
        let result;

        if (!schema) {
            Asserts.assertFail("Schema is required for safe deserialization. Please provide one (you can ask ChatGPT how to do it by giving him a JSON)");
        }

        result = Asserts.assertCorrectZodSchema(this.responseJson, schema!, "Attempting to deserialize using Zod Schema");         
        
        // If your assertion guarantees success, you can use non-null assertion
        return result!.data!;
    }
}