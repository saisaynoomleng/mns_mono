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

type List = {
  name: string;
  href: string;
};

type SortByProps = {
  lists: List[];
  pathname: string;
};

export const SortBy = ({ lists, pathname }: SortByProps) => {
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
          {lists.map((l) => (
            <DropdownMenuItem key={l.name} asChild>
              <Link
                href={{
                  pathname,
                  query: {
                    sortBy: l.href,
                  },
                }}
                className="capitalize"
              >
                {l.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
