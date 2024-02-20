"use client";

import Hero from "@/app/components/hero"
import MultiActionAreaCard from "@/app/components/cards"
import { Divider, Grid } from "@mui/material";
import styles from "./styles.module.css"

export default function Home() {
  return (
    <div>
      <Hero text="Serving SMB's" subText='Adaptable Consultants for AI Solutions' actionText="Explore More!" />
      <Divider />
      <Grid container
        spacing={0}
        alignItems="center"
        justifyContent="center">
        <Grid xs={12} md={4}>
          <MultiActionAreaCard image='/hero.webp' />
        </Grid>
        <Grid xs={12} md={4}>
          <MultiActionAreaCard image='/hero.webp' />
        </Grid>
        <Grid xs={12} md={4}>
          <MultiActionAreaCard image='/hero.webp' />
        </Grid>
      </Grid>
    </div>
  );
}