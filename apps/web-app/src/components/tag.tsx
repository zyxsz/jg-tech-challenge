import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props extends ComponentProps<"div"> {
  asChild?: boolean;
  tooltip?: ReactNode;
}

export const Tag = ({ className, asChild, tooltip, ...rest }: Props) => {
  const Element = asChild ? Slot : "div";

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Element
            className={cn(
              "flex items-center gap-2 rounded-md bg-background p-2 border text-xs [&_svg]:size-4 select-none text-muted-foreground",
              className
            )}
            {...rest}
          />
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={4}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Element
      className={cn(
        "flex items-center gap-2 rounded-md bg-background p-2 border text-xs [&_svg]:size-4 select-none text-muted-foreground",
        className
      )}
      {...rest}
    />
  );
};
