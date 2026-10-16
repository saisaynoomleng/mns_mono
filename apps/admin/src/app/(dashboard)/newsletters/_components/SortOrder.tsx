import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@mns/ui';
import Link from 'next/link';
import { FaSortAmountDown } from 'react-icons/fa';

const SortOrder = [
  { name: 'Latest First', href: 'desc' },
  { name: 'Oldest First', href: 'asc' },
];

export const NewsletterSortOrder = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex-1">
        <Button variant="outline">
          <FaSortAmountDown />
          Order
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {SortOrder.map((s) => (
            <DropdownMenuItem key={s.name} asChild>
              <Link
                href={{
                  pathname: '/newsletters',
                  query: {
                    sortBy: s.href,
                  },
                }}
                className="capitalize"
              >
                {s.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
