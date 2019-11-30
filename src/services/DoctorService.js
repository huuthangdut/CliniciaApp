import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const getDoctors = ({
  page,
  pageSize,
  specialtyId,
  sort,
  searchTerm,
  gender,
  yearExperience,
  price,
  availableToday,
}) => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DOCTORS}`,
    {
      page,
      pageSize,
      specialtyId,
      sort,
      searchTerm,
      gender,
      yearExperience,
      price,
      availableToday,
    },
    true
  );
};

const getDoctor = id => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DOCTOR(id)}`,
    null,
    true
  );
};

const getWorkingTime = (doctorId, date) => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DOCTOR_WORKING_TIME(doctorId)}`,
    {
      date
    },
    true
  )
}

const getCheckingServices = (doctorId) => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DOCTOR_CHECKING_SERVICES(doctorId)}`,
    null,
    true
  )
}

export const DoctorService = {
  getDoctors,
  getDoctor,
  getWorkingTime,
  getCheckingServices
};
