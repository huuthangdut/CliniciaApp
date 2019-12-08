import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const getFavorites = (page, pageSize) => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.FAVORITE}`,
    {
       page,
       pageSize
    },
    true,
  );
};

const addToFavorite = (doctorId) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.FAVORITE}`,
    {
       doctorId
    },
    true,
  );
};

const removeFromFavorite = (doctorId) => {
  return Api.delete(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.FAVORITE}/${doctorId}`,
    true
  );
};

export const FavoriteService = {
    getFavorites,
    addToFavorite,
    removeFromFavorite
};
