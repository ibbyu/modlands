"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  activeTags: string[]
}

const TagFilter = ({ activeTags } : Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("c");
    selectedTags.forEach((tag) => params.append('c', tag));
    setQuery(params.toString());
  }, [selectedTags]);

  useEffect(() => {
    router.push(`/mods?${query}`);
  }, [query]);
  

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='font-bold text-2xl'>Categories</h1>
      <div className='flex flex-col gap-2'>
        <TagCheckBox id="gameplay" setSelectedTags={setSelectedTags} checked={selectedTags.includes("gameplay")}>Gameplay</TagCheckBox>
        <TagCheckBox id="content" setSelectedTags={setSelectedTags} checked={selectedTags.includes("content")}>Content</TagCheckBox>
        <TagCheckBox id="utility" setSelectedTags={setSelectedTags} checked={selectedTags.includes("utility")}>Utility</TagCheckBox>
        <TagCheckBox id="library" setSelectedTags={setSelectedTags} checked={selectedTags.includes("library")}>Library</TagCheckBox>
      </div>
    </div>
  )
}

interface TagCheckBoxProps {
  children: React.ReactNode;
  checked?: boolean;
  id: string;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
}

const TagCheckBox = ({ children, checked , id, setSelectedTags } : TagCheckBoxProps) => {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox id={id} defaultChecked={checked} onCheckedChange={(c) => {
        c ? setSelectedTags((prev) => [...prev, id]): setSelectedTags((prev) => prev.filter((v) => v !== id))
      }}/>
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

export default TagFilter;