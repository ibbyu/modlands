"use client"
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateModForm from './create-mod-form';

const CreateModCard = () => {
  return (
    <Card className='w-full'>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create a new mod</CardTitle>
        <CardDescription>
          New mods are created as drafts and can be found under your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CreateModForm />
      </CardContent>
    </Card>
  );
}

export default CreateModCard;