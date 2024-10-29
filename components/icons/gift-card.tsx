import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export const GiftCard = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        id="gift"
        xmlns="http://www.w3.org/2000/svg"
        className = { cn("absolute w-[calc(100%+1rem)] top-0 left-0 fill-foreground", className) }
        {...props }
    >
      <title className="stroke-2">gift</title>
      <path
        id="tertiary-fill"
        d="M4,15H20a0,0,0,0,1,0,0v3a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15A0,0,0,0,1,4,15Z"
        className="fill-[#b7b7b7] stroke-width: 2;"
      ></path>
      <rect
        id="secondary-fill"
        x="3"
        y="6"
        width="18"
        height="4"
        rx="1"
        className="fill-[#10B981] stroke-2"
      ></rect>
      <path
        id="primary-stroke"
        d="M20,10H4A1,1,0,0,1,3,9V7A1,1,0,0,1,4,6H20a1,1,0,0,1,1,1V9A1,1,0,0,1,20,10Zm0,8V10H4v8a1,1,0,0,0,1,1H19A1,1,0,0,0,20,18ZM12,6A5.36,5.36,0,0,0,8,3m8,0a5.36,5.36,0,0,0-4,3m0,13V6"
        className="fill-none stroke-black stroke-2"
        style={{
            strokeLinecap: "round",
            strokeLinejoin: "round",
        }}
      ></path>
    </svg>
  );
};
