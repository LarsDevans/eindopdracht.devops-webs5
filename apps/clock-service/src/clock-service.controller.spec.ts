import { Test, TestingModule } from '@nestjs/testing';
import { ClockServiceController } from './clock-service.controller';
import { ClockServiceService } from './clock-service.service';

describe('ClockServiceController', () => {
  let clockServiceController: ClockServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClockServiceController],
      providers: [ClockServiceService],
    }).compile();

    clockServiceController = app.get<ClockServiceController>(
      ClockServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(clockServiceController.getHello()).toBe('Hello World!');
    });
  });
});
