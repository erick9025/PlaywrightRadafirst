import { BaseApiService } from "../parent/baseApiService";
import { TestUtilities } from "../../../utils/testUtilities";
import { Asserts } from "../../../utils/asserts";
import { ResponseGetAllProducts } from "../deserialize/responseGetAllProducts";
import { z } from "zod";

export class ProductsService extends BaseApiService {
    // Responses
    public responseGetAllProducts!: ResponseGetAllProducts[];

    // Static items
    public static listAllProducts: string[] = [ "erick "];

    public async getAllProducts(): Promise<void> {
        this.mainMethodStart("getAllProducts");

        await this.executeGetRequest("https://fakestoreapi.com/products");

        Asserts.assertEquals(200, this.statusCode, "Status code should be the expected one");

        const RatingSchema = z.object({
        rate: z.number(),
        count: z.number().int().nonnegative(),
        });

        const ProductSchema = z.object({
        id: z.number().int().positive(),
        title: z.string(),
        price: z.number().nonnegative(),
        description: z.string(),
        category: z.enum([
            "men's clothing",
            "women's clothing",
            "jewelery",
            "electronics",
        ]),
        image: z.string().url(),
        rating: RatingSchema,
        });

        const ProductsSchema = z.array(ProductSchema);

        this.deserializingSchema = ProductsSchema;

        // Deserialize response
        this.responseGetAllProducts = this.deserializeResponse<ResponseGetAllProducts[]>(); // With schema: RECOMMENDED

        // Empty list
        ProductsService.listAllProducts = [];

        for (const product of this.responseGetAllProducts) {
            this.info("......................");
            this.infoBold(`Title: ${product.title}`);
            this.info(`Product ID: ${product.id}`);            
            this.info(`Price: $${product.price}`);
            this.info("");
            ProductsService.listAllProducts.push(product.title);
        }

        this.mainMethodEnd("getAllProducts");
    }
}