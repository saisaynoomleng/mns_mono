import { TRPCResponseSchema, UserAddressFormSchema } from '@mns/utils';
import { protectedProcedure, router } from '../trpc/trpc.js';
import db from '../db/index.js';
import { TRPCError } from '@trpc/server';
import { AddressTable } from '../db/schema/addresses.schema.js';
import { ListAddress } from '../lib/types.js';

export const addressRouter = router({
  get: protectedProcedure.output(ListAddress).query(async ({ ctx }) => {
    const { id } = ctx.user;

    try {
      const address = await db.query.AddressTable.findFirst({
        columns: {
          address1: true,
          address2: true,
          city: true,
          state: true,
          zip: true,
          country: true,
        },
        where: { userId: id },
      });

      if (!address) {
        return {
          address1: '',
          address2: '',
          city: '',
          state: '',
          country: '',
          zip: '',
        };
      }

      return {
        address1: address.address1 ?? '',
        address2: address.address2 ?? '',
        city: address.city ?? '',
        state: address.state ?? '',
        country: address.country ?? '',
        zip: address.zip ?? '',
      };
    } catch (error) {
      console.error('addressRouter.get error', error);

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),

  update: protectedProcedure
    .input(UserAddressFormSchema)
    .output(TRPCResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const { address1, address2, city, state, country, zip } = input;
      const { id } = ctx.user;

      try {
        const [address] = await db
          .insert(AddressTable)
          .values({
            address1,
            address2,
            city,
            state,
            country,
            zip,
            userId: id,
          })
          .onConflictDoUpdate({
            target: AddressTable.userId,
            set: {
              address1,
              address2,
              city,
              state,
              country,
              zip,
              updatedAt: new Date(),
            },
          })
          .returning({ id: AddressTable.id });

        if (!address) {
          return {
            success: false,
            message: 'Unable to update adress, try again.',
          };
        }

        return {
          success: true,
          message: 'Address updated successfully!',
        };
      } catch (error) {
        console.error('addressRouter.update error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),
});
