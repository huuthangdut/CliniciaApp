import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const getUpcomingAppointment = () => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.UPCOMING_APPOINTMENT}`,
    null,
    true,
  );
};

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
    true
  );
};

const cancelAppointment = (id) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.CANCEL_APPOINTMENT(id)}`,
    null,
    true
  );
}

export const AppointmentService = {
    getAppointments,
    getAppointment,
    addAppointment,
    cancelAppointment,
    getUpcomingAppointment
};
