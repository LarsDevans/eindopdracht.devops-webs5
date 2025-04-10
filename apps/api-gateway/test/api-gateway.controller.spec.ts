import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from '../src/controllers/app.controller';
import { ApiGatewayService } from '../src/services/app.service';

describe('ApiGatewayController', () => {
  let apiGatewayController: ApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiGatewayController],
      providers: [ApiGatewayService],
    }).compile();

    apiGatewayController = app.get<ApiGatewayController>(ApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiGatewayController.getData()).toEqual({
        success: true,
        data: 'Hello World!',
      });
    });
  });
});
