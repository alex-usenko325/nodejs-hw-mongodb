const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

const parseContactType = (type) =>
  ['work', 'home', 'personal'].includes(type) ? type : undefined;

export const parseFilterParams = (query) => {
  const { name, email, phoneNumber, isFavourite, contactType } = query;

  const parsedName =
    typeof name === 'string' && name.length >= 3 && name.length <= 20
      ? name
      : undefined;
  const parsedEmail = typeof email === 'string' ? email : undefined;
  const parsedPhoneNumber =
    typeof phoneNumber === 'string' ? phoneNumber : undefined;
  const parsedIsFavourite = parseBoolean(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    name: parsedName,
    email: parsedEmail,
    phoneNumber: parsedPhoneNumber,
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
