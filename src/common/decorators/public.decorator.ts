import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
//👉 This attaches the metadata { isPublic: true } to the route.
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
