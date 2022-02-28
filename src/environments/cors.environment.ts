import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
	origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://localhost:3000'],
	credentials: true,
};
