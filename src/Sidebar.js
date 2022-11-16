import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BallotIcon from "@mui/icons-material/Ballot";
import CampaignIcon from "@mui/icons-material/Campaign";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { Badge } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { toggleMenu } from "./redux/actions";
import { useAuth } from "./redux/auth";
import { useNotifications } from "./redux/notification";
import { useResidentProfiles } from "./redux/profiles";
import routes, { getAbsolutePath } from "./routes";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(5)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [{}, { logout }] = useAuth();
  const open = useSelector((state) => state.menu.isSidebarOpened);
  const [{ activeProfile }] = useResidentProfiles();
  const [
    {
      chatNotifications,
      announcementNotifications,
      amenityNotifications,
      amenityItemNotifications,
      profileNotifications,
    },
    {
      getChatNotifications,
      getAmenityNotifications,
      getAmenityItemNotifications,
      getAnnouncementNotifications,
      getProfileNotifications,
    },
  ] = useNotifications();

  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:3333");
    setSocket(newSocket);
  }, [setSocket]);

  const notificationListener = (message) => {
    getChatNotifications();
    getAmenityNotifications();
    getAmenityItemNotifications();
    getAnnouncementNotifications();
    getProfileNotifications();
  };

  useEffect(() => {
    socket?.on(
      `notification-${activeProfile?.houseCouncil?._id}`,
      notificationListener
    );
    return () =>
      socket?.off(
        `notification-${activeProfile?.houseCouncil?._id}`,
        notificationListener
      );
  }, [notificationListener, activeProfile?.houseCouncil]);

  useEffect(() => {
    if (activeProfile) {
      getChatNotifications();
    }
    // getAmenityNotifications();
    // getAmenityItemNotifications();
    // getAnnouncementNotifications();
    // getProfileNotifications();
  }, [
    getChatNotifications,
    // getAmenityNotifications,
    // getAmenityItemNotifications,
    // getAnnouncementNotifications,
    // getProfileNotifications,
  ]);

  const handleDrawerClose = () => {
    dispatch(toggleMenu(false));
  };

  const logoutClick = () => {
    logout()
      .unwrap()
      .then(() => navigate(getAbsolutePath(routes.signin.path)));
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {activeProfile && (
          <>
            <Link
              key="dashboard"
              to={routes.dashboard.path}
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleDrawerClose}
            >
              <ListItem
                key="Dashboard"
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  {" "}
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              key="announcements"
              to={routes.announcements.path}
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleDrawerClose}
            >
              <ListItem
                key="Announcements"
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  {" "}
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <CampaignIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Announcements"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              key="amenities"
              to={routes.amenities.path}
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleDrawerClose}
            >
              <ListItem
                key="Amenities"
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  {" "}
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <BallotIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Amenities"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              key="chat"
              to={routes.chat.path}
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleDrawerClose}
            >
              <ListItem key="Chat" disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  {" "}
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {chatNotifications !== 0 && (
                      <Badge badgeContent={chatNotifications} color="primary">
                        <QuestionAnswerIcon />
                      </Badge>
                    )}
                    {chatNotifications === 0 && <QuestionAnswerIcon />}
                  </ListItemIcon>
                  <ListItemText primary="Chat" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              key="residents"
              to={routes.residents.path}
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleDrawerClose}
            >
              <ListItem
                key="residents"
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  {" "}
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Residents"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )}
        <Link
          key="chooser"
          to={routes.chooser.path}
          style={{ textDecoration: "none", color: "black" }}
          onClick={handleDrawerClose}
        >
          <ListItem key="chooser" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              {" "}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SwitchAccountIcon />
              </ListItemIcon>
              <ListItemText
                primary="Switch Profile"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          key="accountSettings"
          to={routes.accountSettings.path}
          style={{ textDecoration: "none", color: "black" }}
          onClick={handleDrawerClose}
        >
          <ListItem
            key="AccountSettings"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              {" "}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                primary="Account Settings"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem key="logout" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={logoutClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
