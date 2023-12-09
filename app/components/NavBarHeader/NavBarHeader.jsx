import React from "react";
import { Button, Flex, Heading, Image, Text } from '@aws-amplify/ui-react';
 
import "./style.css"; 

export const NavBarHeader = ({ className }) => {
  return (
    <div className={`nav-bar-header ${className}`}>
      <div className="frame"> 
        <img className="header-logo" alt="Lyric Bosot" src="lyric-boost-logo.svg" />
        <div className="text-wrapper">Home</div>
        <div className="text-wrapper">Products</div>
         <div className="text-wrapper">Contact</div>
      </div>
      <div className="actions">
        <Button className="button-instance" isDisabled={false} label="Log in" size="default" variation="link">Log in</Button>
        <Button className="button-instance" isDisabled={false} label="Sign up" size="default" variation="primary">Sign up</Button>
      </div>
    </div>
  )}

  export default NavBarHeader