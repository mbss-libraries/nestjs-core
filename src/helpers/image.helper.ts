import sharp from 'sharp';
import fs from 'fs';
import { strRandom } from './helper.helper';

const storagePath = `${__dirname}/../../storage/medialibrary/`;

export const saveCompressImage = async (
	file: Buffer,
	filename: string,
	options: sharp.JpegOptions = { quality: 50 },
): Promise<string> => {
	await sharp(file).jpeg(options).toFile(`${storagePath}/${filename}.jpeg`);
	return `${filename}.jpeg`;
};

export const saveFile = async (id: string, image: string): Promise<string> => {
	const file = fs.readFileSync(`${image}`);
	const filename = `${id}_${strRandom(32)}`;
	return await saveCompressImage(file, filename);
};
