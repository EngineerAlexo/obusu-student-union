"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const colorPalette = ["#1e3a8a", "#047857", "#b45309", "#b91c1c", "#111827"];

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, Color],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: current }) => {
      onChange(current.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-40 rounded-b-xl border border-t-0 bg-background px-3 py-2 text-sm focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("rounded-xl", className)}>
      <div className="flex flex-wrap gap-2 rounded-t-xl border bg-muted/40 p-2">
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("underline") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          Underline
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet
        </Button>
        <div className="flex items-center gap-1 rounded-md border bg-background px-2">
          {colorPalette.map((color) => (
            <button
              key={color}
              type="button"
              className="h-5 w-5 rounded-full border"
              style={{ backgroundColor: color }}
              aria-label={`Apply color ${color}`}
              onClick={() => editor.chain().focus().setColor(color).run()}
            />
          ))}
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
