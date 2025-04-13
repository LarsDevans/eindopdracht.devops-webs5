export const getSubmissionCreatedTemplate = (
  targetUuid: string,
  submissionUuid: string,
) => {
  const subject = `🎯 Your Snapmatch submission is received!`;
  const body = `
    Hi there 👋,

    Your submission has been successfully received. You can view it here:
    https://snapmatch.com/target/${targetUuid}/submission/${submissionUuid}

    Cheers,  
    The Team
  `;
  return { subject, body };
};
