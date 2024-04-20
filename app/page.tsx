'use client';
import React from "react"
import styled from "styled-components"
import { theme } from "./theme";

import SectionMargin from "./components/atoms/SectionMargin";
import Header from "./components/organisms/Header";
import NewArticle from "./components/organisms/NewArticle";
import ArticleCard from "./components/molecules/ArticleCard";
import AllArticles from "./components/organisms/AllArticles";
import Footer from "./components/organisms/Footer";
import { getAllPosts } from "@/lib/notion/notion";

// export const getStaticProps = async () => {
//   const allPosts = await getAllPosts();
//   console.log(allPosts)
//   return {
//     props: {
//       allPosts,
//     },
//     revalidate: 60,
//   }
// }

// const allPosts = async () => await getAllPosts();

export async function getServerSideProps() {
  const allPosts = await getAllPosts();

  return {
    props: { allPosts }, // ページコンポーネントにデータを渡す
  };
}

export default async function Home({allPosts}: any) {
  console.log("test")
  console.log(allPosts)
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
