import { theme } from '@/app/theme';
import React from 'react'
import styled from 'styled-components';
import SectionMargin from '../atoms/SectionMargin';

const SFooterWrapper = styled.div`
    width: 100%;
    background-color: ${theme.ContentsColors.sub};
`;

const SSenteceContainer = styled.div`
    width: ${theme.contentWidth};
    margin-left: auto;
    margin-right: auto;
    color: ${theme.ContentsColors.main};
`;

const SBlogTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    
`;

const SDescription = styled.p`
    width: 600px;
    margin-top: 24px;
    font-weight: 300;
`;

const SHorizontalLine = styled.div`
  margin-top: 7px;
  width: 100%;
  height: 1px;
  background-color: ${theme.ContentsColors.main};
`;

const SCopyright = styled.div`
    font-size: 16px;
    padding-top: 38px;
    padding-bottom: 38px;
    text-align: center;
`;

const Footer = () => {
    const d = new Date();
    const year = d.getFullYear();

    return (
    <SFooterWrapper>
        <SSenteceContainer>
            <SectionMargin />
            <SBlogTitle>WARATAKE BLOG</SBlogTitle>
            <SDescription>A Frontend focused Web Developer building the Frontend of Websites and Web Applications that leads to the success of the overall product</SDescription>
            <SectionMargin />
            <SHorizontalLine />
            <SCopyright>© Copyright {year} . Made by Takeru Fujiwara</SCopyright>
        </SSenteceContainer>
    </SFooterWrapper>
    )
}

export default Footer
