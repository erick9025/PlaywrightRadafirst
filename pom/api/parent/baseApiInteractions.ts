import { HttpMethod } from "../../../utils/enums/httpMethod.ts";
import { TestUtilities } from "../../../utils/testUtilities.ts";
import { Asserts } from "../../../utils/asserts.ts";
import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { z } from "zod";

export abstract class BaseApiInteractions {

    private readonly CLOSE_CONNECTION : boolean = false; //close after each call, or close ONCE at the end of all tests using hooks

    private doingHybridTests: boolean = false;

    protected getDoingHybridTests(): boolean { 
        return this.doingHybridTests;
    }

    protected setDoingHybridTests(value: boolean): void {
        this.doingHybridTests = value;
    }

    // These 4 are NOT exposed

    // BELOW ERROR is caused when you add a tsconfig.json in your solution: this adds additional restriction to the languages, like forcing you to declare parameters type inside method signatures, etc.
    // ... Property 'requestContext' has no initializer and is not definitely assigned in the constructor.
    // ... You can fix this error by adding the definite assignment assertion operator (!) to the declaration of 'requestContext', indicating to TypeScript that it will be assigned before use.
    
    protected requestContext!: APIRequestContext;
    protected responseObject!: APIResponse;
    protected defaultHeaders!: Record<string, string>;
    protected deserializingSchema?: z.ZodType;

    // We want these 2 exposed in case we want to use them directly in tests
    public statusCode : number = -1;
    public responseJson! : string; //can be 'any' instead of 'string'

    constructor() {
    }
    
    private async init() : Promise<void> {
        if(this.requestContext) {
            //Do nothing, already defined/instanced
        }  
        else {
            this.requestContext = await request.newContext();
        }      
    }

    private async closeConnectionInternally(fromWhere : HttpMethod) : Promise<void> {
        if(this.CLOSE_CONNECTION) {
            this.info("Closing connection from HTTP call: " + fromWhere);
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
            this.infoImportant("Response is not in correct format, possiblly a 403 - Forbidden status. Error: " + error);
        }            
    }

    protected newEmptyLine(): void {
        TestUtilities.logMessageNoTimestamp(""); // Just a blank line for better console readability
    }

    protected info(message : string) : void {
        TestUtilities.logMessage(message);
    }

    protected infoImportant(message: string, printBlankLineAfter: boolean = true) : void {
        TestUtilities.logMessageImportant(message, printBlankLineAfter);
    }

    protected infoWarning(message: string, printBlankLineAfter: boolean = true) : void {
        TestUtilities.logMessageWarning(message, printBlankLineAfter);
    }

    protected infoBold(message: string) : void {
        TestUtilities.logMessageBold(message);
    }

    protected error(errorMessage : string) : void {
        TestUtilities.logErrorToConsole(errorMessage);
    }

    protected printResponseDetails() : void {
        this.info("Response status: " + this.statusCode);
        this.info("Response body: " + JSON.stringify(this.responseJson));
    }

    private printRequestURL(url: string, method: HttpMethod): void {
        this.infoImportant(`Executing HTTP '${method}' REST request with URL:`, false);
        this.infoBold(url);
    } 

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
        this.info("POST Body: " + JSON.stringify(bodyOrPayload));

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
        this.info("PUT Body: " + JSON.stringify(body));

        this.printHeaders(headers);

        await this.init();
        this.responseObject = await this.requestContext.put(url, { 
            headers,
            data: body 
        });

        await this.assignReturnValues();
        await this.closeConnectionInternally(HttpMethod.PUT);
    }

    protected async executePatchRequest(url: string, body: any, headers?: Record<string, string>): Promise<void> {
        this.printRequestURL(url, HttpMethod.PATCH);
        this.info("PATCH Body: " + JSON.stringify(body));

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

    // We can do 2 things and deserialization will not fail, 1ST : Remove/Comment a field, 2nd: Add a field that is not in the api response (public fake: string;)
    protected deserializeResponseWithoutSchema<T>(): T { // Way #1 - without schema checking (SIMPLER)
        this.info("Standardly deserializing response to the specified Class model.");

        let deserializedObjectFromClassT: T;

        try{
            deserializedObjectFromClassT = this.responseJson as unknown as T; // Must be explicit 'DESERIALIZE': Transform a JSON into an object of a CLASS
        }
        catch(error) { // HEADS UP: This catch never actually happen because JavaScript is so flexible, so we can't really validate unless we add endless methods to validate typeof (see below commented function)
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
        this.info("Safely deserializing response to the specified Zod Schema.");
        let result;

        if (!schema) {
            Asserts.assertFail("Schema is required for safe deserialization. Please provide one (you can ask ChatGPT how to do it by giving him a JSON)");
        }

        result = schema!.safeParse(this.responseJson);
        Asserts.assertCorrectZodSchema(this.responseJson, schema!, "Attempting to deserialize using Zod Schema"); 
        
        // If your assertion guarantees success, you can use non-null assertion
        return result.data!;
    }

    private printHeaders(headers?: Record<string, string>): void {
        if (headers && Object.keys(headers).length > 0) {
            this.info("Headers:");
            for (const [key, value] of Object.entries(headers)) {
                this.info(`  ${key}: ${value}`);
            }
        } else {
            this.info("No additional headers provided.");
        }
    }
}