import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Home() {
  return (
    <div sx={{
      flexGrow: 1,
      padding: '20px',
      backgroundImage: 'url(/path/to/your/background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
    }}>
      <Grid container spacing={4} justifyContent="center">

        <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '50px' }}>
          <Typography variant="h1" sx={{ 
              fontWeight: 'bold',
              fontFamily: 'Palatino, "Palatino Linotype", serif',
              fontSize: '4rem',
          }}>
            John Greenough
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '16px', marginLeft: '150px', marginRight: '150px' }}>
          <Typography variant="body1" sx={{
            fontWeight: 'bold',
            fontFamily: 'Palatino, "Palatino Linotype", serif',
            fontSize: '1.5rem',
          }}>
            Welcome to my personal website. I am studying Management Engineering at the University of Waterloo, with an option in Computing. I am passionate about Full Stack Development, Data
            Analytics, and creating innovative solutions in Finance and Web Development.
          </Typography>
        </Grid>

        {/* Add other sections like experience, projects, etc., as needed */}

        <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '16px' }}>
          {/* Buttons for Portfolio, About Me, Contact, etc. */}
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '16px' }}>
          <Button href="https://linkedin.com/in/[YourLinkedInProfile]" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </Button>
          <Button href="https://github.com/[YourGitHubUsername]" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </Button>
          <Button href="https://twitter.com/[YourTwitterHandle]" target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </Button>
        </Grid>

      </Grid>
    </div>
  );
}