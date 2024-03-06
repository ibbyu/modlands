import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateSummaryForm from './update-mod-summary-form';

interface Props {
  modId: string;
  summary: string;
}

const UpdateModSummaryCard = ({ modId, summary } : Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>Update your mod&apos;s summary</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateSummaryForm modId={modId} summary={summary} />
      </CardContent>
    </Card>
  );
}

export default UpdateModSummaryCard;