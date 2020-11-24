import { PartialType } from '@nestjs/swagger';

import { CreateShowDto } from './create-show.dto';

// todo check how this looks from the docs,
// if not working right you can just copy paste the fields and annotate
// or file a bug
export class UpdateShowDto extends PartialType(CreateShowDto) {}
