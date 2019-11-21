import {CONFIG} from '../Config';
import {Api} from '../utilities/api';

const getNotifications = (page, pageSize) => {
  return Api.get(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.NOTIFICATIONS}`,
    {
      page,
      pageSize,
    },
    true,
  );
};

const markAsRead = id => {
  return Api.post(
    `${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.NOTIFICATION_READ(id)}`,
    null,
    true,
  );
};

const deleteNotification = id => {
    return Api.delete(`${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.NOTIFICATIONS}/${id}`, true);
}

const getUnseenNotificationCount = () => {
    return Api.get(`${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.NOTIFICATION_UNSEEN_COUNT}`, true)
  }

const readUnseenNotification = () => {
    return Api.post(`${CONFIG.API_ROOT}/v${CONFIG.API_VERSION}/${CONFIG.API_URL.NOTIFICATION_UNSEEN_READ}`, true)
}

export const NotificationService = {
    getNotifications,
    deleteNotification,
    markAsRead,
    getUnseenNotificationCount,
    readUnseenNotification
};
