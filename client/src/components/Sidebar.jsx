import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  SsidChartOutlined,
  PieChartOutlined,
  ShowChartOutlined,
  TableChartOutlined,
  StackedBarChartOutlined,
  MonetizationOnOutlined,
  AutoStoriesOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Net Liquidity",
    icon: null,
  },
  {
    text: "List",
    icon: <TableChartOutlined />,
  },
  {
    text: "Net",
    icon: <ShowChartOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Net Change Overview",
    icon: null,
  },
  {
    text: "Daily",
    icon: <SsidChartOutlined />,
  },
  {
    text: "Monthly",
    icon: <StackedBarChartOutlined />,
  },
  {
    text: "Money Supply Overview",
    icon: null,
  },
  {
    text: "MSupply",
    icon: <MonetizationOnOutlined />,
  },
  {
    text: "Resources",
    icon: null,
  },
  {
    text: "Glossary",
    icon: <AutoStoriesOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isNonMobile && isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
              }),
            },
          }}>
          <Box width="100%">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt="20px">
              <img
                // height="100px"
                // width="75px"
                alt="logo-dark"
                style={{ cursor: "pointer" }}
                src={`https://i.imgur.com/JLl9qrI.png`}
              />
            </Box>
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                {/* <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h3" fontWeight="bold">
                    FED WATCH
                  </Typography>
                </Box> */}
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem", fontWeight: "500" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding sx={{
                    "& .MuiTypography-body1": {
                      fontWeight: 400,
                      }
                    }}>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                        className="jiggle-icon"
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
