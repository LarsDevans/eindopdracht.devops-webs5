export const getNewSubmissionTemplate = (
  targetUuid: string,
  submissionUuid: string,
) => {
  const subject = `📬 Your Snapmatch target has a new submission!`;
  const body = `
    Hi there 👋,

    A new submission has been added to your target. You can view it here:
    https://snapmatch.com/target/${targetUuid}/submission/${submissionUuid}

    Cheers,  
    The Team
  `;
  return { subject, body };
};
