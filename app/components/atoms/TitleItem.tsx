import { theme } from '@/app/theme';
import React, { Children, } from 'react'
import styled from 'styled-components';

type TitleItemProps = {
  children: React.ReactNode;
  color?: string;
}

const STitleItem = styled.a`
  font-size: ${theme.maxItemFontSize};
  font-weight: bold;
  letter-spacing: -3px;
  color: ${props => props.color || theme.mainContentsColor};
`;

const TitleItem: React.FC<TitleItemProps> = ({children, color}) => {
  return (
    <STitleItem color={color}>{children}</STitleItem>
  )
}

export default TitleItem
