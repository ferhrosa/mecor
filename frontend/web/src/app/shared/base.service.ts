import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpServiceBase {

  constructor(
    protected httpClient: HttpClient,
  ) { }

  protected apiUrl(...parts: string[]): string {
    return environment.apiBaseUrl.concat(
      parts?.map(s => s.replace(/^\//g, '').replace(/\/$/g, '')).join('/')
    );
  }

}
