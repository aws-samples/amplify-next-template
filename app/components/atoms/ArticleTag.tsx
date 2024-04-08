import React from 'react'
import IonLogoDocker from '../icons/IonLogoDocker'
import styled from 'styled-components';
import { theme } from '@/app/theme';

type ArticleTagProps = {
  color?: string;
}

const TagWrapper = styled.a`
  height: 32px;
  color: ${props => props.color || theme.ContentsColors.main};
  display: flex;
  align-items: center;
  margin-right: 40px;
  margin-top: 10px;
  margin-bottom: 24px;
`;

const IconWrapper = styled.div`
  font-size: 20px;
  height: 100%;
`;

const TagName = styled.p`
  margin-left: 6px;
  font-size: 18px;
  font-weight: 400;
`

const ArticleTag: React.FC<ArticleTagProps> = ({ color}) => {
  return (
    <TagWrapper color={color}>
      <IconWrapper>
        <IonLogoDocker />
      </IconWrapper>
      <TagName>Docker</TagName>
    </TagWrapper>
  )
}

export default ArticleTag
