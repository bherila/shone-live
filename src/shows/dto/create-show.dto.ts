import { IsDateString, IsString, IsNumber } from "class-validator";

export class CreateShowDto {
    @IsNumber()
    readonly userId: number;

    @IsDateString()
    readonly start: string;

    @IsNumber()
    readonly length: number;

    @IsString()
    readonly description: string;

    @IsString()
    readonly name: string;
}
