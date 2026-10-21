import { TRPCMutationSchema, UserAddressFormSchema } from '@mns/utils';
import { protectedProcedure, router } from '../trpc/trpc.js';
import db from '../db/index.js';
import { TRPCError } from '@trpc/server';
import { AddressTable } from '../db/schema/addresses.schema.js';

export const addressRouter = router({
  getById: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.user;

    try {
      const address = await db.query.AddressTable.findFirst({
        columns: {
          address1: true,
          address2: true,
          state: true,
          zip: true,
          country: true,
          city: true,
        },
        where: { userId: id },
      });

      if (!address) {
        return {
          success: true,
          message: 'Address not set yet',
        };
      }

      return {
        success: true,
        data: address,
      };
    } catch (error) {
      console.error('addressRouter.getById error', error);

      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Unable to get the user address',
      });
    }
  }),

  upsertAddress: protectedProcedure
    .input(UserAddressFormSchema)
    .output(TRPCMutationSchema)
    .mutation(async ({ input, ctx }) => {
      const { address1, address2, city, state, zip, country } = input;

      const { id } = ctx.user;

      try {
        const [address] = await db
          .insert(AddressTable)
          .values({
            userId: id,
            address1,
            address2,
            city,
            state,
            zip,
            country,
          })
          .onConflictDoUpdate({
            target: AddressTable.userId,
            set: {
              address1,
              address2,
              city,
              state,
              zip,
              country,
              updatedAt: new Date(),
            },
          })
          .returning({ id: AddressTable.id });

        if (!address) {
          console.error('address.upsertAddress error', address);
          return {
            success: false,
            message: '',
          };
        }

        return {
          success: true,
          message: 'Address updated successfully!',
        };
      } catch (error) {
        console.error('addressRouter.upsertAddress error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),
});
