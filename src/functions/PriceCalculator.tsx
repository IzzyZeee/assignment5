const CURRENT_YEAR = 2026;

export const calculatePrice = (year: number) => {
    let base = 19.99;
    let min = 4.99;
    let price = CURRENT_YEAR - year;
    return Number(base - price < min ? min : (base - price).toFixed(2));
}

export const getDisplayPrice = (price: number) => {
    return "$" + price;
}

export const getYear = (release: string) => {
    if (!release) return CURRENT_YEAR; // sometimes release date dont exist idk why
    return Number(release.substring(0, 4));
}