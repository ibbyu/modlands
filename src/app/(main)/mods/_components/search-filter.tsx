"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchIcon, XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface Props {
  q?: string;
  page: number;
  totalMods: number;
}

const SearchFilter = ({ q, page, totalMods }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);
  const [text, setText] = useState(q ?? "");
  const [query] = useDebounce(text, 150);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(pathname + '?' + deleteQueryString('q'));
    } else {
      router.push(pathname + '?' + createQueryString('q', query));
    }
  }, [query]);

  return (
    <div className='flex items-center'>
      <div className='relative rounded-md shadow-sm'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <SearchIcon
            className='h-5 w-5 text-muted-foreground'
            aria-hidden='true'
          />
        </div>
        <Input
          value={text}
          placeholder='Search mods'
          onChange={e => setText(e.target.value)}
          className='block w-full rounded-md border-0 py-1.5 pl-10 text-foreground focus:ring-2 sm:text-sm sm:leading-6 bg-accent'
        />
        {text && <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
          <XIcon
            className='h-4 w-4 text-muted-foreground hover:text-white hover:cursor-pointer'
            aria-hidden='true'
            onClick={() => setText("")}
          />
        </div>}
      </div>
      <div className='pl-4'>{q && <Label>{totalMods} {totalMods === 1 ? "mod" : "mods"} found</Label>}</div>
      <div className='ml-auto'>
        <Label className='text-xs'>Sort by:</Label>
        <Select defaultValue='relevant'>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevant">Most Relevant</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="recent">Most recent</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default SearchFilter;