"use client";

import * as React from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REASONS } from "@/email/types";

import { submitContact } from "./actions";
import { contactSchema, type ContactValues } from "./schema";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function ContactForm() {
  const [done, setDone] = React.useState<string | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: standardSchemaResolver(contactSchema),
    defaultValues: { firstName: "", lastName: "", email: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    setServerError(null);
    const res = await submitContact(values);
    if (res.ok) setDone(values.firstName);
    else setServerError(res.error ?? "Something went wrong. Please try again.");
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-10 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border border-transparent bg-brand text-brand-foreground shadow-[0_0_24px_var(--brand-glow)]">
          <Check className="size-5" />
        </div>
        <h2 className="font-heading text-2xl font-medium text-foreground">
          Thanks, {done}!
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          We&apos;ve sent a confirmation to your inbox and we&apos;ll get back
          to you within one business day.
        </p>
        <Button variant="outline" size="lg" asChild className="mt-2">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          <FieldError message={errors.firstName?.message} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          <FieldError message={errors.lastName?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="reason">Reason</Label>
        <Controller
          control={control}
          name="reason"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="reason" aria-invalid={!!errors.reason}>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {REASONS.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError message={errors.reason?.message} />
      </div>

      {serverError && (
        <p className="text-sm text-destructive">{serverError}</p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        disabled={isSubmitting}
        className="group mt-1 w-full sm:w-auto sm:self-start"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight
              data-icon="inline-end"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </>
        )}
      </Button>
    </form>
  );
}
