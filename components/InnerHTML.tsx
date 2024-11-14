import DOMPurify from "dompurify";

interface InnerHTMLProps{
    text: string;
    className?: string;
}

export const InnerHTML = ({text, className}:InnerHTMLProps) => {
  return (
    <div className={className} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(text)}} />
  )
}
