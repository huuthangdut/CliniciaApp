import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const login = (username, password) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.LOGIN}`,
    {
      username,
      password
    },
    false
  );
};

export const AuthService = {
  login
};