"use client"
import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import SignInForm from './sign-in-form';

const SignInCard = () => {
  return (
    <Card className='w-96'>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          New to modlands? <Link href="/sign-up" className='text-blue-500'>Sign up for an account</Link>.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <SignInForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" onClick={() => signIn("discord", { callbackUrl: "/" })}>
            <Icons.discord className="mr-2 h-4 w-4" />
            Discord
          </Button>
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignInCard;