const parseNumber = (number, defaultValue, minValue = 1, maxValue = null) => {
  if (typeof number !== 'string') return defaultValue;

  const parsedNumber = parseInt(number, 10);

  if (isNaN(parsedNumber) || parsedNumber < minValue) {
    return defaultValue;
  }

  return maxValue ? Math.min(parsedNumber, maxValue) : parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1, 1);
  const parsedPerPage = parseNumber(perPage, 10, 1, 100);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
