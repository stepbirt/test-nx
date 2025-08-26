import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ProxyAgent } from 'proxy-agent';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new ProxyAgent(), // Handles HTTPS via proxy, with cert bypass
      proxy: false, // must disable axios's own proxy logic
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
