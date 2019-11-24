export const CONFIG = {
    API_ROOT: 'http://10.0.2.2:55123/api',
    API_VERSION: '1.0',
    API_URL: {
        LOGIN: 'account/login',
        REGISTER: 'account/register',
        REQUEST_2FA: 'account/request2fa',
        VERIFY_2FA: 'account/verify2fa',
        SPECIALTIES: 'specialties',
        DOCTORS: 'doctors',
        DOCTOR: (id) => `doctors/${id}`,
        DOCTOR_WORKING_TIME: (doctorId) => `doctors/${doctorId}/workingTime`,
        DOCTOR_CHECKING_SERVICES: (doctorId) => `doctors/${doctorId}/checkingServices`,
        APPOINTMENTS: 'appointments',
        APPOINTMENT: (id) => `appointments/${id}`,
        DEVICES: 'devices',
        DEVICE_STATUS: (deviceUuid) => `devices/${deviceUuid}/status`,
        NOTIFICATIONS: 'notifications',
        NOTIFICATION_READ: (id) => `notifications/${id}/read`,
        NOTIFICATION_UNSEEN_COUNT: 'notifications/unseen/count',
        NOTIFICATION_UNSEEN_READ: 'notifications/unseen/read',
    }
}