import { Module } from '@nestjs/common';
import { HandHistoryController } from './hand-history.controller';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { HandHistoryService } from './hand-history.service';

@Module({
  controllers: [HandHistoryController],
  providers: [IsExist, IsNotExist, HandHistoryService],
  exports: [HandHistoryService],
})
export class HandHistoryModule {}
