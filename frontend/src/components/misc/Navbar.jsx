import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { useDisclosure } from "@mantine/hooks";
import React, { useState,useEffect } from "react";


import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  rem,
  Switch,
  useMantineTheme
} from "@mantine/core";

/* https://mantine.dev/core/switch/ */

import { IconSun, IconMoonStars } from '@tabler/icons-react';




const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  light: {
    background: "#f3f3f3",
    color: "black",
  },
  dark: {
    background: "#333333",
    color: "white",
  },
}));

const Navbar = () => {
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };


  // THIS AREA IS INCOMPLETE
  const links = !!user
    ? [
      <NavLink key="home" to="/">
        <h4>Home</h4>
      </NavLink>,
      <NavLink key="posts" to="posts">
        {" "}
        <h4>Posts</h4>
      </NavLink>,
      <h4 key="logout" className="logout" onClick={onLogout}>
        Logout
      </h4>
    ]
    : [
      <NavLink key="home" to="/">
        <h4>Home</h4>
      </NavLink>,
      <NavLink key="login" to="login">
        <h4>Login</h4>
      </NavLink>
    ];

  const theme = useMantineTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Header height={60} mb={120} className={cx(classes.header, { [classes.light]: !isDarkMode, [classes.dark]: isDarkMode })}>
      <Container className={classes.header}>
        <h4>LOGO</h4>
        <Group spacing={5} className={classes.links} position="center">
          {links}

        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Group position="center">
          <Switch
            size="md"
            color={isDarkMode ? "gray" : "dark"}
            onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
            offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
            onChange={handleThemeToggle}
            checked={isDarkMode}
          />
        </Group>


      </Container>

    </Header>


    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     paddingInline: "40px",
    //     background: "#f3f3f3",
    //   }}
    // >
    //   <NavLink to="/">
    //     <h3 style={{ color: "black" }}>LOGO</h3>
    //   </NavLink>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "flex-end",
    //       alignItems: "center",
    //       gridColumnGap: "40px",
    //     }}
    //   >
    // <NavLink to="/">
    //   <h4>Home</h4>
    // </NavLink>
    // {!!user && (
    //   <NavLink to="posts">
    //     {" "}
    //     <h4>Posts</h4>
    //   </NavLink>
    // )}
    //     {!!user ? (
    //       <h4 className="logout" onClick={onLogout}>
    //         Logout
    //       </h4>
    //     ) : (
    //       <NavLink to="login">
    //         <h4>Login</h4>
    //       </NavLink>
    //     )}
    //   </div>
    // </div>
  );
};

export default Navbar;