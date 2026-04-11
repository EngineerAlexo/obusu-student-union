"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { useAdminData } from "@/context/admin-data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { messages, addMessage, isLoadingData } = useAdminData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      await addMessage({
        name: data.name,
        email: data.email,
        message: data.message,
      });
      toast.success("Message submitted successfully.");
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit message.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Send Us a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" placeholder="Your full name" {...form.register("name")} />
              {form.formState.errors.name ? (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" placeholder="you@example.com" {...form.register("email")} />
              {form.formState.errors.email ? (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell us how we can support you..."
                rows={5}
                {...form.register("message")}
              />
              {form.formState.errors.message ? (
                <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
              ) : null}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoadingData ? (
            <p className="text-sm text-muted-foreground">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="rounded-xl border border-dashed bg-muted/40 p-4 text-sm text-muted-foreground">
              No messages yet. Submitted entries will appear here.
            </p>
          ) : (
            messages.slice(0, 5).map((entry) => (
              <div key={entry.id} className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-muted-foreground">{entry.email}</p>
                </div>
                <p className="text-sm text-muted-foreground">{entry.message}</p>
                <p className="text-xs text-muted-foreground">{entry.date}</p>
                <Separator />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
