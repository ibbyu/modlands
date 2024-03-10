"use client";
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { 
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronsLeftRightIcon,
  Heading1Icon, 
  Heading2Icon, 
  Heading3Icon, 
  ItalicIcon, 
  ListIcon, 
  ListOrderedIcon, 
  QuoteIcon, 
  StrikethroughIcon} from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import { type Editor } from "@tiptap/core";
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

import { Toggle } from '@/components/ui/toggle';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  defaultValue?: string;
  onChange?: (richText: string) => void;
  editable?: boolean;
  placeholder?: string;
  className?: string;
}

const Tiptap = ({ defaultValue, onChange, editable, placeholder, className }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-10',
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-10',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'text-foreground',
          }
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: false,
        emptyEditorClass: 'before:content-[attr(data-placeholder)] before:float-left text-muted-foreground before:h-0 before:pointer-none italic',
      })
    ],
    content: defaultValue ? JSON.parse(defaultValue) : undefined,
    editorProps: {
      attributes: {
        class: "bg-accent rounded-2xl p-4 min-h-96"
      }
    },
    onUpdate({ editor }) {
      if (onChange)
        onChange(JSON.stringify(editor.getJSON()));
    },
    editable: !!editable
  });

  if (!editor) {
    return <EditorSkeleton />
  }

  return (
    <div className='flex flex-col justify-stretch gap-4'>
      {editable && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

interface ToolbarProps {
  editor: Editor | null;
}

const ICON_SIZE = 16;

const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor)
    return null;

  return (
    <div className='p-1 flex gap-2'>
      <Toggle size="sm" pressed={editor.isActive("heading", { level: 1 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1Icon size={ICON_SIZE} />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("heading", { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2Icon size={ICON_SIZE}/>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("heading", { level: 3 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3Icon size={ICON_SIZE} />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("bold")} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <BoldIcon size={ICON_SIZE} />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("italic")} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
        <ItalicIcon size={ICON_SIZE}/>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("strike")} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
        <StrikethroughIcon size={ICON_SIZE} />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("code")} onPressedChange={() => editor.chain().focus().toggleCode().run()}>
        <ChevronsLeftRightIcon size={ICON_SIZE} />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("bulletList")} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
        <ListIcon size={ICON_SIZE} />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("orderedList")} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrderedIcon size={ICON_SIZE} />
      </Toggle>
      {/* Not working - https://tailwindcss.com/docs/preflight#default-margins-are-removed */}
      <Toggle size="sm" pressed={editor.isActive("blockquote")} onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}>
        <QuoteIcon size={ICON_SIZE} />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'left' })} onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}>
        <AlignLeftIcon size={ICON_SIZE} />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'center' })} onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}>
        <AlignCenterIcon size={ICON_SIZE} />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'right' })} onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}>
        <AlignRightIcon size={ICON_SIZE} />
      </Toggle>
    </div>
  );
}

const EditorSkeleton = () => {
  return (
    <div className='flex flex-col justify-stretch gap-4'>
      <Skeleton className='rounded-2xl p-2 h-10 w-4/6'/>
      <Skeleton className='rounded-2xl p-4 min-h-96'/>
    </div>
  );
}

export default Tiptap;