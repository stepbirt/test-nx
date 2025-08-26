import { AxiosError } from './../../../../node_modules/axios/index.d';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('test')
  async test() {
    const test = await this.httpService
      .get('https://api.ipify.org/?format=json')
      .pipe(
        map((response) => response.data),
        catchError((error: AxiosError) => {
          console.log(error.message);
          throw error;
        })
      );
    return test;
  }
}
