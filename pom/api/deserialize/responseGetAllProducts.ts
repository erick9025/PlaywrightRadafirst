export class ResponseGetAllProductsRating {
    rate!: number;
    count!: number;
}

export class ResponseGetAllProducts {
    id!: number;
    title!: string;
    price!: number;
    description!: string;
    category!: string;
    image!: string;
    rating!: ResponseGetAllProductsRating;
}