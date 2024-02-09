import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import NavItem from './components/NavItem';

interface Props {
  pages: {
    home: Array<PageItem>;
    copilots: Array<PageItem>;
    account: Array<PageItem>;
    knowledge: Array<PageItem>;
    blog: Array<PageItem>;
    prompts: Array<PageItem>;
  };
}

const SidebarNav = ({ pages }: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const {
    home: homePages,
    copilots: copilotsPages,
    knowledge: knowledgePages,
    account: accountPages,
    prompts: promptsPages,
    blog: blogPages,
  } = pages;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="theFront"
          width={{ xs: 100, md: 120 }}
        >
          <Box
            component={'img'}
            src={
              mode === 'light'
                ? '/cleverbridge-primary-logo-2-medium.png'
                : '/cleverbridge-primary-logo-reverse-2-medium.png'
            }
            height={1}
            width={1}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <NavItem title={'Home'} items={homePages} />
        </Box>
        <Box>
          <NavItem title={'Copilots'} items={copilotsPages} />
        </Box>
        <Box>
          <NavItem title={'Knowledgebase'} items={knowledgePages} />
        </Box>
        <Box>
          <NavItem title={'Prompts'} items={promptsPages} />
        </Box>
        <Box>
          <NavItem title={'Blog'} items={blogPages} />
        </Box>
        <Box>
          <NavItem title={'Account'} items={accountPages} />
        </Box>

        <Box marginTop={2}>
          <Button
            size={'large'}
            variant="outlined"
            fullWidth
            component="a"
            href="https://www.cleverbridge.com"
            target={'blank'}
          >
            Documentation
          </Button>
        </Box>
        <Box marginTop={1}>
          <Button
            size={'large'}
            variant="contained"
            color="primary"
            fullWidth
            component="a"
            target="blank"
            href="https://www.cleverbridge.com"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
