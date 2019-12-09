import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const addReview = ({rating, comment, doctorId, appointmentId}) => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.REVIEWS}`,
    {
       rating,
       comment,
       doctorId,
       appointmentId
    },
    true,
  );
};

export const ReviewService = {
    addReview
};
