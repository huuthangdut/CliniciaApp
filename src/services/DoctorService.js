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
    false,
  );
};

const getDoctor = id => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DOCTOR(id)}`,
    false,
  );
};

const getWorkingTime = (doctorId, date) => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.DOCTOR_WORKING_TIME(doctorId)}`,
    {
      date
    },
    false,
  )
}

export const DoctorService = {
  getDoctors,
  getDoctor,
  getWorkingTime
};
