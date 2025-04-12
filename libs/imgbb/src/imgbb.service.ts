import axios from 'axios';

export class ImageUploadService {
  private readonly apiKey = process.env.IMGBB_API_KEY;
  private readonly apiUrl = process.env.IMGBB_API_URL;

  async uploadBase64Image(base64: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('image', base64);

      const res = await axios.post(this.apiUrl, formData, {
        params: {
          key: this.apiKey,
        },
      });

      return res.data.data.url;
    } catch (error) {
      console.error('Failed to upload image to ImgBB:', error);
      throw new Error('Image upload failed');
    }
  }
}
