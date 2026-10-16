'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@mns/ui';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export const NewsletterSearch = () => {
  return (
    <InputGroup className="md:w-fit">
      <InputGroupInput type="search" placeholder="search by email..." />
      <InputGroupAddon>
        <InputGroupText>
          <FaMagnifyingGlass />
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
};
