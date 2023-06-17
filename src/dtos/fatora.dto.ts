import { PartialType } from "@nestjs/swagger";

export class CreateFatoraDto {

}
export class UpdateFatoraDto extends PartialType(CreateFatoraDto) { }
