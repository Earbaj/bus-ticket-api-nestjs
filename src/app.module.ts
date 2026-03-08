import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BusesModule } from './buses/buses.module';
import { SeatsModule } from './seats/seats.module';
import { TicketsModule } from './tickets/tickets.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { OperatorsModule } from './operators/operators.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ 
        name: 'short',
        ttl: 60000, 
        limit: 5  
      }],
    }),
    AuthModule,
    UsersModule,
    BusesModule, 
    SeatsModule,
    TicketsModule,
    PaymentModule,
    NotificationsModule,
    OperatorsModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // This applies rate limiting globally
    },
  ],
})
export class AppModule {}
