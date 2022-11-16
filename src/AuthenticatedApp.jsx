import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AmenityPage from "./features/Amenity";
import { Chat } from "./features/Chat";
import { Residents } from "./features/Residents";
import { useResidentProfiles } from "./redux/profiles";
import routes from "./routes";
const AccountSettings = React.lazy(() => import("./features/AccountSettings"));
const Sidebar = React.lazy(() => import("./Sidebar"));
const Navbar = React.lazy(() => import("./Navbar"));
const NotFound = React.lazy(() => import("./features/NotFound"));
const Dashboard = React.lazy(() => import("./features/Dashboard"));
const Chooser = React.lazy(() => import("./features/Chooser"));
const Announcements = React.lazy(() => import("./features/Announcements"));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function AuthenticatedApp() {
  const open = useSelector((state) => state.menu.isSidebarOpened);
  const [{ residents }, { getActiveProfile, getResidentsByHouseCouncil }] =
    useResidentProfiles();

  useEffect(() => {
    getActiveProfile();
  }, [getActiveProfile]);

  useEffect(() => {
    getResidentsByHouseCouncil();
  }, [getResidentsByHouseCouncil]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader flag={open} />
        <Routes>
          <Route path={routes.root.path} exact element={<Dashboard />} />
          <Route path={routes.chooser.path} exact element={<Chooser />} />
          <Route path={routes.dashboard.path} exact element={<Dashboard />} />
          <Route
            path={routes.accountSettings.path}
            exact
            element={<AccountSettings />}
          />
          <Route
            path={routes.announcements.path}
            exact
            element={<Announcements />}
          />
          <Route path={routes.amenities.path} exact element={<AmenityPage />} />
          <Route path={routes.residents.path} exact element={<Residents />} />
          <Route path={routes.chat.path} exact element={<Chat />} />

          <Route path={routes.all.path} element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}
