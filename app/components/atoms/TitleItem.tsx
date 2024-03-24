import { theme } from '@/app/theme';
import React, { Children, } from 'react'
import styled from 'styled-components';

type TitleItemProps = {
  children: React.ReactNode;
}

const STitleItem = styled.a`
  font-size: ${theme.maxItemFontSize};
  font-weight: bold;
  letter-spacing: -3px;
`;

const TitleItem: React.FC<TitleItemProps> = ({children}) => {
  return (
    <STitleItem>{children}</STitleItem>
  )
}

export default TitleItem
