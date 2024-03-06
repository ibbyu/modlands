"use client"
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from '@/lib/validation/user';

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        callbackUrl: "/",
        redirect: false
      });

      if (response?.ok && response?.status === 200 && response?.url) {
        router.push("/");
      }
      else if (response?.error) {
        setMessage("Invalid Username or password.");
      }
      else if (response?.status !== 200) {
        setMessage("An unexpected error occurred.");
      }
    }
    catch(e) {
      console.error(e);
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">{loading ? <Loader2 className='animate-spin' /> : "Sign in"}</Button>
        <div className='w-full flex justify-center items-center'>
            <p className='text-red-400 text-sm'>{message}</p>
          </div>
      </form>
    </Form>
  );
}

export default SignInForm;