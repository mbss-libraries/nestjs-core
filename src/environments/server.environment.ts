export const NODE_ENV: string = process.env.NODE_ENV || 'development'
export const DOMAIN: string = process.env.DOMAIN || 'localhost'
export const PORT: number = +(process.env.PORT ?? 8000)

export const RATE_LIMIT_MAX: number = +(process.env.PORT ?? 10000)
