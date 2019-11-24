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
        let token = await AsyncStorage.getItem('@access_token').catch((error) => {
            throw new AppError(AppErrorCode.TokenError, error.message);
        });
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
        } else {
            throw new AppError(AppErrorCode.TokenError, 'Token not found.');
        }
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
