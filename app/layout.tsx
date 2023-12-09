'use client';

import './globals.css'
 
import React, { useEffect, useState } from 'react';

import { Amplify } from 'aws-amplify';

import awsExports from '../src/aws-exports';


import { Message } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Button, Flex, Heading, Image, Text, Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { NavBarHeader } from './components/NavBarHeader/NavBarHeader'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <>
    <NavBarHeader className="nav-bar-header" />
      <Message colorTheme="info" heading="Message heading">This is message content.</Message>
      <Authenticator>
        {({ signOut }) => (
          <main> 
            <h1>Hello</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>


      <Grid container spacing={2}>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </>
  );
}