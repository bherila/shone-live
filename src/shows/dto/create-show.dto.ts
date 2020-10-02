import { IsDateString, IsString, IsNumber, IsOptional } from "class-validator";

export class CreateShowDto {
    @IsString()
    readonly userId: string;

    // this should inclue the time that the show starts at, as it's a datetime
    // https://en.wikipedia.org/wiki/ISO_8601
    @IsDateString()
    readonly date: string;

    @IsNumber()
    readonly length: number;

    @IsString()
    readonly description: string;

    @IsString()
    readonly name: string;

    @IsOptional()
    @IsDateString()
    readonly start: string;

    @IsOptional()
    @IsDateString()
    readonly end: string;
}
