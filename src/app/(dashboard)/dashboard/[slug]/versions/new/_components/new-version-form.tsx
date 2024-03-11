"use client"
import React, { useState } from 'react';
import type z from "zod";
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
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { createVersionSchema } from "@/lib/validation/version";
import Tiptap from '@/components/tiptap';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  modId: string;
  modSlug: string;
}

const NewVersionForm = ({ modId, modSlug }: Props) => {
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState<string>(".zip")
  const router = useRouter();
  const form = useForm<z.infer<typeof createVersionSchema>>({
    resolver: zodResolver(createVersionSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: undefined,
      type: "PythonSDK",
    },
  });

  const onSubmit = async (values: z.infer<typeof createVersionSchema>) => {
    setLoading(true);
    const data = new FormData();
    data.append("json", JSON.stringify({ title: values.title, description: values.description, type: values.type }))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    data.append("file", values.file);

    try {
      const response = await fetch(`/api/mods/${modId}/version`, {
        method: "post",
        body: data,
      });

      const { message } = await response.json() as { message: string };

      if (response.ok) {
        toast.success(message);
        form.reset();
        //router.push(`/mod/${modSlug}/releases`);
        router.refresh();
      }
    }
    catch (error) {
      toast.error("Unexpected error");
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 h-full'>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select value={field.value} name={field.name} onValueChange={(value) => {
                  if (value === "PythonSDK") {
                    setFileType(".zip");
                  }
                  else if (value === "BLCM") {
                    setFileType(".blcm");
                  }
                  else {
                    setFileType(".txt");
                  }

                  return field.onChange(value);
                }}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue onBlur={field.onBlur} ref={field.ref} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PythonSDK">PythonSDK</SelectItem>
                    <SelectItem value="Text">Text</SelectItem>
                    <SelectItem value="BLCM">BLCM</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Tiptap onChange={field.onChange} editable />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  accept={fileType}
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex justify-end'>
          <Button disabled={loading}>{loading ? <Loader2Icon className='animate-spin' /> : "Create"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default NewVersionForm;