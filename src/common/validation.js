const validation = {
    firstName: {
      presence: {
        message: '^Vui lòng nhập họ và tên đệm'
      }
    },
    lastName: {
      presence: {
        message: '^Vui lòng nhập tên'
      }
    },
    clinic: {
      presence: {
        message: '^Vui lòng nhập tên phòng khám'
      }
    },
    phoneNumber: {
      presence: {
        message: '^Vui lòng nhập số điện thoại',
      },
      format: {
        pattern: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$',
        message: '^Số điện thoại không hợp lệ'
      }
    },
    email: {
      presence: {
        message: '^Vui lòng nhập địa chỉ email',
      },
      email: {
        message: '^Địa chỉ email không hợp lệ',
      },
    },
    password: {
      presence: {
        message: '^Vui lòng nhập mật khẩu',
      },
      length: {
        minimum: 5,
        message: '^Mật khẩu tối thiểu 6 kí tự',
      },
    },
    verifyCode: {
      presence: {
        message: '^Vui lòng nhập mã xác thực',
      },
      format: {
        pattern: '^[0-9]{6}$',
        message: '^Vui lòng nhập mã xác thực gồm 6 số'
      }
    },
    review: {
      presence: {
        message: '^Vui lòng nhập nhận xét của bạn',
      }
    },
    checkingServiceName: {
      presence: {
        message: '^Vui lòng nhập tên dịch vụ khám',
      }
    },
    checkingServiceDuration: {
      presence: {
        message: '^Vui lòng nhập thời gian dịch vụ',
      },
      numericality: {
        greaterThan: 0,
        onlyInteger: true,
        notValid: '^Thời gian dịch vụ không hợp lệ'
      }
    }, 
    checkingServicePrice: {
      presence: {
        message: '^Vui lòng nhập giá dịch vụ',
      },
      numericality: {
        greaterThanOrEqualTo: 0,
        onlyInteger: true,
        notValid: '^Giá dịch vụ không hợp lệ'
      }
    }
  };
  
  export default validation;
  