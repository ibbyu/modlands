"use client";
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";

import { updateModSummarySchema } from '@/lib/validation/mod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  modId: string;
  summary: string;
}

const UpdateModSummaryForm = ({ modId, summary }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof updateModSummarySchema>>({
    resolver: zodResolver(updateModSummarySchema),
    defaultValues: {
      summary
    },
  })

  const onSubmit = async (values: z.infer<typeof updateModSummarySchema>) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/mods/${modId}/summary`, {
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
    catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button disabled={form.watch("summary") === summary}>{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateModSummaryForm;