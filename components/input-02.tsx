import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface Input02Props extends React.ComponentPropsWithoutRef<typeof Input> {
  label?: string;
  required?: boolean;
  labelClassName?: string;
}

export default function Input02({
      id,
      label = "Input label",
      required = false,
      labelClassName,
      ...props
    }: Input02Props) {
  return (
      <div className="space-y-2">
        <Label
            htmlFor={id}
            className={labelClassName}
        >
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <Input id={id} required={required} {...props} />
      </div>
  );
}
