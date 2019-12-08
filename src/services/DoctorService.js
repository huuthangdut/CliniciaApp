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

const getCheckingServices = () => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.CHECKING_SERVICES}`,
    null,
    true
  )
}

const addCheckingService = ({name, description, durationInMinutes, price, doctorId}) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.CHECKING_SERVICES}`,
    {
      name,
      description,
      durationInMinutes,
      price,
      doctorId
    },
    true
  );
}

const updateCheckingService = ({id, name, description, durationInMinutes, price, doctorId}) => {
  return Api.put(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.CHECKING_SERVICES}`,
    {
      id,
      name,
      description,
      durationInMinutes,
      price,
      doctorId
    },
    true
  );
}

const deleteCheckingService = (id) => {
  return Api.delete(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.CHECKING_SERVICE(id)}`,
    null,
    true
  );
}

export const DoctorService = {
  getDoctors,
  getDoctor,
  getWorkingTime,
  getCheckingServices,
  addCheckingService,
  updateCheckingService,
  deleteCheckingService
};
