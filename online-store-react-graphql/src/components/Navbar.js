import React from "react";
import {
  Box,
  Text,
  Heading,
  Image
} from "gestalt";

import { NavLink } from "react-router-dom";

const Navbar = () => (
  <Box
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
    display="flex"
    alignItems="center"
    justifyContent="around"
  >
    {/* Sign In link */}
    <NavLink activeClassName="active" to="/signin">
      <Text size='xl' color="white">
        Sign In
      </Text>
    </NavLink>

    {/* Title and Logo */}
    <NavLink activeClassName="active" to="/" exact>
      <Box display="flex" alignItems="center">
        <Box height={50} width={50} margin={2}>
          <Image
            src="./icons/logo.svg"
            alt="BrewHaha Logo"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        <Heading size="xs" color="orange">
          BrewhHaha
        </Heading>
      </Box>
    </NavLink>

    {/* Sign Up link */}
    <NavLink activeClassName="active" to="/signup">
      <Text size='xl' color="white">
        Sign Up
      </Text>
    </NavLink>
  </Box>
)

export default Navbar;
