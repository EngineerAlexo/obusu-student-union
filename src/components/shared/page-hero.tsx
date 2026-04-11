"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/shared/container";

type PageHeroProps = {
  title: string;
  description: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="border-b bg-gradient-to-r from-primary to-blue-700 py-16 text-white shadow sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base text-white/90 sm:text-lg">{description}</p>
        </motion.div>
      </Container>
    </section>
  );
}
