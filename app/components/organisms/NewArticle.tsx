import React from 'react'
import styled from 'styled-components';
import { theme } from '../../theme';
import TitleItem from '../atoms/TitleItem';
import ArticleTag from '../atoms/ArticleTag';

const SNewArticleWrapper = styled.div`
  background-color: ${theme.ContentsColors.sub};
`;

const SFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${theme.contentWidth};
  margin-right: auto;
  margin-left: auto;
`

const SSenteceContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
  margin-right: 16px;
`
const SDate = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #B2B2B2;
  margin-bottom: 8px;
`

const SNewArticleTitle = styled.h2`
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  color: ${theme.ContentsColors.main};
`

const TagsWrapper = styled.div`
  display: flex;
`;

const SImage = styled.img`
  width: 28vw;
  object-fit: cover;
`

const NewArticle = () => {
  return (
    <SNewArticleWrapper>
        <SFlexContainer>
            <SSenteceContainer>
                <TitleItem color={theme.ContentsColors.main}>New Article</TitleItem>
                <SDate>2024 3/4</SDate>
                <SNewArticleTitle>【哲学】義手義足が発達した世の中で、手足の切断はファッションになるのか</SNewArticleTitle>
                <TagsWrapper>
                  <ArticleTag color={theme.ContentsColors.main} />
                  <ArticleTag color={theme.ContentsColors.main} />
                </TagsWrapper>
            </SSenteceContainer>
            <SImage src="./forntend.png" />
        </SFlexContainer>
    </SNewArticleWrapper>
  )
}

export default NewArticle
