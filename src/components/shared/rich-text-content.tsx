import sanitizeHtml from "sanitize-html";

import { cn } from "@/lib/utils";

type RichTextContentProps = {
  html: string;
  className?: string;
};

const allowedTags = [
  "p",
  "strong",
  "em",
  "u",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "br",
  "span",
];

export function RichTextContent({ html, className }: RichTextContentProps) {
  const safeHtml = sanitizeHtml(html ?? "", {
    allowedTags,
    allowedAttributes: {
      span: ["style"],
    },
    allowedStyles: {
      "*": {
        color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\((\d{1,3},\s?){2}\d{1,3}\)$/],
      },
    },
  });

  return (
    <div
      className={cn("rich-content text-sm leading-6 text-muted-foreground", className)}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
