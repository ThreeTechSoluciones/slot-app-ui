import { Buffer } from 'buffer';

export const encryptToBase64 = (toEncrypt: string) => Buffer.from(toEncrypt).toString('base64');