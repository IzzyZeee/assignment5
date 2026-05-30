const CURRENT_YEAR = 2026;

export const getPrice = (year: number) => {
    let base = 19.99;
    let min = 4.99;
    let price = CURRENT_YEAR - year;
    return base - price < min ? min : (base - price).toFixed(2);
}

export const getYear = (release: string) => {
    return Number(release.substring(0, 4));
}