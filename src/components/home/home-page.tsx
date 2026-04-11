"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  HandHelping,
  Landmark,
  MapPin,
  Megaphone,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/shared/container";
import { RichTextContent } from "@/components/shared/rich-text-content";
import { SectionHeader } from "@/components/shared/section-header";
import { useAdminData } from "@/context/admin-data-context";
import { services, testimonials } from "@/lib/site-data";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export function HomePage() {
  const { announcements, events } = useAdminData();
  const featuredAnnouncements = announcements.slice(0, 3);
  const featuredEvents = events.slice(0, 3);
  const universityHeroImage = "/images/home/university-hero.jpg";
  const fallbackSlides = [
    { image: universityHeroImage, title: "Official University Community and Campus Life" },
    { image: "/events/outreach.svg", title: "Community Service and Collaboration" },
    { image: "/events/tech-fair.svg", title: "Innovation and Academic Excellence" },
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  const [heroImageError, setHeroImageError] = useState(false);
  const slides = heroImageError
    ? fallbackSlides
    : [{ image: universityHeroImage, title: "Official University Community and Campus Life" }];
  const safeSlideIndex = slideIndex % slides.length;
  const activeSlideImage = slides[safeSlideIndex]?.image ?? "/events/leadership.svg";

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }
    const timer = setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="space-y-20 pb-16 sm:space-y-24 sm:pb-20">
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-black/60" />
        <motion.div
          key={activeSlideImage}
          initial={{ opacity: 0.45 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={activeSlideImage}
            alt={slides[safeSlideIndex].title}
            fill
            className="object-cover"
            priority
            onError={() => setHeroImageError(true)}
          />
        </motion.div>
        <Container className="relative z-10 py-24 sm:py-32">
          <motion.div {...fadeInUp} className="max-w-3xl text-white">
            <Badge className="bg-accent text-accent-foreground">OBUSU University Portal</Badge>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-balance sm:text-6xl">
              Building a smarter and stronger student community.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/90 sm:text-lg">
              {slides[safeSlideIndex].title}. Access verified announcements, upcoming events, and
              student support services in one modern campus platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events" className={buttonVariants({ size: "lg", variant: "secondary" })}>
                View Events
              </Link>
              <Link
                href="/announcements"
                className={buttonVariants({ size: "lg", className: "bg-white/15 text-white hover:bg-white/25" })}
              >
                Announcements <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <section>
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Latest Updates"
            title="Latest News and Announcements"
            description="Official notices and policy updates from the student union secretariat."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredAnnouncements.map((item, index) => (
              <motion.div key={item.id} {...fadeInUp} className={index === 0 ? "lg:col-span-2" : ""}>
                <Card className="h-full border-primary/10 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                    <CardDescription>{item.date} • OBUSU Newsdesk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RichTextContent html={item.description} className="line-clamp-4" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Upcoming"
            title="Events Preview"
            description="Three featured programs to keep your campus life active."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredEvents.map((event) => (
              <motion.div key={event.id} {...fadeInUp}>
                <Card className="group h-full overflow-hidden border-primary/10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={800}
                      height={520}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {event.date}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    {event.location}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted/40 py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <motion.div {...fadeInUp}>
            <SectionHeader
              eyebrow="About OBUSU"
              title="A trusted voice for every student."
              description="OBUSU represents student interests in governance, academics, welfare, and co-curricular development."
              className="text-left [&>p]:mx-0"
            />
          </motion.div>
          <motion.div {...fadeInUp} className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-primary" /> Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                A thriving student community that leads with excellence and unity.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" /> Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Deliver value through advocacy, collaboration, and opportunities for growth.
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </section>

      <section>
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="What We Offer"
            title="Core Student Services"
            description="From advocacy to skills development, our programs are designed around student needs."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <motion.div key={service.id} {...fadeInUp}>
                <Card className="h-full border-primary/10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <HandHelping className="h-4 w-4 text-primary" />
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {service.description}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted/40 py-16">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Student Voices"
            title="Testimonials"
            description="What students are saying about OBUSU."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((item) => (
              <motion.div key={item.id} {...fadeInUp}>
                <Card className="h-full border-primary/10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {item.name}
                    </CardTitle>
                    <CardDescription>{item.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    &quot;{item.quote}&quot;
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <motion.div
            {...fadeInUp}
            className="rounded-3xl border bg-gradient-to-r from-primary via-blue-700 to-emerald-700 px-6 py-10 text-primary-foreground shadow-xl sm:px-10 sm:py-14"
          >
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
              <Megaphone className="h-4 w-4" />
              Ready to get involved?
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold text-balance sm:text-4xl">
              Be part of leadership, service, and impact on campus.
            </h2>
            <Link
              href="/contact"
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
                className: "mt-7 inline-flex",
              })}
            >
              Join OBUSU <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
