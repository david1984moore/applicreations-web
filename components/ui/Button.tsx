"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "default" | "sm";
  /** Use when button is on dark background (ghost variant gets dark border) */
  onDark?: boolean;
  asChild?: boolean;
}

const buttonVariants = (
  variant: "primary" | "ghost",
  onDark: boolean,
  size: "default" | "sm"
) =>
  cn(
    "inline-flex max-w-fit items-center justify-center rounded-[6px] px-7 py-3 font-[family-name:var(--font-dm-sans)] text-[15px] font-medium transition-all duration-[180ms] ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary" &&
      `bg-accent text-white shadow-sm hover:-translate-y-px hover:bg-accent-hover hover:shadow-md ${onDark ? "focus-visible:ring-offset-[var(--color-surface-dark)]" : ""}`,
    variant === "ghost" &&
      (onDark
        ? "border border-[var(--color-border-dark)] bg-transparent text-[var(--color-text-on-dark)] hover:bg-[var(--color-surface-subtle)] hover:-translate-y-px focus-visible:ring-offset-[var(--color-surface-dark)]"
        : "border-[1.5px] border-[var(--color-border-light)] bg-transparent text-[var(--color-text-primary)] hover:-translate-y-px hover:bg-[var(--color-surface-subtle)]"),
    size === "default" && "min-h-[44px] px-7 py-3",
    size === "sm" && "min-h-[40px] px-4 py-2 text-sm",
    "w-full md:w-auto md:max-w-fit"
  );

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      onDark = false,
      asChild = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        disabled={disabled}
        className={cn(buttonVariants(variant, onDark, size), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
