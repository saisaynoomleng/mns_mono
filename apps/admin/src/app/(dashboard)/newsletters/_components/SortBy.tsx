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

const SortBy = [
  { name: 'Email', href: 'email' },
  { name: 'Subscription Date', href: 'createdAt' },
];

export const NewsletterSortby = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex-1">
        <Button variant="outline">
          <FaSortAmountDown />
          Sort By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {SortBy.map((s) => (
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
