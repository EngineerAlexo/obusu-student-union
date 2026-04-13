"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CircleCheckBig,
  HandHelping,
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
  const slides = [
    {
      image: "/images/home/slider-1.jpg",
      fallback: "/events/leadership.svg",
      title: "Oda Bultum University Student Union",
      subtitle: "Official Student Representation and Academic Advocacy",
    },
    {
      image: "/images/home/slider-2.jpg",
      fallback: "/events/outreach.svg",
      title: "Unity, Service, and Leadership",
      subtitle: "Building an inclusive and progressive campus community",
    },
    {
      image: "/images/home/slider-3.jpg",
      fallback: "/events/tech-fair.svg",
      title: "Innovation and Student Development",
      subtitle: "Connecting students to opportunities, skills, and impact",
    },
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  const [failedSlides, setFailedSlides] = useState<number[]>([]);
  const safeSlideIndex = slideIndex % slides.length;
  const currentSlide = slides[safeSlideIndex];
  const activeSlideImage = failedSlides.includes(safeSlideIndex)
    ? currentSlide.fallback
    : currentSlide.image;

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () =>
    setSlideIndex((current) => (current - 1 + slides.length) % slides.length);
  const handleNext = () => setSlideIndex((current) => (current + 1) % slides.length);

  return (
    <div className="space-y-20 pb-16 sm:space-y-24 sm:pb-20">
      <section id="home-overview" className="scroll-mt-28 border-b bg-muted/20 py-10 sm:py-12">
        <Container className="space-y-8">
          <div className="relative overflow-hidden rounded-3xl border bg-slate-900 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlideImage}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.2 }}
                transition={{ duration: 0.6 }}
                className="relative h-[280px] sm:h-[460px]"
              >
                <Image
                  src={activeSlideImage}
                  alt={currentSlide.title}
                  fill
                  priority
                  className="object-contain object-center"
                  onError={() =>
                    setFailedSlides((current) =>
                      current.includes(safeSlideIndex)
                        ? current
                        : [...current, safeSlideIndex],
                    )
                  }
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              className="absolute left-3 top-1/2 inline-flex -translate-y-1/2 rounded-full bg-white/90 p-2 text-primary shadow transition hover:bg-white"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 rounded-full bg-white/90 p-2 text-primary shadow transition hover:bg-white"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-2.5 rounded-full transition-all ${
                  index === safeSlideIndex ? "w-8 bg-primary" : "w-2.5 bg-primary/30"
                }`}
                onClick={() => setSlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <motion.div {...fadeInUp} className="mx-auto max-w-3xl text-center">
            <Badge className="bg-accent text-accent-foreground">OBUSU University Portal</Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary text-balance sm:text-5xl">
              {currentSlide.title}
            </h1>
            <p className="mt-3 text-xl font-medium text-foreground/90">{currentSlide.subtitle}</p>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Access verified announcements, upcoming events, and student support services in one
              structured university portal.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/events" className={buttonVariants({ size: "lg" })}>
                View Events
              </Link>
              <Link href="/announcements" className={buttonVariants({ size: "lg", variant: "outline" })}>
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
                <Card className="h-full border-l-4 border-l-primary border-primary/10 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
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

      <section id="highlights" className="scroll-mt-28">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Upcoming"
            title="Events Preview"
            description="Three featured programs to keep your campus life active."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredEvents.map((event) => (
              <motion.div key={event.id} {...fadeInUp}>
                <Card className="group h-full overflow-hidden border-l-4 border-l-primary border-primary/10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
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

      <section
        id="about-obusu"
        className="relative scroll-mt-28 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-100/70 py-18"
      >
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
        <Container className="relative space-y-10">
          <SectionHeader
            eyebrow="About OBUSU"
            title="Oda Bultum University Student Union (OBUSU)"
            description="An autonomous, non-political, and secular student union committed to academic and social rights."
          />
          <motion.div
            {...fadeInUp}
            className="space-y-4 rounded-2xl border border-primary/10 bg-white/95 p-6 shadow-xl backdrop-blur"
          >
            <p className="text-sm text-muted-foreground">
              Oda Bultum University Student Union (OBUSU), prior to its establishment as a formal
              student union in 2006, was initially organized in the form of a student council.
              However, due to the increasing diversity of student needs and the limitations of the
              council system, a broader and more structured organization became necessary. As a
              result, the council was transformed into OBUSU under its own constitution, adopted in
              July 2006.
            </p>
            <p className="text-sm text-muted-foreground">
              Since then, OBUSU has been actively engaged in promoting socio-cultural and economic
              development within the university community. Over time, it has expanded its scope and
              impact, achieving significant progress and continuing to grow as a strong and
              effective student organization.
            </p>
            <p className="text-sm text-muted-foreground">
              The union is autonomous, non-political, and secular. It is formed and governed by
              students with the main objective of safeguarding academic and social rights. OBUSU
              serves all undergraduate and postgraduate students enrolled in regular programs.
            </p>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-l-4 border-l-primary/90 bg-white/95 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Ensure the best interests of students in academic and service areas are
                  maintained.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Closely observe student needs and activities.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Identify and address student problems.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Communicate unresolved issues to relevant authorities.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary/90 bg-white/95 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Strengthen unity within diversity.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Promote peace, love, and cooperation among students.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Contribute to long-term national development solutions.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Build a progressive and competitive academic community.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary/90 bg-white/95 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Objectives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Solve academic, social, and economic student problems.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Ensure service quality within the university.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Maintain harmony in teaching and learning processes.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Act as a bridge between students and university management.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Promote student participation in decision-making.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Strengthen unity and understanding among students.
                </p>
                <p className="flex gap-2">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 text-primary" />
                  Organize student-focused events and activities.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="relative bg-gradient-to-b from-white to-blue-50/55 py-16">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="What We Offer"
            title="Core Student Services"
            description="From advocacy to skills development, our programs are designed around student needs."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <motion.div key={service.id} {...fadeInUp}>
                <Card className="h-full border-primary/10 bg-white/95 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
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

      <section className="relative overflow-hidden bg-gradient-to-r from-slate-100 via-blue-50 to-amber-50 py-18">
        <div className="pointer-events-none absolute -right-20 top-8 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-12 bottom-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <Container className="relative space-y-10">
          <SectionHeader
            eyebrow="Student Voices"
            title="Testimonials"
            description="What students are saying about OBUSU."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((item) => (
              <motion.div key={item.id} {...fadeInUp}>
                <Card className="h-full border-primary/10 bg-white/95 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
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
