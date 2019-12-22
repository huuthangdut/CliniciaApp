import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const login = (username, password) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.LOGIN}`,
    {
      username,
      password,
      isUserLogin: false
    },
    false,
  );
};

const register = ({firstName, lastName, phoneNumber, email, password}) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.REGISTER}`,
    {
      firstName, 
      lastName, 
      phoneNumber, 
      email, 
      password
    },
    false,
  );
};

const request2fa = phoneNumber => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.REQUEST_2FA}`,
    {
      phoneNumber,
    },
    false,
  );
};

const verify2fa = (code, token) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.VERIFY_2FA}`,
    {
      code,
      token,
    },
    false,
  );
};

export const AuthService = {
  login,
  register,
  request2fa,
  verify2fa,
};
