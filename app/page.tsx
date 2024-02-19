"use client";

import Hero from "@/app/components/hero"
import { Card, Divider, Flex, Heading } from "@aws-amplify/ui-react";

export default function Home() {
  return (
    <div>
      <Hero headerText="Serving SMB's" callToAction="Explore More!"/>
    </div>
  );
}