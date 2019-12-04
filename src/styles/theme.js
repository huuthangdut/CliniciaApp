const searchFocus = require('../../assets/icons/ic_search_focus.png')
const search = require('../../assets/icons/ic_search.png')
const appointmentFocus = require('../../assets/icons/ic_appointment_focus.png')
const appointment = require('../../assets/icons/ic_appointment.png')
const notificationFocus = require('../../assets/icons/ic_notification_focus.png')
const notification = require('../../assets/icons/ic_notification.png')
const accountFocus = require('../../assets/icons/ic_account_focus.png')
const mapMarker = require('../../assets/icons/ic_marker.png');
const account = require('../../assets/icons/ic_account.png')
const lock = require('../../assets/icons/ic-lock.png')
const notificationSetting = require('../../assets/icons/ic-noticeSetting.png')
const hand = require('../../assets/icons/ic-hand.png')
const signOut = require('../../assets/icons/id-signout.png')
const backArrow = require('../../assets/icons/ic-back-arrow.png')
const filter = require('../../assets/icons/ic-filter.png')
const sort = require('../../assets/icons/ic-sort.png')
const star = require('../../assets/icons/ic-star.png')
const marker = require('../../assets/icons/ic-location.png')
const empty = require('../../assets/icons/ic_empty.png')

const tabIcons = {
    searchFocus, search, appointmentFocus, appointment, notificationFocus, notification,
    accountFocus, account, lock, notificationSetting, hand, signOut, backArrow, filter,
    sort, star, marker
};

const icons = {
    mapMarker,
    empty
}


const theme = {
    colors: {
        primary: "#4486FF",
        secondary: '#4CD964',
        black: "black",
        white: "white",
        transparent: "transparent",
        darkGray: '#666666',
        gray: "#8A8A8F",
        lightGray: "#EFEFF4",
        red: '#FF3B30',
        favorite: {
            backgroundGray: '#F9F9F9',
            borderHeartIcon: '#D8D8D8'
        }
    },
    typography: {
        body: {
            fontSize: 17,
            lineHeight: 20,
            fontFamily: "SF-Pro-Text-Bold"
        },
        headline: {
            fontSize: 17,
            lineHeight: 22,
            fontFamily: "SF-Pro-Text-Semibold"
        },
        title1: {
            fontSize: 34,
            lineHeight: 41,
            fontFamily: "SF-Pro-Text-Bold"
        },
    },
    styles: {
        shadow: {
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 4},
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 9
        },
        shadow2: {
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 4},
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 5
        }
    },
    tabIcons,
    icons
}

export default theme;