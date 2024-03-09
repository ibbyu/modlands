"use client";
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateExternalResourcesSchema } from '@/lib/validation/mod';

interface Props {
  modId: string;
  modExternalResourcesId?: string | null;
  issues?: string | null;
  source?: string | null;
  wiki?: string | null;
  discord?: string | null;
}

const UpdateExternalResourcesForm = ({ modId, modExternalResourcesId, issues, source, wiki, discord }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof updateExternalResourcesSchema>>({
    resolver: zodResolver(updateExternalResourcesSchema),
    defaultValues: {
      modExternalResourcesId: modExternalResourcesId,
      issues: issues ? issues : undefined,
      source: source ? source : undefined,
      wiki: wiki ? wiki : undefined,
      discord: discord ? discord : undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateExternalResourcesSchema>) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/mods/${modId}/external-resources`, {
        method: "PATCH",
        body: JSON.stringify(values)
      });

      const { message } = await response.json() as { message: string };

      if (response.ok) {
        toast.success(message);
        router.refresh();
      }
      else {
        toast.error(message);
      }
    }
    catch(e) {
      console.error(e);
      toast.error('Something went wrong');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="issues"
          render={({ field }) => (
            <FormItem className='flex'>
              <div className='flex flex-col gap-2 w-2/3'>
                <FormLabel>Issue Link</FormLabel>
                <FormDescription>
                  A place for users to report bugs, issues, and concerns about your mod.
                </FormDescription>
              </div>
              <FormControl>
                <div className='flex w-1/3 flex-col items-start'>
                  <Input placeholder="Issue url" {...field} />
                  <FormMessage />
                </div>
              </FormControl>

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className='flex'>
              <div className='flex flex-col gap-2 w-2/3'>
                <FormLabel>Source Link</FormLabel>
                <FormDescription>
                  A page/repository containing the source code for your mod
                </FormDescription>
              </div>
              <FormControl>
                <div className='flex w-1/3 flex-col items-start'>
                  <Input placeholder="Source url" {...field} />
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wiki"
          render={({ field }) => (
            <FormItem className='flex'>
              <div className='flex flex-col gap-2 w-2/3'>
                <FormLabel>Wiki Link</FormLabel>
                <FormDescription>
                  A page containing information, documentation, and help for the mod.
                </FormDescription>
              </div>
              <FormControl>
                <div className='flex w-1/3 flex-col items-start'>
                  <Input placeholder="Wiki url" {...field} />
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discord"
          render={({ field }) => (
            <FormItem className='flex'>
              <div className='flex flex-col gap-2 w-2/3'>
                <FormLabel>Discord Link</FormLabel>
                <FormDescription>
                  An invitation link to your Discord server.
                </FormDescription>
              </div>
              <FormControl>
                <div className='flex w-1/3 flex-col items-start'>
                  <Input placeholder="Discord url" {...field} />
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button type="submit">{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateExternalResourcesForm;