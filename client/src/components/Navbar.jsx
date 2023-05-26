import React, { useState } from "react";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useHistory } from "react-router-dom";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, navItems }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Filter navItems on search value
    const filteredResults = navItems.filter(
      (item) =>
        item.text.toLowerCase().includes(value.toLowerCase()) && item.icon
    );
    setSearchResults(filteredResults);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // search functionality here
    console.log("Search submitted:", searchValue);
    setSearchValue("");
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem" // top and bottom w/ 2 vals
          >
            <form onSubmit={handleSearchSubmit}>
              <InputBase
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
              />
            </form>
            <IconButton type="submit" onClick={handleSearchSubmit}>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
      {/* Display search suggestions or options */}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.text}>{result.text}</li>
          ))}
        </ul>
      )}
    </AppBar>
  );
};

export default Navbar;
