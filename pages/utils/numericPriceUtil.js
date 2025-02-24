// utils/priceUtils.js
export function getNumericPriceValue(priceString) {
    if (!priceString) return 0; // Handle empty or null input

    const numericValue = priceString.replace(/[^0-9.]/g, '').trim(); // Remove non-numeric characters except '.'
    return parseFloat(numericValue); // Convert to number
}
