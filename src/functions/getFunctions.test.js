import getFunctions from './getFunctions';

describe('getFunctions.generateTimestamp', () => {
  it('should return the correct timestamp in UTC', () => {
    // Arrange: Set up a fixed date
    const mockedDate = new Date(Date.UTC(2023, 0, 15, 12, 30, 45)); // January 15, 2023, 12:30:45 UTC

    // Mock the Date constructor
    const OriginalDate = Date;
    global.Date = class extends OriginalDate {
      constructor(...args) {
        if (args.length === 0) {
          return mockedDate;
        }
        return new OriginalDate(...args);
      }
      static now() {
        return mockedDate.getTime();
      }
    };

    // Act: Call the function
    const timestamp = getFunctions.generateTimestamp();

    // Assert: Check the timestamp
    expect(timestamp).toBe('2023-01-15 12:30:45');

    // Clean up: Restore original Date
    global.Date = OriginalDate;
  });

  it('should correctly format single-digit values with leading zeros', () => {
    // Arrange: Set up a date with single-digit components
    const mockedDate = new Date(Date.UTC(2023, 2, 5, 4, 5, 6)); // March 5, 2023, 04:05:06 UTC

    // Mock the Date constructor
    const OriginalDate = Date;
    global.Date = class extends OriginalDate {
      constructor(...args) {
        if (args.length === 0) {
          return mockedDate;
        }
        return new OriginalDate(...args);
      }
      static now() {
        return mockedDate.getTime();
      }
    };

    // Act: Call the function
    const timestamp = getFunctions.generateTimestamp();

    // Assert: Check the timestamp
    expect(timestamp).toBe('2023-03-05 04:05:06');

    // Clean up: Restore original Date
    global.Date = OriginalDate;
  });
});
