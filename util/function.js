export const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const convertFloatTo2Decimal = (value) => {
    return parseFloat(value).toFixed(2)
}
