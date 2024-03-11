import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewVersionForm from './new-version-form';

interface Props {
  modId: string;
  modSlug: string;
}

const NewVersionCard = ({ modId, modSlug } : Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new mod version</CardTitle>
      </CardHeader>
      <CardContent>
        <NewVersionForm modId={modId} modSlug={modSlug} />
      </CardContent>
    </Card>
  );
}

export default NewVersionCard;