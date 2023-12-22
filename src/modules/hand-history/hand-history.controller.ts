import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UploadHandHistoryText } from './dto/upload-hand-history-text';
import { ApiTags } from '@nestjs/swagger';
import { HandHistoryService } from './hand-history.service';

@ApiTags('HandHistory')
@Controller({
  path: 'hand-history',
  version: '1',
})
export class HandHistoryController {
  constructor(private readonly handHistoryService: HandHistoryService) {}
  @Post('text')
  @HttpCode(HttpStatus.CREATED)
  uploadText(@Body() uploadHandHistoryTextDto: UploadHandHistoryText) {
    return this.handHistoryService.uploadText(uploadHandHistoryTextDto);
  }
}
