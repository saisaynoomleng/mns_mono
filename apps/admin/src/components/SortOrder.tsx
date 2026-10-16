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

const LIST = [
  { name: 'From Z to A', href: 'desc' },
  { name: 'From A to Z', href: 'asc' },
];

type SortOrderProps = {
  pathname: string;
  page?: number;
  sortBy?: string;
  filter?: string;
  search?: string;
};

export const SortOrder = ({
  pathname,
  page,
  sortBy,
  filter,
  search,
}: SortOrderProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex-1">
        <Button variant="outline">
          <FaSortAmountDown />
          Order By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {LIST.map((l) => (
            <DropdownMenuItem key={l.name} asChild>
              <Link
                href={{
                  pathname,
                  query: {
                    ...(page && { page }),
                    ...(sortBy && { sortBy }),
                    ...(filter && { filter }),
                    ...(search && { search }),
                    sortOrder: l.href,
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
