export const queryKeys = {
  newsletters: {
    all: ['newsletters'] as const,
    byId: (id: string) => ['newsletters', id] as const,
  },
};
