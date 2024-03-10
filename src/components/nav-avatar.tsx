"use client";
import React from 'react';
import { signOut } from 'next-auth/react';
import { BarChart2Icon, LogOut as LogOutIcon, User2 as UserIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import Avatar from '@/components/avatar';
import { Button } from '@/components/ui/button';

interface Props {
  username: string;
  avatar?: string | null;
}

const NavAvatar = ({ username, avatar }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar avatar={avatar} fallback={username[0]!} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user/${username}`}>
          <DropdownMenuItem className='hover:cursor-pointer hover:bg-accent'>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/dashboard">
          <DropdownMenuItem className='hover:cursor-pointer hover:bg-accent'>
            <BarChart2Icon className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='hover:cursor-pointer hover:bg-accent' onClick={() => void signOut()}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavAvatar;