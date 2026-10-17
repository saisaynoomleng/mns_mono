import { passwordRules } from '@mns/utils';
import clsx from 'clsx';
import type React from 'react';

import { IoCheckmark, IoClose } from 'react-icons/io5';

export const PasswordChecker = ({
  password,
}: {
  password: string;
}): React.JSX.Element => {
  return (
    <ul className="list-inside">
      {passwordRules.map((rule, i) => {
        const passed = rule.test(password);

        return (
          <li
            key={i}
            className={clsx(
              'flex gap-x-2 items-center',
              passed ? 'text-brand-success-500' : 'text-red-500',
            )}
          >
            <span>{passed ? <IoCheckmark /> : <IoClose />}</span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
};
