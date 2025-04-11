import { Injectable } from '@nestjs/common';

import { getWelcomeTemplate } from './templates/welcome.template';
import { getTargetCreatedTemplate } from './templates/target-created.template';
import { getTargetCompletedTemplate } from './templates/target-completed.template';

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
