import { Test, TestingModule } from '@nestjs/testing';
import { TargetServiceController } from './target-service.controller';
import { TargetServiceService } from './target-service.service';

describe('TargetServiceController', () => {
  let targetServiceController: TargetServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TargetServiceController],
      providers: [TargetServiceService],
    }).compile();

    targetServiceController = app.get<TargetServiceController>(
      TargetServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(targetServiceController.getHello()).toBe('Hello World!');
    });
  });
});
