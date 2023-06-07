import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import {
  AutoStoriesOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  HomeOutlined,
  MenuOutlined,
  MonetizationOnOutlined,
  PieChartOutlined,
  ShowChartOutlined,
  SsidChartOutlined,
  StackedBarChartOutlined,
  TableChartOutlined,
} from "@mui/icons-material";

const Item = ({ title, to, icon }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isActive = pathname.substring(1) === to.substring(1);

  return (
    <MenuItem
      active={isActive}
      style={{
        color: theme.palette.background,
      }}
      icon={icon}>
      <Link
        to={to}
        style={{
          textDecoration: "none",
          color: theme.palette.text.primary,
        }}>
        <Typography
          variant="body1"
          style={{
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
          }}>
          {title}
        </Typography>
      </Link>
    </MenuItem>
  );
};

const ProSidebar = ({ isNonMobile }) => {
  const theme = useTheme();
  // const [active, setActive] = useState("")
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [active, setActive] = useState("");
  const { pathname } = useLocation();


  const handleCollapsedChange = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
  <Box component="nav">
    <Box
      height="100%"
      width="100%"
      sx={{
        "& .ps-sidebar-container": {
          // background: "#4d547d !important",
          background: `${theme.palette.background.alt} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `${theme.palette.background.alt}`,
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .ps-menu-button:hover": {
          backgroundColor: `${theme.palette.secondary[300]} !important`,
          color: `${theme.palette.secondary[200]}`,
          // text: {
          //   color: `${theme.palette.secondary[400]}`,
          // },
        },
        "& .ps-menu-button": {
          backgroundColor: `${theme.palette.background.alt}`,
        },
      }}>
      <Sidebar
        className={`app ${toggled ? "toggled" : ""}`}
        style={{ position: "persistent",  }}
        collapsed={isCollapsed}
        toggled={toggled}
        handleCollapsedChange={handleCollapsedChange}
        handleToggleSidebar={handleToggleSidebar}>
        <Menu
          iconShape="square"
          menuItemStyles={() => ({
            button: {
              background: "red !important",
              "&:hover": {
                background: "green !important",
              },
            },
          })}>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={handleCollapsedChange}
            icon={
              isCollapsed ? <ChevronRightOutlined /> : <ChevronLeftOutlined />
            }
            style={{
              margin: "10px 0 20px 0",
            }}>
            {!isCollapsed && (
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
                {/* <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton> */}
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to="/dashboard" icon={<HomeOutlined />} />
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={theme.palette.secondary[400]}
                sx={{ m: "15px 0 5px 20px" }}>
                Federal Reserve Data
              </Typography>
            )}
            <SubMenu
              defaultOpen
              label="Net Liquidity"
              title="Net Liquidity"
              to="/list"
              icon={<TableChartOutlined />}>
              <Item title="Net Line" to="/net" icon={<ShowChartOutlined />} />
              <Item
                title="Liquidity Breakdown"
                to="/breakdown"
                icon={<PieChartOutlined />}
              />
              <Item title="Daily" to="/daily" icon={<SsidChartOutlined />} />
              <Item
                title="Monthly"
                to="/monthly"
                icon={<StackedBarChartOutlined />}
              />
            </SubMenu>
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={theme.palette.secondary[400]}
                sx={{ m: "15px 0 5px 20px" }}>
                Money Supply
              </Typography>
            )}
            <Item
              title="M Supply"
              to="/msupply"
              icon={<MonetizationOnOutlined />}
            />
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={theme.palette.secondary[400]}
                sx={{ m: "15px 0 5px 20px" }}>
                Resources
              </Typography>
            )}
            <Item
              title="Glossary"
              to="/glossary"
              icon={<AutoStoriesOutlined />}
              // selected={selected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  </Box>
  );
};

export default ProSidebar;
