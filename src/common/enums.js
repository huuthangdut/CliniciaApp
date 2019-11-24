export const ApiErrorCode = {
  Failed: 'Failed',
  UserLoginInvalidUserNameOrPassword: 'UserLoginInvalidUserNameOrPassword',
  UserLoginIsNotActive: 'UserLoginIsNotActive',
  UserLockedOut: 'UserLockedOut',
  IdentityError: 'IdentityError',
  RequireConfirmedPhoneNumber: 'RequireConfirmedPhoneNumber',
};

export const AppErrorCode = {
  TokenError: 'TokenError',
  LoginError: 'LoginError',
};

export const AppointmentStatus = {
  Confirming: {name: 'Chưa xác nhận', value: 0},
  Confirmed: {name: 'Đã xác nhận', value: 1},
  Completed: {name: 'Đã hoàn thành', value: 2},
  Cancelled: {name: 'Đã huỷ', value: 3},
};
