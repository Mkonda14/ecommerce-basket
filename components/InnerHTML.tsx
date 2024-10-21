import DOMPurify from "dompurify";

interface InnerHTMLProps{
    text: string;
}

export const InnerHTML = ({text}:InnerHTMLProps) => {
  return (
    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(text)}} />
  )
}
