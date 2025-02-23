import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEvnVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEvnVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEvnVar(CLOUDINARY.API_KEY),
  api_secret: getEvnVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
