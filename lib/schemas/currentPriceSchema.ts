import { z } from "zod";

export const currentPriceSchema = z.string().refine( ( value ) => {
  return /(^\d+(\.\d{1,2})?$)|(^\d+?$)|(^\d+[\.\,]?$)/.test( value );
}, {
  message : 'Invalid decimal number. Only numbers with up to two decimal places are allowed.',
} ).nullable();