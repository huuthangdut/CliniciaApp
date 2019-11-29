import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const setLocation = (latitude, longitude, formattedAddress) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.USER_LOCATION}`,
    {
        latitude,
        longitude,
        formattedAddress
    },
    true,
  );
};

export const UserService = {
    setLocation
};
