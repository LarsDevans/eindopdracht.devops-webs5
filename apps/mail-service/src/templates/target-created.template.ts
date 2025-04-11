export const getTargetCreatedTemplate = (targetUuid: string) => {
  const subject = `🎯 Your Snapmatch target is ready!`;
  const body = `
    Hi there 👋,

    Your target has been successfully created. You can view it here:
    https://snapmatch.com/target/${targetUuid}

    Cheers,  
    The Team
  `;
  return { subject, body };
};
