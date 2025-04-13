import { ImageUploadService } from '@app/imgbb';
import { Submission } from './entities/submission.entity';
import { SubmissionService } from './submission.service';
import { Repository } from 'typeorm';

describe('SubmissionService', () => {
  let submissionService: SubmissionService;
  let submissionRepository: Repository<Submission>;
  let imgbbService: ImageUploadService;

  beforeEach(() => {
    submissionRepository = {
      delete: jest.fn(),
    } as unknown as Repository<Submission>;

    imgbbService = {} as ImageUploadService;

    submissionService = new SubmissionService(
      submissionRepository,
      imgbbService,
    );
  });

  it('should remove the submission and return the correct result', async () => {
    const uuid = 'some-uuid';

    (submissionRepository.delete as jest.Mock).mockResolvedValue(undefined);
    const result = await submissionService.remove(uuid);

    expect(submissionRepository.delete).toHaveBeenCalledWith({ uuid });
    expect(result).toEqual({
      success: true,
      reason: `Submission ${uuid} successfully removed.`,
      data: null,
    });
  });

  it('should throw an error if the repository deletion fails', async () => {
    const uuid = 'some-uuid';

    (submissionRepository.delete as jest.Mock).mockRejectedValue(
      new Error('Database error'),
    );
    await expect(submissionService.remove(uuid)).rejects.toThrow(
      'Database error',
    );
  });
});
