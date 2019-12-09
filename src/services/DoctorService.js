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

const getWorkingTime = (doctorId, date, timeFrom, serviceDuration) => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DOCTOR_WORKING_TIME(doctorId)}`,
    {
      date,
      timeFrom,
      serviceDuration
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

const getReviews = (doctorId, page, pageSize) => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DOCTOR_REVIEWS(doctorId)}`,
    {
      page,
      pageSize
    },
    true
  )
};

export const DoctorService = {
  getDoctors,
  getDoctor,
  getWorkingTime,
  getCheckingServices,
  getReviews
};
