"use client";

import * as React from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import posthog from "posthog-js";

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

const LABEL_CLASS =
  "font-sans text-sm font-medium tracking-normal text-foreground normal-case";

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
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      businessName: "",
      description: "",
    },
  });

  const onSubmit = async (values: ContactValues) => {
    setServerError(null);
    console.log("Form: ", values);
    const res = await submitContact(values);
    if (res.ok) {
      setDone(values.firstName);
      posthog.capture("contact_form_submitted", {
        reason: values.reason,
        business_name: values.businessName,
      });
    } else {
      setServerError(res.error ?? "Something went wrong. Please try again.");
      posthog.capture("contact_form_failed", {
        reason: values.reason,
        error: res.error,
      });
    }
  };

  if (done) {
    return (
      <div className="mx-auto flex h-full min-h-[420px] w-full max-w-xl flex-col items-center justify-center gap-4 rounded-2xl bg-[color-mix(in_oklab,var(--color-foreground)_3%,var(--color-background))] p-10 text-center">
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
      className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-2xl bg-[color-mix(in_oklab,var(--color-foreground)_3%,var(--color-background))] p-6 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName" className={LABEL_CLASS}>
            First name
          </Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          <FieldError message={errors.firstName?.message} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName" className={LABEL_CLASS}>
            Last name
          </Label>
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
        <Label htmlFor="email" className={LABEL_CLASS}>
          Email
        </Label>
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
        <Label htmlFor="businessName" className={LABEL_CLASS}>
          Business name
        </Label>
        <Input
          id="businessName"
          autoComplete="organization"
          aria-invalid={!!errors.businessName}
          {...register("businessName")}
        />
        <FieldError message={errors.businessName?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="reason" className={LABEL_CLASS}>
          Reason
        </Label>
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className={LABEL_CLASS}>
          Tell us about your project
        </Label>
        <textarea
          id="description"
          rows={5}
          aria-invalid={!!errors.description}
          placeholder="What are you trying to build, automate, or fix?"
          className="flex min-h-[140px] w-full resize-y rounded-xl border border-input bg-transparent px-3 py-2 text-sm transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
          {...register("description")}
        />
        <FieldError message={errors.description?.message} />
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

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
