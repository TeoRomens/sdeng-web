import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {cn} from "@/utils/cn";

interface Input06Props extends React.ComponentPropsWithoutRef<typeof Input> {
  label?: string;
  errorMessage?: string;
  showError?: boolean;
  labelClassName?: string;
  errorClassName?: string;
}

export default function Input06({
      id,
      label = "Input with error",
      errorMessage = "Error message",
      showError = true,
      labelClassName,
      errorClassName,
      className,
      ...props
    }: Input06Props) {
  return (
      <div className="space-y-2">
        <Label
            htmlFor={id}
            className={labelClassName}
        >
          {label}
        </Label>
        <Input
            id={id}
            className={cn(showError &&
                "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30",
                className,
            )}
            {...props}
        />
        {showError && (
            <p
                className={cn("mt-2 text-xs text-destructive", errorClassName)}
                role="alert"
                aria-live="polite"
            >
              {errorMessage}
            </p>
        )}
      </div>
  );
}
