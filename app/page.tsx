"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "./theme";

import Header from "./components/organisms/Header";
import NewArticle from "./components/organisms/NewArticle";
import SectionMargin from "./components/atoms/SectionMargin";
import ArticleCard from "./components/molecules/ArticleCard";
import AllArticles from "./components/organisms/AllArticles";
import Footer from "./components/organisms/Footer";


export default function Home() {
  return (
    <main>
      <SectionMargin />
      <Header />
      <SectionMargin />
      <NewArticle />
      <SectionMargin />
      
      <AllArticles />
      <SectionMargin />

      <Footer />
    </main>
  )
}
