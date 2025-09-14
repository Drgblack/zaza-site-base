"use client";
import * as React from "react";

export default function CommunityHub({ locale }: { locale: string }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Community</h1>
      <p className="text-muted-foreground">
        Our educator community for {locale.toUpperCase()} is coming soon.
      </p>
    </section>
  );
}