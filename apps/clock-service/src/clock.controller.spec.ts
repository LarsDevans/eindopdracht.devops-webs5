import { Test, TestingModule } from '@nestjs/testing';
import { ClockController } from './clock.controller';
import { ClockService } from './clock.service';

describe('ClockController', () => {
  let clockController: ClockController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClockController],
      providers: [ClockService],
    }).compile();

    clockController = app.get<ClockController>(ClockController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(clockController.getHello()).toBe('Hello World!');
    });
  });
});
