import moment from "moment";

export class DateTime {
    
    static toUnixTimestamp(date) {
        return moment(date).unix();
    }

    static toUnixTimestamp(date, format) {
        return moment(date, format).unix();
    }

    static toDateString(date, format = 'YYYYMMDDHHmm') {
        return moment(date).format(format);
    }
}