export const getTargetCompletedTemplate = (targetUuid: string) => {
  const subject = `🎯 Your target has been completed! Deadline Reached`;
  const body = `
    Hi there 👋,

    Your target has been completed, the deadline has been reached.

    You can view all the details here: 
    https://snapmatch.com/target/${targetUuid}

    Thank you for being part of Snapmatch! If you have any questions or need further assistance, feel free to reach out.

    Cheers,
    The Team
  `;
  return { subject, body };
};
