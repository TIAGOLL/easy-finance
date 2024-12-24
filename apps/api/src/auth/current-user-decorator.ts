import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import type { UserPayload } from './jwt.strategy';

export const CurrentUser = createParamDecorator((_: never, context: ExecutionContext) => {
	const { user } = context.switchToHttp().getRequest();

	return user as UserPayload;
});
