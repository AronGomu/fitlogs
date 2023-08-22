/** All functions related to forms setup and validation. */

/** Verify that the string/list exist and has at least n characters/elements. */
export function minLength(l: string | any[], n: number): boolean {
   if (!l) return false;
   if (l.length < n) return false;
   return true;
}

/** Checks if a number is between 0 and 100 (inclusive).
 * @param num - The number to check.
 * @returns `true` if the number is between 0 and 100 (inclusive), otherwise `false`. */
export function isBetweenZeroAnd100(num: number): boolean {
    return num >= 0 && num <= 100;
}

/**
 * Checks if a number is between 0 and 100 (inclusive).
 * @param num - The number to check.
 * @returns `true` if the number is between 0 and 100 (inclusive), otherwise `false`. */
export function isPercentage(num: number) {
    if (Number.isInteger(num) && isBetweenZeroAnd100(num)) return true;
    return false;
}