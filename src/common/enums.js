export const ApiErrorCode = {
	Failed: 'Failed'
}

export const AppErrorCode = {
	TokenError: 'TokenError',
	LoginError: 'LoginError'
}

export const AppointmentStatus = {
	Confirming: { name: "Đang chờ xác nhận", value: 0 },
	Confirmed: { name: "Đã xác nhận", value: 1 },
	Completed: { name: "Đã hoàn thành", value: 2 },
	Cancelled: { name: "Đã huỷ", value: 3 },
}