import { Injectable } from '@nestjs/common';
import { UploadHandHistoryText } from './dto/upload-hand-history-text';
import { parseHandHistory } from './helpers/parse-hand-history';

@Injectable()
export class HandHistoryService {
  uploadText(dto: UploadHandHistoryText) {
    const response = parseHandHistory(dto.text);
    return { hands: response };
  }
}
