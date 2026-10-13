import type React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#components/ui/table';
import { Bounded, SectionTitle } from '../shared';

const fontSizes = {
  900: { rem: '5.5rem', px: '88px' },
  800: { rem: '4.25rem', px: '68px' },
  700: { rem: '3.5rem', px: '56px' },
  600: { rem: '2.25rem', px: '36px' },
  500: { rem: '1.75rem', px: '28px' },
  400: { rem: '1rem', px: '16px' },
  300: { rem: '0.875rem', px: '14px' },
  200: { rem: '0.5rem', px: '8px' },
};

export const Typography = (): React.JSX.Element => {
  return (
    <Bounded spacing="md">
      <div className="space-y-4">
        <SectionTitle>Typography</SectionTitle>

        <p>
          Typography establishes hierarchy, improves readability, and creates a
          consistent visual language across the interface. Our type scale is
          designed to balance clarity and personality, with each style serving a
          specific role within the system.
        </p>
        <p>
          From expressive display styles to compact labels and captions,
          typography adapts across layouts while maintaining consistent spacing,
          weight, and rhythm.
        </p>
      </div>

      <div className="space-y-4">
        <SectionTitle as="h3">Type Faces</SectionTitle>

        <div className="grid max-md:gap-y-4 md:grid-cols-3 justify-between gap-x-6 ">
          <div className="grid grid-cols-2 font-header p-6 items-center border-2 border-border rounded-lg">
            <p className="text-fs-600">Aa</p>
            <p className="font-extrabold">Fraunces</p>
          </div>

          <div className="grid grid-cols-2 font-body px-6 items-center border-2 border-border rounded-lg">
            <p className="text-fs-600">Aa</p>
            <p className="font-extrabold">Sora</p>
          </div>

          <div className="grid grid-cols-2 font-cursive px-6 items-center border-2 border-border rounded-lg">
            <p className="text-fs-600">Aa</p>
            <p className="font-extrabold">Playpen Sans</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SectionTitle as="h3">Font Sizes</SectionTitle>

        <Table className="caption-top border-collapse">
          <TableCaption>Different font sizes</TableCaption>
          <TableHeader>
            <TableRow className="uppercase font-bold">
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Pixels</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(fontSizes).map(([title, values]) => (
              <TableRow key={title}>
                <TableCell>{title}</TableCell>
                {Object.values(values).map((v, i) => (
                  <TableCell key={i}>{v}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Bounded>
  );
};
