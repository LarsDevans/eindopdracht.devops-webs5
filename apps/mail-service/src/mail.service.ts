import { Injectable } from '@nestjs/common';

import { getWelcomeTemplate } from './templates/welcome.template';

@Injectable()
export class MailService {
  dispatchWelcomeEmail(email: string) {
    const { subject, body } = getWelcomeTemplate();
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
