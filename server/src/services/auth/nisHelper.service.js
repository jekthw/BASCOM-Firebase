// utils/nisHelper.js
import { ValidationError } from "../../utils/validationError.js";

export const getAngkatanFromNis = (nis) => {
  if (!nis || nis.length < 6) {
    throw new ValidationError().addError("NIS is required and must have at least 6 digits");
  }

  const yy = parseInt(nis.slice(0, 2), 10);
  const currentYear = new Date().getFullYear();
  const year = 2000 + yy;

  if (year > currentYear) {
    throw new ValidationError().addError("Invalid NIS: angkatan out of range");
  }

  return year.toString();
};
