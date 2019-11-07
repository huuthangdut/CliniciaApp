import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const getSpecialties = (page, pageSize) => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.SPECIALTIES}`,
    {
      page,
      pageSize
    },
    false
  );
};

export const SpecialtyService = {
    getSpecialties
};