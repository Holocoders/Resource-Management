import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';

@Injectable()
export class SharedService {
  uploadImage(createReadStream, path): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(path))
        .on('finish', () => {
          resolve(true);
        })
        .on('error', () => reject(false)),
    );
  }
}
