import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadHandHistoryText {
  @ApiProperty()
  @IsNotEmpty()
  text: string;
}
