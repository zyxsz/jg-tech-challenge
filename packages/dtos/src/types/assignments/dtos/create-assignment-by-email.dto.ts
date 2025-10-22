import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

@ApiSchema({ name: "CreateAssignmentByEmailBodyDTO" })
export class CreateAssignmentByEmailBodyDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: "Email do usuário",
  })
  email: string;
}
