import { Injectable } from '@nestjs/common';
import { UploadHandHistoryText } from './dto/upload-hand-history-text';

@Injectable()
export class HandHistoryService {
  uploadText(dto: UploadHandHistoryText) {
    return dto;
  }
}
