import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteModModal from './delete-mod-modal';

interface Props {
  modId: string;
}

const DeleteModCard = ({ modId }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
        <CardDescription>The following actions are destructive and cannot be reversed.</CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteModModal modId={modId} />
      </CardContent>
    </Card>
  );
}

export default DeleteModCard;