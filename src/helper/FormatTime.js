const FormatTimeFromMili = mili => {
    let aestTime = new Date(mili).toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
    aestTime = new Date(aestTime);
    return aestTime.toLocaleString()
}

const FormatTime = {
    FormatTimeFromMili
}

export default FormatTime