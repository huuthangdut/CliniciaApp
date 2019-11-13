import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

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

  static handleError(response) {
    throw new AppError(response.response.data.errorCode, response.response.data.errorMessage);
  }

  static async requestConfig(params, authorize) {
    let config = { 
      params: params || undefined,
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
        const head = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRAZ21haWwuY29tIiwidXNlcl9pZCI6IjA4ZDc2NThiLTc2YjktZjk1Yi1jMDFlLTk5ZmNlMDk1NDYzOCIsInVzZXJfbmFtZSI6ImFkQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJUcmFuIEh1dSIsImxhc3RfbmFtZSI6IlRoYW5nIiwiZW1haWwiOiJhZEBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIzOTU5MjI1OTkiLCJyb2xlIjoiUGF0aWVudCIsInN1YiI6ImFkQGdtYWlsLmNvbSIsImp0aSI6Ijk3MWQ1OTI0LWVmZDItNDdmZi1iNGU3LWU1MGE0MTdiMzM5OCIsImlhdCI6MTU3MzM1NzA5OSwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3lzdGVtIjoiTW9iaWxlIiwibmJmIjoxNTczMzU3MDk5LCJleHAiOjE1NzU5NDkwOTksImlzcyI6IkNsaW5pY2lhLmNvbSIsImF1ZCI6IkNsaW5pY2lhIn0.oP2HkhMX7SHA5ySnEP72oBCvwTxr2yS4aSO6fmWTxrQ';
        config.headers['Authorization'] = head;
    }
    return config;
  }
}
