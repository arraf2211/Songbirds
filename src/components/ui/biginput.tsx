import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface BigInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const BigInput = React.forwardRef<HTMLTextAreaElement, BigInputProps>(
  ({ className, maxLength, ...props }, ref) => {
    const [currentLength, setCurrentLength] = useState(0);

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
    };

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto ",
            className
          )}
          ref={ref}
          onChange={handleInputChange}
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

BigInput.displayName = "BigInput";

export { BigInput };
