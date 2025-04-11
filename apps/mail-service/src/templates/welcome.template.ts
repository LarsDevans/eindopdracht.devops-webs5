export const getWelcomeTemplate = () => {
  const subject = `🎉 Welcome to Snapmatch!`;
  const body = `
    Hi there 👋,

    We're excited to have you on board.

    Feel free to explore and reach out if you need anything!

    Cheers,
    The Team
  `;
  return { subject, body };
};
