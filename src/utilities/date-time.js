import moment from "moment";

export class DateTime {
    
    static toUnixTimestamp(date) {
        return moment(date).unix();
    }
}