export const truncateText = (str, n) =>
  str.length > n ? `${str.trim().substring(0, n)}...` : `${str.trim()}`;

export const capitalize = (s = "") =>
  s.length >= 1 ? s.charAt(0).toUpperCase() + s.slice(1) : "";

export const formatJoinedText = (str, separator = "-") => {
  return str
    .split(separator)
    .map((word) => capitalize(word))
    .join(" ");
};

export const addSuffixes = (length, suffixes = "s", alt) =>
  length > 1 ? suffixes : alt ?? "";

export const successText = ({ isDelete, isEdit }) =>
  `${isDelete ? "deleted" : isEdit ? "edited" : "created"} successfully`;

export const errorText = ({ isDelete, isEdit }) =>
  `Failed to ${isDelete ? "delete" : isEdit ? "edit" : "create new"}`;

export const joinFirstNameAndLastName = (first_name, last_name) =>
  `${returnPlaceHolderTxt(first_name)} ${returnPlaceHolderTxt(last_name)}`;

export const returnPlaceHolderTxt = (text, placeholder) =>
  text ?? placeholder ?? "-";
