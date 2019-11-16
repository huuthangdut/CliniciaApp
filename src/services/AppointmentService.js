import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const getAppointments = (page, pageSize, status) => {
  let params = {
    page: page,
    pageSize: pageSize,
    status: status
  };

  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.APPOINTMENTS}`,
    params,
    true,
  );
};

const getAppointment = id => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.APPOINTMENT(
      id,
    )}`,
    null,
    true,
  );
};

const addAppointment = appointment => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.APPOINTMENTS}`,
    appointment,
    true,
  );
};

export const AppointmentService = {
    getAppointments,
    getAppointment,
    addAppointment
};
