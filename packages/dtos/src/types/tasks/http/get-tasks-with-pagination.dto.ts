import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

@ApiSchema({ name: "GetTasksWithPaginationDTO" })
export class GetTasksWithPaginationQueryDTO {
  @Type(() => Number)
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  @ApiProperty({
    example: "1",
    description: "Número da página",
    minimum: 1,
  })
  page: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  @Max(100)
  @ApiProperty({
    example: "10",
    description: "Limite de resultados por pagina",
    minimum: 5,
    maximum: 100,
  })
  limitPerPage: number;
}
