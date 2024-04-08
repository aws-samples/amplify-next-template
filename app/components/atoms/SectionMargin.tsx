import React from 'react'
import styled from 'styled-components';
import { theme } from '../../theme';

const SSectionMargin = styled.div`
  height: ${theme.sectionMargin};
`;

const SectionMargin = () => {
  return (
    <SSectionMargin />
  )
}

export default SectionMargin
