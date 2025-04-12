export interface ImaggaConfig {
  apiKey: string;
  apiSecret: string;
  endpoint: string;
  categorizer: string;
  indexName: string;
}

export const imaggaConfig: ImaggaConfig = {
  apiKey: process.env.IMAGGA_API_KEY,
  apiSecret: process.env.IMAGGA_API_SECRET,
  endpoint: process.env.IMAGGA_API_ENDPOINT,
  categorizer: process.env.IMAGGA_CATEGORIZER,
  indexName: process.env.IMAGGA_INDEX_NAME,
};
