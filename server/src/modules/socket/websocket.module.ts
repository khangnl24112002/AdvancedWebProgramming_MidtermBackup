import { Module } from '@nestjs/common';
import { ChatWebsocketGateway } from './websocket.gateway';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ChatWebsocketGateway, JwtService, PrismaService],
})
export class WebSocketModule {}
