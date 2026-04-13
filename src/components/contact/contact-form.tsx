"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock3, Loader2, Mail, MapPin, Send } from "lucide-react";
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
  subject: z.string().min(3, "Subject must be at least 3 characters."),
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
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      await addMessage({
        name: data.name,
        email: data.email,
        message: `Subject: ${data.subject}\n\n${data.message}`,
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
    <div className="space-y-8">
      <div id="contact-info" className="scroll-mt-28 grid gap-6 lg:grid-cols-2">
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader>
            <CardTitle>Union Office</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                Library Building, Second Floor
                <br />
                Student Union Office
                <br />
                Oda Bultum University Main Campus
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Clock3 className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                Monday - Friday: 8:30 AM - 5:00 PM
                <br />
                Saturday: 10:00 AM - 2:00 PM
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader>
            <CardTitle>Executive Committee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground">Union President</p>
              <p>Naafri Ahmed</p>
              <p className="mt-1 inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                president@obu.edu.et
              </p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold text-foreground">General Secretary</p>
              <p>Abraham Dafaru</p>
              <p className="mt-1 inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                secretary@obu.edu.et
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card id="send-message" className="scroll-mt-28 border-primary/10 shadow-sm lg:col-span-3">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input id="name" placeholder="Your full name" {...form.register("name")} />
              {form.formState.errors.name ? (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input id="email" placeholder="you@example.com" {...form.register("email")} />
              {form.formState.errors.email ? (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" placeholder="Subject of your message" {...form.register("subject")} />
              {form.formState.errors.subject ? (
                <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
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
                  Send Message
                </>
              )}
            </Button>
          </form>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-sm lg:col-span-2">
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
    </div>
  );
}
