"use client"

import React from 'react'
import styled from 'styled-components'
import { theme } from '../theme';
import SectionMargin from './atoms/SectionMargin';
import TitleItem from './atoms/TitleItem';


const SConentWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: ${theme.contentWidth};
`;

const SFlexContainer = styled.div`
  display: flex;
`;

const SSideMessage = styled.p`
  position: relative;
  display: flex;
  top: 7px;
  margin-left: auto;
  width: 448px;
  padding: 0;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
`;

const SHorizontalLine = styled.div`
  margin-top: 7px;
  width: 100%;
  height: 2px;
  background-color: ${theme.baseColor};
`;

const SOptionWrapper = styled.div`
  display: flex;
  margin-top: 28px;
`;

const SOption = styled.a`
  margin-right: 36px;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
`;

const TopBar = () => {
  return (
    <>
      <SectionMargin />
      <SConentWrapper>
        <SFlexContainer>
          <TitleItem>Waratake Blog</TitleItem>
          <SSideMessage>I output my daily learnings and insights. I hope I can grow with everyone.</SSideMessage>
        </SFlexContainer>
        <SHorizontalLine />
        <SOptionWrapper>
          <SOption href="/">PORTFOLIO</SOption>
          <SOption href="/">BLOG</SOption>
        </SOptionWrapper>
        <SectionMargin />
      </SConentWrapper>
    </>
  )
}

export default TopBar
