import { Module } from '@nestjs/common';

import { ObjService } from './helpers/object.service';

@Module({
  imports: [],
  providers: [ObjService],
  exports: [ObjService],
})
export class CommonModule {}
