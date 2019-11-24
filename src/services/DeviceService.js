import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const addOrUpdateDevice = (deviceToken, deviceType, deviceUuid) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DEVICES}`,
    {
      deviceToken,
      deviceType,
      deviceUuid,
    },
    true
  );
};

const updateStatus = (deviceUuid, status) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DEVICE_STATUS(deviceUuid)}`,
    {
      status
    },
    true
  );
};

export const DeviceService = {
  addOrUpdateDevice,
  updateStatus
};
