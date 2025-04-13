import { MailService } from './mail.service';

jest.mock('./templates/welcome.template.ts', () => ({
  getWelcomeTemplate: jest.fn().mockReturnValue({
    subject: 'Welcome to Snapmatch!',
    body: 'Thank you for joining us. We are glad to have you!',
  }),
}));

describe('MailService', () => {
  let mailService: MailService;

  beforeEach(() => {
    mailService = new MailService();
    jest.spyOn(mailService, 'dispatch');
  });

  it('should dispatch a welcome email with the correct subject and body', () => {
    const email = 'user@example.com';

    mailService.dispatchWelcomeEmail(email);

    expect(mailService.dispatch).toHaveBeenCalledWith(
      [email],
      'Welcome to Snapmatch!',
      'Thank you for joining us. We are glad to have you!',
    );
  });

  it('should call dispatch with a single email in the list', () => {
    const email = 'user@example.com';

    mailService.dispatchWelcomeEmail(email);

    expect(mailService.dispatch).toHaveBeenCalledWith(
      [email],
      expect.any(String),
      expect.any(String),
    );
  });
});
