import { Test, TestingModule } from '@nestjs/testing';

import { TargetController } from './target.controller';
import { TargetService } from './target.service';

describe('TargetController', () => {
  let targetController: TargetController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TargetController],
      providers: [TargetService],
    }).compile();

    targetController = app.get<TargetController>(TargetController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(targetController.getHello()).toBe('Hello World!');
    });
  });
});
