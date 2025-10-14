import { passwordRegex } from "../../utils/passwordHandler.js";
import { ValidationError } from "../../utils/validationError.js";

export const validateRegisterInput = (body) => {
  const { name, password, email, nis, motherName, birthDate } = body;
  const errors = new ValidationError();

  if (!name) errors.addError("name is required");
  if (!password) errors.addError("Password is required");
  if (!email) errors.addError("Email is required");
  if (!nis) errors.addError("NIS is required");
  if (!motherName) errors.addError("Mother name is required");
  if (!birthDate) errors.addError("Birth date is required");

  // date format
  const birthDateObj = new Date(birthDate);
  if (birthDate && isNaN(birthDateObj.getTime())) {
    errors.addError("Invalid birth date format");
    errors.addError("birthDate must be a valid date string (YYYY-MM-DD)");
  }

  // password format
  const pwdErrors = passwordRegex(password);
  if (pwdErrors.length) {
    pwdErrors.forEach(err => errors.addError(err));
    errors.message = "Bad Password";
    errors.statusCode = 400;
  }

  if (errors.hasErrors()) throw errors;
  return birthDateObj;
};
