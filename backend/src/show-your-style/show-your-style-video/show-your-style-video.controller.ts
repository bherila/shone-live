import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { StyleVideoService } from './show-your-style-video.service'

@Controller('/api/transloadit_notify')
export class StyleVideoController {
  constructor(private readonly styleTransloaditService: StyleVideoService) {}

  @ApiOperation({ summary: `Add video entry` })
  @Post('/')
  async transloaditVideoUploadEntry(@Req() req: Request, @Res() res: Response) {
    return await this.styleTransloaditService.addTransloaditVideoEntry(req, res)
  }
}
