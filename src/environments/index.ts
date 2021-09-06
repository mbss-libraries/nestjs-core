import * as dotenv from 'dotenv';
dotenv.config();

export * from './server.environment';
export * from './database.environment';
export * from './logger.environment';
export * from './authentication.environment';
export * from './cors.environment';
// environment

// author
// const AUTHOR: string = process.env.AUTHOR || 'Sven Stiels'

// application

// export const END_POINT: string = process.env.END_POINT || 'graphql'
// export const VOYAGER: string = process.env.VOYAGER || 'voyager'
// TODO: Find out what FE_URL is?
// export const FE_URL: string = process.env.FE_URL || 'xxx'
// export const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 3

// static
// const STATIC: string = process.env.STATIC || 'static'

// mlab
// const MLAB_USER = process.env.MLAB_USER || 'admin'
// const MLAB_PASS = process.env.MLAB_PASS || 'chnirt1803'
// const MLAB_HOST = process.env.MLAB_HOST || 'cluster0.eoxxs.mongodb.net'
// const MLAB_PORT = +process.env.MLAB_PORT || 47420
// const MLAB_DATABASE = process.env.MLAB_DATABASE || 'nestjs-v7'
// const MLAB_URL =
// 	process.env.MLAB_URL ||
// 	`mongodb+srv://${MLAB_USER}:${MLAB_PASS}@${MLAB_HOST}/${MLAB_DATABASE}?retryWrites=true&w=majority`

// database - postgres

// jsonwebtoken
// export const ISSUER: string = process.env.ISSUER || 'Fire - Apps'
// export const AUDIENCE: string = process.env.AUDIENCE || 'http://github.com'
// export const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'access-token'
// export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || 'access-token-key'
// const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN || 'refresh-token'
// export const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-key'
// const EMAIL_TOKEN: string = process.env.EMAIL_TOKEN || 'email-token'
// export const EMAIL_TOKEN_SECRET: string = process.env.EMAIL_TOKEN_SECRET || 'email-token-key'
// const RESETPASS_TOKEN: string = process.env.RESETPASS_TOKEN || 'resetpass-token'
// export const RESETPASS_TOKEN_SECRET: string = process.env.RESETPASS_TOKEN_SECRET || 'resetpass-token-key'

// bcrypt

// nodemailer
// const NODEMAILER_USER: string = process.env.NODEMAILER_USER || 'xxx'
// const NODEMAILER_PASS: string = process.env.NODEMAILER_PASS || 'xxx'

// cloudinary
// const CLOUDINARY_NAME: string = process.env.CLOUDINARY_NAME || 'chnirt'
// const CLOUDINARY_API_KEY: string =
// 	process.env.CLOUDINARY_API_KEY || '475584948229723'
// const CLOUDINARY_API_SECRET: string =
// 	process.env.CLOUDINARY_API_SECRET || 'Duno2be58mE2lCFLcuOssGKG54c'

// pubsub
// const NOTIFICATION_SUBSCRIPTION = 'newNotification'
// const USER_SUBSCRIPTION = 'newUser'
// const MESSAGES_SUBSCRIPTION = 'newMessages'

// passport
// const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || 'xxx'
// const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || 'xxx'
// const GOOGLE_CALLBACK_URL: string =
// 	process.env.GOOGLE_CALLBACK_URL || 'auth/google/callback'

// const FACEBOOK_APP_ID: string = process.env.FACEBOOK_APP_ID || 'xxx'
// const FACEBOOK_APP_SECRET: string = process.env.FACEBOOK_APP_SECRET || 'xxx'
// const FACEBOOK_CALLBACK_URL: string =
// 	process.env.FACEBOOK_CALLBACK_URL || 'auth/facebook/callback'

// google cloud
// const GOOGLE_APPLICATION_CREDENTIALS: string =
// 	process.env.GOOGLE_APPLICATION_CREDENTIALS || 'xxx'

// stripe
// const STRIPE_PUBLIC_KEY: string = process.env.STRIPE_PUBLIC_KEY || 'xxx'
// const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || 'xxx'
// const STRIPE_PLAN: string = process.env.STRIPE_PLAN || 'xxx'
