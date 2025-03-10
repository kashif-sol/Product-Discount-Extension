// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Target} Target
 */

const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const discounts = [];

  input.cart.lines.forEach((line) => {
    // @ts-ignore
    const metafield = line.merchandise?.product?.metafield;
    if (metafield && metafield.value) {
      const discountValue = parseFloat(metafield.value);
      if (!isNaN(discountValue) && discountValue > 0) {
        discounts.push({
          targets: [{ cartLine: { id: line.id } }],
          value: { percentage: { value: discountValue.toString() } },
        });
      }
    }
  });

  if (discounts.length === 0) {
    console.error("No eligible products for discount.");
    return EMPTY_DISCOUNT;
  }

  return {
    discounts,
    discountApplicationStrategy: DiscountApplicationStrategy.All,
  };
}
