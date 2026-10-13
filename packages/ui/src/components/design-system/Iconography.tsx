import type React from 'react';
import { Bounded, SectionTitle } from '../shared';
import { BsDash } from 'react-icons/bs';

const icons: React.ReactElement[] = [<BsDash />];

export const Iconography = (): React.JSX.Element => {
  return (
    <Bounded spacing="sm">
      <SectionTitle>Iconography</SectionTitle>
      <p>
        Icons provide a simple and recognizable visual language for
        communicating actions, navigation, status, and supporting information.
        The system uses icons from React Icons to maintain a consistent visual
        style across the interface.
      </p>

      <p>
        Icons should be clear, purposeful, and appropriately scaled to their
        surrounding content. They complement typography and UI elements without
        competing with the primary message.
      </p>

      <div className="flex flex-wrap gap-2 border p-2 rounded-lg">
        {icons.map((icon, i) => {
          return (
            <span
              key={i}
              className="text-fs-600 p-1 border border-muted-foreground rounded-lg"
            >
              {icon}
            </span>
          );
        })}
      </div>
    </Bounded>
  );
};
