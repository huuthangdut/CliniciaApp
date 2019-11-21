import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import qs from 'qs';

import {AppError} from '../common/app-error';
import {AppErrorCode} from '../common/enums';

export class Api {
  constructor() {}

  static async get(url, params, authorize) {
    const config = await this.requestConfig(params, authorize);
    const response = await axios.get(url, config).catch(this.handleError);

    return response.data.result;
  }

  static async post(url, body, authorize) {
    const config = await this.requestConfig(null, authorize);
    const response = await axios.post(url, body, config).catch(this.handleError);

    return response.data.result;
  }

  static async delete(url, authorize) {
    const config = await this.requestConfig(null, authorize);
    const response = await axios.delete(url, config).catch(this.handleError);

    return response.data.result;
  }

  static handleError(response) {
    throw new AppError(response.response.data.errorCode, response.response.data.errorMessage);
  }

  static async requestConfig(params, authorize) {
    let config = { 
      params: params || undefined,
      // to handle multiple parameters with the same name
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    };
    if (authorize) {
        // let token = await AsyncStorage.getItem('@access_token').catch((error) => {
        //     throw new AppError(AppErrorCode.TokenError, error.message);
        // });
        // if (token) {
        //     config.headers['Authorization'] = `Bearer ${token}`; 
        // } else {
        //     throw new AppError(AppErrorCode.TokenError, 'Token not found.');
        // }
        const head = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzQGdtYWlsLmNvbSIsInVzZXJfaWQiOiIwOGQ3Njc4Ny0zNzE3LTBjYmQtZWJkMy1lZTMxZmYyMWRlOTQiLCJ1c2VyX25hbWUiOiIxMjNAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IlRyYW4gSHV1IiwibGFzdF9uYW1lIjoiVGhhbmciLCJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIzOTU5MjI1OTkiLCJyb2xlIjoiUGF0aWVudCIsInN1YiI6IjEyM0BnbWFpbC5jb20iLCJqdGkiOiI3M2MxYWU3MC0zYTg2LTQyNTEtODc4Ni1kMGJjNGU1YzBjOTUiLCJpYXQiOjE1NzQxNjY5MDIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N5c3RlbSI6Ik1vYmlsZSIsIm5iZiI6MTU3NDE2NjkwMiwiZXhwIjoxNTc2NzU4OTAyLCJpc3MiOiJDbGluaWNpYS5jb20iLCJhdWQiOiJDbGluaWNpYSJ9.A8qMK25JEXPo6_WxIy4RjDmNn4illERhdqpLc84O_v4';
        config.headers['Authorization'] = head;
    }
    return config;
  }

  static apiParamsSerializer = (params) => {
    var parts = [];
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var obj = params[key];
        if ($.isArray(obj)) {
          for (var idx = 0; idx < obj.length; idx++) {
            parts.push(key + '=' + encodeURIComponent(obj[idx]));
          }
        } else {
          parts.push(key + '=' + encodeURIComponent(obj));
        }
      }
    }
    return parts.join('&');
  };
}
