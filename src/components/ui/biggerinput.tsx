import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface BigInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const BiggerInput = React.forwardRef<HTMLTextAreaElement, BigInputProps>(
  ({ className, maxLength, ...props }, ref) => {
    const [currentLength, setCurrentLength] = useState(0);
    const [height, setHeight] = useState("300px"); // Updated height state
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (typeof props.value === "string") {
        setCurrentLength(props.value.length);
      } else {
        setCurrentLength(0);
      }
    }, [props.value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength) {
        const inputValue = e.target.value;
        setCurrentLength(inputValue.length);
      }

      if (props.onChange) {
        props.onChange(e);
      }

      if (textareaRef.current) {
        setHeight(`${textareaRef.current.scrollHeight}px`);
      }
    };

    return (
      <div className="relative flex">
        <textarea
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto ",
            className
          )}
          ref={(el) => {
            ref?.(el);
            textareaRef.current = el;
          }}
          onChange={handleInputChange}
          style={{ height }}
          {...props}
        />
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {currentLength}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

BiggerInput.displayName = "BigInput";

export { BiggerInput };
