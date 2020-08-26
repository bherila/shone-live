import { IsString, IsNumber } from "class-validator";

export class CreateProductDto {
    @IsNumber()
    readonly userId: number;

    @IsNumber()
    readonly showId: number;

    @IsString()
    readonly photo: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsNumber()
    readonly price: number;

    @IsNumber()
    readonly quantity: number;
}
