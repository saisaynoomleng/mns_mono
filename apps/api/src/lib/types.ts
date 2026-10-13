import * as z from 'zod';
import type { auth } from './auth.js';

//========================//
//======Helper types======//
//========================//

export type BetterAuthSessionProps = typeof auth.$Infer.Session;
export type BetterAuthUserProps = typeof auth.$Infer.Session.user;
export type { AppRouter } from '../trpc/router.js';

//========================//
//====== Schema ==========//
//========================//
