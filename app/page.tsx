"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "./theme";
import TitleItem from "./components/atoms/TitleItem";

const SNewArticleWrapper = styled.div`
  background-color: ${theme.baseColor};
`;

const SContentContainer = styled.div`
  width: ${theme.contentWidth};
  margin-right: auto;
  margin-left: auto;
`

const STitleItem = styled.a`
  font-size: ${theme.maxItemFontSize};
  font-weight: bold;
  letter-spacing: -3px;
  color: white;
`;

export default function Home() {
  return (
    <main>
      <SNewArticleWrapper>
        <SContentContainer>
          <STitleItem>New Article</STitleItem>
        </SContentContainer>
      </SNewArticleWrapper>
    </main>
  )
}
