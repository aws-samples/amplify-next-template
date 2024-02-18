// components/ConfigureAmplify.tsx
"use client";

import { Amplify } from "aws-amplify";

import config from "@/amplifyconfiguration.json";

Amplify.configure(config, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}