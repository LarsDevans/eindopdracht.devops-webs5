export const getWinnerTemplate = (targetUuid: string, score: number) => {
  const subject = `🎯 Your Snapmatch submission is received!`;
  const body = `
    Hi there 👋,

    You are the winner of the target ${targetUuid} with a score of ${score}! Congratulations!

    Cheers,  
    The Team
  `;
  return { subject, body };
};
