import { ClockController } from './clock.controller';
import { ClockService } from './clock.service';

describe('ClockController', () => {
  let clockController: ClockController;

  beforeEach(() => {
    clockController = new ClockController({} as ClockService);
  });

  it('should correctly calculate deadline time in UTC', () => {
    const mockNow = new Date('2025-01-01T00:00:00Z');
    const durationHours = 5;

    jest.useFakeTimers().setSystemTime(mockNow);

    const deadline = clockController.calculateDeadlineTimeUtc(durationHours);

    expect(deadline.toISOString()).toBe(
      new Date(mockNow.getTime() + durationHours * 3600 * 1000).toISOString(),
    );

    jest.useRealTimers();
  });
});
