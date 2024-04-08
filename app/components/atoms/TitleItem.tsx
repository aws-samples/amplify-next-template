import { theme } from '@/app/theme';
import React, { Children, } from 'react'
import styled from 'styled-components';

type TitleItemProps = {
  children: React.ReactNode;
  fontSize?: string;
  color?: string;
}

interface STitleItemProps {
  fontSize?: string;
  color?: string;
}

const STitleItem = styled.a<STitleItemProps>`
  font-size: ${props => props.fontSize || theme.fontsize.xlarge};
  font-weight: bold;
  letter-spacing: -3px;
  color: ${props => props.color || theme.ContentsColors.sub};
`;

const TitleItem: React.FC<TitleItemProps> = ({children,fontSize ,color}) => {
  return (
    <STitleItem fontSize={fontSize} color={color}>{children}</STitleItem>
  )
}

export default TitleItem
