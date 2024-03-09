"use client";
import React, { useState } from 'react';
import type z from "zod";
import type { JSONValue } from 'postgres';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { updateDescriptionSchema } from '@/lib/validation/mod';
import TipTap from '@/components/tiptap';

interface Props {
  modId: string;
  description?: JSONValue
}

const UpdateDescriptionForm = ({ modId, description }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof updateDescriptionSchema>>({
    resolver: zodResolver(updateDescriptionSchema),
    mode: "onChange",
    defaultValues: {
      description,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateDescriptionSchema>) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/mods/${modId}/description`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        }
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
    catch (error) {
      toast.error("Unexpected error");
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 h-full'>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TipTap defaultValue={field.value as string} onChange={field.onChange} editable placeholder='No description'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex justify-end'>
          <Button disabled={form.watch("description") === description}>{loading ? <Loader2Icon className='animate-spin' /> : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateDescriptionForm;