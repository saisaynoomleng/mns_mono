import {
  formatDateTimeUS,
  formatDateUS,
  formatPriceInCentsToUSD,
  formatPriceInUSD,
  getFormattedYear,
  getImageExtension,
  isImageTooLarge,
  replaceDash,
  replaceUnderscore,
  slugify,
  toTitleCase,
} from '../src/formatter.js';

describe('toTitleCase', () => {
  it('should convert a string into title case', () => {
    expect(toTitleCase('hello there')).toBe('Hello There');
    expect(toTitleCase('          hello             there')).toBe(
      'Hello There',
    );
  });
});

describe('replaceDash', () => {
  it('should replace a dash with whitespace', () => {
    expect(replaceDash('hello-there')).toBe('hello there');
  });
  it('should replace a dash with $', () => {
    expect(replaceDash('hello-there', '$')).toBe('hello$there');
  });
});

describe('replaceUnderscore', () => {
  it('should replace underscore with whitespace', () => {
    expect(replaceUnderscore('hello_there')).toBe('hello there');
  });
  it('should replace underscore with $', () => {
    expect(replaceUnderscore('hello_there', '$')).toBe('hello$there');
  });
});

describe('slugify', () => {
  it('should slugify a string', () => {
    expect(slugify('Hello There')).toBe('hello-there');
  });
});

describe('formatDateUS', () => {
  it('should convert a date into US Date format', () => {
    expect(formatDateUS('2026/10/06')).toBe('Oct 6, 2026');
  });
  it('should return an error for invalid date', () => {
    expect(formatDateUS('this is not a date')).toBe('Not a valid date');
  });
});

describe('formatDateTimeUS', () => {
  it('should convert a date into US Date Time format', () => {
    expect(formatDateTimeUS('2026/10/06')).toBe('Oct 6, 2026, 12:00:00 AM');
  });
  it('should return an error for invalid date', () => {
    expect(formatDateTimeUS('this is not a date')).toBe('Not a valid date');
  });
});

describe('getFormattedYear', () => {
  it('should get a full year of a given date', () => {
    expect(getFormattedYear('2026/10/06')).toBe('2026');
  });
  it('should return an error for invalid date', () => {
    expect(getFormattedYear('this is not a date')).toBe('Not a valid date');
  });
});

describe('isImageTooLarge', () => {
  it('should error if the image is large', () => {
    expect(isImageTooLarge(10000000, 1)).toBe(true);
  });
  it('should not error if the image is small', () => {
    expect(isImageTooLarge(100, 1)).toBe(false);
  });
});

describe('getImageExtension', () => {
  it('should extract iamge from the MIME type', () => {
    expect(getImageExtension('image/png')).toBe('PNG');
  });
  it('should not extract any MIME type', () => {
    expect(getImageExtension('not an image')).toBe('');
  });
});

describe('formatPriceInUSD', () => {
  it('should format the USD currency', () => {
    expect(formatPriceInUSD(1000)).toBe('$1,000.00');
  });
});

describe('formatPriceInCentsToUSD', () => {
  it('should format the USD currency', () => {
    expect(formatPriceInCentsToUSD(9999)).toBe('$99.99');
  });
});
