import type React from 'react';
import { Bounded } from '../shared';
import { DashedTitle } from '#components/shared/DashedTitle/DashedTitle';
import { BsDash } from 'react-icons/bs';

const icons: React.ReactElement[] = [<BsDash />];

export const Iconography = (): React.JSX.Element => {
  return (
    <Bounded padding="sm" spacing="sm">
      <DashedTitle label="Iconography" />
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

      <div className="flex flex-wrap gap-2">
        {icons.map((icon, i) => {
          return (
            <span key={i} className="text-fs-600 p-1 border border-border/10">
              {icon}
            </span>
          );
        })}
      </div>
    </Bounded>
  );
};
