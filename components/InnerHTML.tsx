import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";

interface InnerHTMLProps {
  text: string;
  length?: number;
  className?: string;
}

export const InnerHTML = ({ text, className, length }: InnerHTMLProps) => {

  return (
    <div
      className={cn("text-muted-foreground", className)}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(length ? text.slice(0, length) + " ..." : text) }}
    />
  );
};
