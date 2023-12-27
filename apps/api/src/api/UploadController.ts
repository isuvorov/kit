import { Err } from '@lsk4/err';
import { Controller, Get, Post, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { IsAuth } from '@nestlib/auth';
import { UploadService } from '@nestlib/upload';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/api/upload')
  @IsAuth()
  @UseInterceptors(AnyFilesInterceptor())
  async upload(@Req() req, @UploadedFiles() files) {
    const userId = req.session?.user._id;
    if (!userId) throw new Err('!userId', { status: 400, message: 'userId is required' });
    if (files?.length === 0) throw new Err('!files', { status: 400, message: 'files is required' });

    const items = files.map((file) => {
      const filename = `${new Date().getTime()}-${file.originalname}`;
      return {
        buffer: file.buffer,
        mimetype: file.mimetype,
        filename,
        path: `/users/${userId}/uploads/${filename}`,
      };
    });

    const data = await this.uploadService.uploadMany(items);

    return { data };
  }

  @Get('/api/upload')
  @UseInterceptors(AnyFilesInterceptor())
  async getFile(@Query('path') path) {
    const url = await this.uploadService.getSignedUrl({ path });

    return { path, url };
  }
}
