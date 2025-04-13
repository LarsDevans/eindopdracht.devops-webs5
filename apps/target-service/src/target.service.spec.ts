import { ImageUploadService } from '@app/imgbb';
import { CreateTargetDto } from '@app/types';
import { TargetService } from './target.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Target } from './entities/target.entity';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('TargetService', () => {
  let targetService: TargetService;
  let targetRepository: Repository<Target>;
  let imgbbService: ImageUploadService;

  beforeEach(() => {
    targetRepository = {
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Target>;

    imgbbService = {
      uploadBase64Image: jest.fn(),
    } as unknown as ImageUploadService;

    targetService = new TargetService(targetRepository, imgbbService);
  });

  it('should successfully create a target', async () => {
    const createTargetDto: CreateTargetDto = {
      imageBuffer: 'base64image',
      durationHours: 24,
      nearbyLatitude: '37.7749',
      nearbyLongitude: '-122.4194',
      radiusMeters: 100,
      ownerUuid: 'owner-uuid',
    };

    const imageUrl = 'https://imgbb.com/12345';
    const targetUuid = 'target-uuid';

    (uuidv4 as jest.Mock).mockReturnValue(targetUuid);
    (imgbbService.uploadBase64Image as jest.Mock).mockResolvedValue(imageUrl);

    const target = {
      uuid: targetUuid,
      imageUrl,
      durationHours: createTargetDto.durationHours,
      nearbyLatitude: createTargetDto.nearbyLatitude,
      nearbyLongitude: createTargetDto.nearbyLongitude,
      radiusMeters: createTargetDto.radiusMeters,
      ownerUuid: createTargetDto.ownerUuid,
    };

    (targetRepository.create as jest.Mock).mockReturnValue(target);
    (targetRepository.save as jest.Mock).mockResolvedValue(target);

    const result = await targetService.create(createTargetDto);

    expect(imgbbService.uploadBase64Image).toHaveBeenCalledWith(
      createTargetDto.imageBuffer,
    );
    expect(targetRepository.create).toHaveBeenCalledWith({
      uuid: targetUuid,
      imageUrl,
      durationHours: createTargetDto.durationHours,
      nearbyLatitude: createTargetDto.nearbyLatitude,
      nearbyLongitude: createTargetDto.nearbyLongitude,
      radiusMeters: createTargetDto.radiusMeters,
      ownerUuid: createTargetDto.ownerUuid,
    });
    expect(targetRepository.save).toHaveBeenCalledWith(target);
    expect(result).toEqual({
      success: true,
      reason: `Target ${targetUuid} successfully created.`,
      data: target,
    });
  });

  it('should throw an error if image upload fails', async () => {
    const createTargetDto: CreateTargetDto = {
      imageBuffer: 'base64image',
      durationHours: 24,
      nearbyLatitude: '37.7749',
      nearbyLongitude: '-122.4194',
      radiusMeters: 100,
      ownerUuid: 'owner-uuid',
    };

    (imgbbService.uploadBase64Image as jest.Mock).mockRejectedValue(
      new Error('Image upload failed'),
    );

    await expect(targetService.create(createTargetDto)).rejects.toThrow(
      'Image upload failed',
    );
  });
});
