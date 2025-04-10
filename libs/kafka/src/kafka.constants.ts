export const KAFKA_CLIENT_NAME = process.env.KAFKA_CLIENT_NAME;
export const KAFKA_BROKERS = [
  `${process.env.SERVICE_KAFKA_SERVICE}:${process.env.KAFKA_PORT}`,
];
