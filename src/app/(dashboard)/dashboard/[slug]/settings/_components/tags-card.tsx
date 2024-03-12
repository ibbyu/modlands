"use client"
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  modId: string;
  activeTags: {
    modId: string;
    tagId: string;
  }[];
  tags: {
    id: string;
    name: string;
  }[];
}

const TagsCard = ({ modId, activeTags, tags }: Props) => {
  const router = useRouter();

  const onAddTag = async (tagName: string) => {
    try {
      const response = await fetch(`/api/mods/${modId}/tag?name=${tagName}`, {
        method: "POST",
      });

      const data = await response.json() as { message: string };

      if (response.ok) {
        toast.success(data.message);
        router.refresh();
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  const onDeleteTag = async (tagName: string) => {
    try {
      const response = await fetch(`/api/mods/${modId}/tag?name=${tagName}`, {
        method: "DELETE",
      });

      const data = await response.json() as { message: string };

      if (response.ok) {
        toast.success(data.message);
        router.refresh();
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-4'>
        {tags.map((tag) => <TagCheckbox 
          key={tag.id}
          name={tag.name}
          checked={activeTags.some((t) => t.tagId === tag.id)}
          onAddTag={onAddTag}
          onDeleteTag={onDeleteTag}>
            {tag.name}
          </TagCheckbox>)}
      </CardContent>
    </Card>
  );
}

interface TagCheckboxProps {
  children: React.ReactNode;
  checked?: boolean;
  name: string;
  onAddTag: (tagName: string) => Promise<void>;
  onDeleteTag: (tagName: string) => Promise<void>;
}

const TagCheckbox = ({ children, checked, name, onAddTag, onDeleteTag }: TagCheckboxProps) => {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox id={name} defaultChecked={checked} onCheckedChange={(v) => v ? onAddTag(name) : onDeleteTag(name)} />
      <label htmlFor={name} className='capitalize'>{children}</label>
    </div>
  );
}

export default TagsCard;