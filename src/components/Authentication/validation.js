const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const validateEmail = value =>
  value
    ? validEmailRegex.test(value)
      ? ""
      : "Wrong format! You have to use test@gmail.com."
    : "E-mail is required.";

export const validateUserName = value => (value ? "" : "Username is required.");

export const validateListName = value => (value ? "" : "List name is required.");

export const validatePassword = value => (value ? "" : "Password is required.");

export const validateTitle = value => (value ? "" : "Title is reuqired.");

export const validateDate = value => (value ? "" : "Date is required.");

export const validateImportance = value =>
  value ? "" : "Importance is required.";
  
export const validateDescription = value =>
value ? value.length > 200 ? "Description is limited to 200 characters." : "" : "Description is required.";

