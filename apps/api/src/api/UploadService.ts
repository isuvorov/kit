import { Err } from '@lsk4/err';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { map } from 'fishbird';
import { InjectS3 } from 'nestjs-s3';

type File = {
  buffer: Buffer;
  mimetype: string;
  path: string;
};

@Injectable()
export class UploadService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private configService: ConfigService,
  ) {
    // console.log('s3', this.configService.get('s3'));
  }
  getKey({ path }) {
    return path[0] === '/' ? path.slice(1) : path;
  }
  getUrl({ path }) {
    const prefix = this.configService.get('s3.prefix');
    if (!prefix) throw new Err('!config.s3.prefix');
    return `${prefix.replace(/\/$/, '')}/${this.getKey({ path })}`;
  }
  async fetchFileInfo(file: { path: string }) {
    if (!file) throw new Err('!file', { status: 400, message: 'file is required' });
    const bucket = this.configService.get('s3.bucket');
    if (!bucket) throw new Err('!config.s3.bucket');
    const prefix = this.configService.get('s3.prefix');
    if (!prefix) throw new Err('!config.s3.prefix');
    const { path } = file;
    if (!path) throw new Err('!path', { status: 400, message: 'path is required' });

    const key = this.getKey({ path });
    const url = this.getUrl({ path });
    const props = {
      Bucket: bucket,
      Key: key,
    };
    try {
      const res = await this.s3.headObject(props);
      return {
        ...res,
        url,
      };
    } catch (err) {
      const is404 = err?.$metadata?.httpStatusCode === 404;
      if (is404) return null;
      // console.log('err', err, { is404 });
      throw err;
    }
  }
  async upload(file: File) {
    if (!file) throw new Err('!file', { status: 400, message: 'file is required' });
    const bucket = this.configService.get('s3.bucket');
    if (!bucket) throw new Err('!config.s3.bucket');
    const prefix = this.configService.get('s3.prefix');
    if (!prefix) throw new Err('!config.s3.prefix');

    const { buffer, mimetype, path } = file;

    const key = this.getKey({ path });
    const url = this.getUrl({ path });
    const props = {
      Bucket: bucket,
      ACL: 'public-read',
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    };
    await this.s3.putObject(props);

    return {
      bucket,
      path,
      mimetype,
      url,
    };
  }
  async uploadMany(files: File[]) {
    if (files?.length === 0) throw new Err('!files', { status: 400, message: 'files is required' });
    const bucket = this.configService.get('s3.bucket');
    if (!bucket) throw new Err('!config.s3.bucket');
    const prefix = this.configService.get('s3.prefix');
    if (!prefix) throw new Err('!config.s3.prefix');

    const res = await map(files, (item) => this.upload(item));

    return res;
  }
}