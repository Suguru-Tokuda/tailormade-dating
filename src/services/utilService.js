/* Convert cm to feet & inches */
export const toFeet = (cm) => {
    const realFeet = ((cm * 0.393700) / 12);
    const feet = Math.floor(realFeet);
    const inches = Math.round((((realFeet - feet) * 12) * 100) / 100);
    return `${feet}'${inches}"`;
};

export const shortenStr = (str, len) => {
    return `${str.substring(0, len)}...`;
}