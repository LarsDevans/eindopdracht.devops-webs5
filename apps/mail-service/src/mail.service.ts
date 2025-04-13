import { Injectable } from '@nestjs/common';

import { getWelcomeTemplate } from './templates/welcome.template';
import { getTargetCreatedTemplate } from './templates/target-created.template';
import { getTargetCompletedTemplate } from './templates/target-completed.template';
import { getSubmissionCreatedTemplate } from './templates/submission-created.template';
import { getNewSubmissionTemplate } from './templates/new-target-submission.template';
import { getWinnerTemplate } from './templates/winner.template';

@Injectable()
export class MailService {
  dispatchWelcomeEmail(email: string) {
    const { subject, body } = getWelcomeTemplate();
    this.dispatch([email], subject, body);
  }

  dispatchTargetCreatedEmail(email: string, targetUuid: string) {
    const { subject, body } = getTargetCreatedTemplate(targetUuid);
    this.dispatch([email], subject, body);
  }

  dispatchTargetCompletedEmail(email: string, targetUuid: string) {
    const { subject, body } = getTargetCompletedTemplate(targetUuid);
    this.dispatch([email], subject, body);
  }

  dispatchSubmissionCreatedEmail(
    email: string,
    targetUuid: string,
    submissionUuid: string,
  ) {
    const { subject, body } = getSubmissionCreatedTemplate(
      targetUuid,
      submissionUuid,
    );
    this.dispatch([email], subject, body);
  }

  dispatchNewSubmissionEmail(
    email: string,
    targetUuid: string,
    submissionUuid: string,
  ) {
    const { subject, body } = getNewSubmissionTemplate(
      targetUuid,
      submissionUuid,
    );
    this.dispatch([email], subject, body);
  }

  dispatchWinnerEmail(email: string, targetUuid: string, score: number) {
    const { subject, body } = getWinnerTemplate(targetUuid, score);
    this.dispatch([email], subject, body);
  }

  dispatch(emailList: string[], subject: string, body: string) {
    console.log(`
  === FAKE EMAIL SENT ===
  To: ${emailList.join(', ')}
  Subject: ${subject}
  Body:
  ${body}
  ========================
    `);
  }
}
