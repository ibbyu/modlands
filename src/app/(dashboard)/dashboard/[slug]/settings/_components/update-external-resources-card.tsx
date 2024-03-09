import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateExternalResourcesForm from './update-external-resources-form';

interface Props {
  modId: string;
  modExternalResourcesId?: string | null;
  issues?: string | null;
  source?: string | null;
  wiki?: string | null;
  discord?: string | null;
}

const UpdateExternalResourcesCard = ({ modId, modExternalResourcesId, issues, source, wiki, discord }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update external resources</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateExternalResourcesForm modId={modId} modExternalResourcesId={modExternalResourcesId} issues={issues} source={source} wiki={wiki} discord={discord} />
      </CardContent>
    </Card>
  );
}

export default UpdateExternalResourcesCard;