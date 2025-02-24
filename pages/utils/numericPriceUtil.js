// utils/priceUtils.js
export function getNumericPriceValue(priceString) {
    if (!priceString) return 0; // Handle empty or null input

    const numericValue = priceString.replace(/[^0-9.]/g, '').trim(); // Remove non-numeric characters except '.'
    return parseFloat(numericValue); // Convert to number
}

export function getNumericQuantityAndPriceValue(priceQuantityString) {
    if (!priceQuantityString) return 0; // Handle empty or null input

    const numericQuantityAndPriceArray = priceQuantityString.replace(/[^0-9. ]/g, '')
                        .replace(/\s+/g, ' ')
                        .trim().split(" "); // Remove non-numeric characters except '.'
    const quantity =  parseFloat(numericQuantityAndPriceArray[0]); // Convert to number
    const price =  parseFloat(numericQuantityAndPriceArray[1]); // Convert to number

    return {quantity,price};
}
