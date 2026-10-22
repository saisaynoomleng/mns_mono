'use client';

import { SectionTitle } from '#components/shared/SectionTitle/SectionTitle';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '#components/ui/alert-dialog';
import { Button } from '#components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#components/ui/card';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';

type UserDeleteFormProps = {
  className?: string;
  action: () => Promise<void>;
};

export const UserDeleteForm = ({
  className,
  action,
}: UserDeleteFormProps): React.JSX.Element => {
  return (
    <div
      className={twMerge(
        clsx('space-y-4 md:space-y-6 text-brand-error-400', className),
      )}
    >
      <SectionTitle as="h3" size="sm">
        Danger Zone
      </SectionTitle>

      <Card className="ring-brand-error-400 text-brand-error-400">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription className="text-brand-error-400"></CardDescription>
        </CardHeader>

        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="text-brand-error-400" size="sm">
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                If you delete your account, your personal information,
                subscriptions, workplaces will all be remove from our database.
              </AlertDialogDescription>
              <AlertDialogFooter className="border-input bg-brand-error-400/5">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={action}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};
