import { theme } from '@/app/theme';
import React from 'react'
import styled from 'styled-components'
import ArticleTag from '../atoms/ArticleTag';

const CardWrapper = styled.div`
  width: 32%;
  height: 100%;
  color: ${props => props.color || theme.ContentsColors.main};
  margin-bottom: 16px;
`;

const SImage = styled.img`
  width: 100%;
  height: 224px;
  object-fit: cover;
`;

const SDate = styled.p`
margin-top: 8px;
margin-bottom: 8px;
  color: #777777;
  font-size: 16px;
  font-weight: 700;
`;

const SArticleTtile = styled.h3`
  color: ${theme.ContentsColors.sub};
  font-size: ${theme.fontsize.base};
  font-weight: 900;
  line-height: 44px;
`;

const TagsWrapper = styled.div`
  display: flex;
`;



const ArticleCard = () => {
  return (
    <CardWrapper>
      <SImage src="./forntend.png" /> 
      <SDate>2024 3 / 4</SDate>
      <SArticleTtile>【哲学】義手義足が発達した世の中で、手足の切断はファッションになるのか</SArticleTtile>
      <TagsWrapper>
        <ArticleTag color={theme.ContentsColors.sub} />
        <ArticleTag color={theme.ContentsColors.sub} />
      </TagsWrapper>
    </CardWrapper>
  )
}

export default ArticleCard
