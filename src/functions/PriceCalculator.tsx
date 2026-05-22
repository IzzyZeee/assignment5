import { CURRENT_YEAR } from "@/core/constants";

export const CalculatePrice = (year: number) => {
    let base = 19.99;
    let min = 4.99;
    let price = CURRENT_YEAR - year;
    return base - price < min ? min : base - price;
}