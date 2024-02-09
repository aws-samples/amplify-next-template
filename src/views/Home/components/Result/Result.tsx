import React from 'react';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';

const mock = [
  {
    image: 'PositiveCharts.png',
    description:
      'Start with a business outcome and ask what Cleverbrige features can improve it.',
    title: 'Outcomes Copilot',
    author: {
      name: 'Radu Immenroth',
      avatar: 'Radu.png',
    },
    date: '3 Feb',
  },
  {
    image: 'gears-business.webp',
    description:
      'Start with a feature and ask which business outcomes it improves.',
    title: 'Features Copilot',
    author: {
      name: 'Radu Immenroth',
      avatar: 'Radu.png',
    },
    date: '3 Feb',
  },
  {
    image: 'Writer.webp',
    description: 'Eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    title: 'Blog & Social Media Copilot',
    author: {
      name: 'Chary Smith',
      avatar: 'https://assets.maccarianagency.com/avatars/img6.jpg',
    },
    date: '22 Nov',
  },
  {
    image: 'Ideas.webp',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    title: 'Ideate and Brainstorm Copilot',
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
    },
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img24.jpg',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus',
    title: 'ROI Copilot',
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
    },
    date: '02 Aug',
  },
  {
    image: 'AB.webp',
    description: 'Get ideas for A/B testing with UI 1 Checkouts.',
    title: 'CRO Copilot',
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
    },
    date: '02 Aug',
  },
  {
    image: 'EnterpriseSecurity.webp',
    description: 'Use ChatGPT with enterprise-grade security and privacy.',
    title: 'ChatGPT',
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
    },
    date: '02 Aug',
  },
];

const Result = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          data-aos={'fade-up'}
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          The most popular
        </Typography>
        <Typography
          variant="h6"
          color={'text.secondary'}
          align={'center'}
          data-aos={'fade-up'}
        >
          Dive into a world where routine tasks are streamlined, and complex
          challenges are simplified.
          <br />
          These popular Copilots are here to assist you in every aspect of your
          daily business operations.
        </Typography>
      </Box>
      <Box
        padding={2}
        width={1}
        component={Card}
        boxShadow={4}
        marginBottom={4}
      >
        <form noValidate autoComplete="off">
          <Box display="flex" alignItems={'center'}>
            <Box width={1} marginRight={1}>
              <TextField
                sx={{
                  height: 54,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '0 !important',
                  },
                }}
                variant="outlined"
                color="primary"
                size="medium"
                placeholder="Search a Copilot"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component={'svg'}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                        color={'primary.main'}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box display={{ xs: 'none', sm: 'block' }} marginRight={2}>
              <Typography
                color={'text.secondary'}
                variant={'subtitle2'}
                sx={{ whiteSpace: 'nowrap' }}
              >
                5 Results
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{ height: 54, minWidth: 100, whiteSpace: 'nowrap' }}
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
              >
                Search
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box
              component={'a'}
              href={''}
              display={'block'}
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Box
                component={Card}
                width={1}
                height={1}
                boxShadow={4}
                display={'flex'}
                flexDirection={'column'}
                sx={{ backgroundImage: 'none' }}
              >
                <CardMedia
                  image={item.image}
                  title={item.title}
                  sx={{
                    height: { xs: 300, md: 360 },
                    position: 'relative',
                  }}
                >
                  <Box
                    component={'svg'}
                    viewBox="0 0 2880 480"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      color: theme.palette.background.paper,
                      transform: 'scale(2)',
                      height: 'auto',
                      width: 1,
                      transformOrigin: 'top center',
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z"
                      fill="currentColor"
                    />
                  </Box>
                </CardMedia>
                <Box component={CardContent} position={'relative'}>
                  <Typography variant={'h6'} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
                <Box flexGrow={1} />
                <Box padding={2} display={'flex'} flexDirection={'column'}>
                  <Box marginBottom={2}>
                    <Divider />
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Box display={'flex'} alignItems={'center'}>
                      <Avatar
                        src={item.author.avatar}
                        sx={{ marginRight: 1 }}
                      />
                      <Typography color={'text.secondary'}>
                        {item.author.name}
                      </Typography>
                    </Box>
                    <Typography color={'text.secondary'}>
                      {item.date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
        <Grid item container justifyContent={'center'} xs={12}>
          <Button
            fullWidth
            variant={'outlined'}
            size={'large'}
            sx={{ height: 54, maxWidth: 400, justifyContent: 'space-between' }}
            endIcon={
              <Box
                component={'svg'}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={24}
                height={24}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </Box>
            }
          >
            Load more
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Result;
