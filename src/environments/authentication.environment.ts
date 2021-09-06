export const BCRYPT_SALT: number = +(process.env.BCRYPT_SALT || 10);

//* ---------- JWT - Token ----------
export const ISSUER: string = process.env.ISSUER || 'fire-apps';
export const AUDIENCE: string = process.env.AUDIENCE || 'http://github.com';

export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || 'access-token-key';
export const ACCESS_TOKEN_EXPIRES_IN: string = process.env.ACCESS_TOKEN_EXPIRES_IN || '30d';

export const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-key';
export const REFRESH_TOKEN_EXPIRES_IN: string = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

export const EMAIL_TOKEN_SECRET: string = process.env.EMAIL_TOKEN_SECRET || 'email-token-key';
export const EMAIL_TOKEN_EXPIRES_IN: string = process.env.EMAIL_TOKEN_EXPIRES_IN || '1d';

export const RESETPASS_TOKEN_SECRET: string = process.env.RESETPASS_TOKEN_SECRET || 'resetpass-token-key';
export const RESETPASS_TOKEN_EXPIRES_IN: string = process.env.RESETPASS_TOKEN_EXPIRES_IN || '1d';

//* ---------- TOKENS ----------
export const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || 'xxx';
export const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || 'xxx';
