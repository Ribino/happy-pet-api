import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RemovePasswordFieldMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: () => void) {
    if (
      req.body?.query?.includes('query') &&
      req.body?.query?.includes('user')
    ) {
      const result = await this.prismaService.$queryRaw(req.body.query);

      if (!Array.isArray(result)) {
        res.send({
          data: result,
          errors: null,
        });

        return next();
      }

      const modifiedResult = result.map((user) => {
        const { password, ...rest } = user;
        return rest;
      });

      res.send({
        data: modifiedResult,
        errors: null,
      });
    } else {
      next();
    }
  }
}
