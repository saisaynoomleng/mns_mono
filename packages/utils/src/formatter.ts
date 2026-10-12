/**
 * Convert a string to Title Case
 * @param input string
 * @returns string
 * @example toTitleCase('hello there'); // 'Hello There'
 */
export const toTitleCase = (input: string): string => {
  return input
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Replace every dash in a string with replacement, defaults to whitespace
 * @param input string
 * @param replacement string
 * @returns string
 * @example replaceDash('hello-there'); // 'hello there'
 * @example replaceDash('hello-there', 'A'); // 'helloAthere'
 */
export const replaceDash = (input: string, replacement = ' '): string => {
  return input.trim().replace(/-+/g, replacement);
};

/**
 * Replace every underscore in a string with replacement, defaults to whitespace
 * @param input string
 * @param replacement string
 * @returns string
 * @example replaceUnderscore('hello_there'); // 'hello there'
 */
export const replaceUnderscore = (input: string, replacement = ' '): string => {
  return input.trim().replace(/_+/g, replacement);
};

/**
 * Replace every whitespace in a string with replacement, defaults to '-'
 * @param input string
 * @param replacement string
 * @returns string
 * @example repalceWhitespace('hello there'); // 'hello-there'
 */
export const replaceWhitespace = (input: string, replacement = '-'): string => {
  return input.trim().replace(/\s+/g, replacement);
};

/**
 * Convert a string into URL-friendly slug
 * @param input string
 * @returns string
 */
export const slugify = (input: string): string => {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\s-]/g, '')
    .replace(/-+/g, '-')
    .slice(0, 200);
};

/**
 * Convert Date into US Date Format
 * @param date Date | string
 * @returns string
 */
export const formatDateUS = (date: Date | string): string => {
  const parsedDate = new Date(date);

  if (!parsedDate.getTime()) {
    return 'Not a valid date';
  }

  return Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
};

/**
 * Convert Date&Time into US Date Time format
 * @param date Date | string
 * @returns string
 */
export const formatDateTimeUS = (date: Date | string): string => {
  const parsedDate = new Date(date);

  if (!parsedDate.getTime()) {
    return 'Not a valid date';
  }

  return Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(parsedDate);
};

/**
 * Get a full year from a given date
 * @param date Date | string
 * @returns string
 */
export const getFormattedYear = (date: Date | string): string => {
  const parsedDate = new Date(date);

  if (!parsedDate.getTime()) {
    return 'Not a valid date';
  }

  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
  }).format(parsedDate);
};

/**
 * Check whether the image's size is larger than the specified size, defaults to 1MB
 * @param size number
 * @param maxSize number
 * @returns boolean
 */
export const isImageTooLarge = (size: number, maxSize = 1): boolean => {
  if (size > maxSize * 1024 * 1024) return true;

  return false;
};

/**
 * Extract image file type from MIME type
 * @param type string
 * @returns string
 */
export const getImageExtension = (type: string): string => {
  const [, ext] = type.split('/');

  return ext?.toUpperCase() ?? '';
};

export const formatImageSize = (size: number): string => {
  if (size >= 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }

  if (size >= 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }

  return `${size} B`;
};

/**
 * Convert a number into USD currency
 * @param price number
 * @returns string
 */
export const formatPriceInUSD = (price: number): string => {
  return Intl.NumberFormat('en-US', {
    currency: 'usd',
    style: 'currency',
  }).format(price);
};

/**
 * Convert a price in cents to dollar
 * @param price number
 * @returns string
 */
export const formatPriceInCentsToUSD = (price: number): string => {
  const parsedPrice = price / 100;

  return Intl.NumberFormat('en-US', {
    currency: 'usd',
    style: 'currency',
  }).format(parsedPrice);
};
