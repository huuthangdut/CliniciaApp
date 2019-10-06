const searchFocus = require('../../assets/icons/ic_search_focus.png')
const search = require('../../assets/icons/ic_search.png')
const appointmentFocus = require('../../assets/icons/ic_appointment_focus.png')
const appointment = require('../../assets/icons/ic_appointment.png')
const notificationFocus = require('../../assets/icons/ic_notification_focus.png')
const notification = require('../../assets/icons/ic_notification.png')
const accountFocus = require('../../assets/icons/ic_account_focus.png')
const account = require('../../assets/icons/ic_account.png');

const tabIcons = {
    searchFocus,
    search,
    appointmentFocus,
    appointment,
    notificationFocus,
    notification,
    accountFocus,
    account
};


const theme = {
    colors: {
        primary: "#4486FF",
        black: "black",
        white: "white",
        transparent: "transparent",
        darkGray: '#666666',
        gray: "#8A8A8F",
        lightGray: "#EFEFF4",
        red: '#FF3B30'
    },
    typography: {

    },
    styles: {
        shadow: {
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 4},
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 9
        }
    },
    tabIcons
}

export default theme;