// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
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

  const discounts = input.cart.lines.map(line => ({
    targets: [{ cartLine: { id: line.id } }],
    value: { percentage: { value: line.attribute?.value } },
  }));

  return {
    discounts,
    discountApplicationStrategy: DiscountApplicationStrategy.All,
  };
}