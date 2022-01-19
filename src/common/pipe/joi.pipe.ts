import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Paramtype,
  PipeTransform,
} from '@nestjs/common';
import { AnySchema } from 'joi';

@Injectable()
export class JoiPipe implements PipeTransform {
  constructor(private schema: AnySchema, private metaType?: Paramtype) {}

  async transform(input: any, metadata: ArgumentMetadata) {
    if (this.metaType && metadata.type !== this.metaType) {
      return input;
    }
    const { value, error } = await this.schema.validate(input);
    if (error) {
      throw new BadRequestException({
        error: 'BAD_REQUEST',
        message: error.message,
        details: error.details,
      });
    }
    return value;
  }
}
