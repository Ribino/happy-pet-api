import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { ProfessionalModule } from './professional/professional.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { ServiceModule } from './service/service.module';
import { PetModule } from './pet/pet.module';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { RemovePasswordFieldMiddleware } from './middlewares/removePasswordFieldmiddleware';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    UserModule,
    ClientModule,
    ProfessionalModule,
    SchedulingModule,
    ServiceModule,
    PetModule,
    PrismaModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [
    PrismaClient,
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RemovePasswordFieldMiddleware).forRoutes('*');
  }
}
