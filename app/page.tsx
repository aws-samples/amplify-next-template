"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "./theme";
import TitleItem from "./components/atoms/TitleItem";

const SNewArticleWrapper = styled.div`
  background-color: ${theme.mainContentsColor};
`;

const SFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${theme.contentWidth};
  margin-right: auto;
  margin-left: auto;
`

const SSenteceContainer = styled.div`
  margin-right: 16px;
`
const SDate = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #B2B2B2;
`

const SNewArticleTitle = styled.h2`
  font-size: 40px;
  font-weight: 600;
  color: ${theme.subContentsColor};
`

const SImage = styled.img`
  width: 28vw;
`

export default function Home() {
  return (
    <main>
      <SNewArticleWrapper>
        <SFlexContainer>
          <SSenteceContainer>
            <TitleItem color={theme.subContentsColor}>New Article</TitleItem>
            <SDate>2024 3/4</SDate>
            <SNewArticleTitle>【哲学】義手義足が発達した世の中で、手足の切断はファッションになるのか</SNewArticleTitle>
          </SSenteceContainer>
          <SImage src="./forntend.png" />
        </SFlexContainer>
      </SNewArticleWrapper>
    </main>
  )
}
