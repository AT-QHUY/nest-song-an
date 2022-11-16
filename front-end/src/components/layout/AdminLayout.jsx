import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ArticleIcon from "@mui/icons-material/Article";
import Person2Icon from "@mui/icons-material/Person2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Grid } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { productApi } from "../../api/productApi";
import { Outlet, useNavigate } from "react-router-dom";
import BasicMenu from "../Menu";
import Logo from "../../assets/icons/SongAnLogo.png";

const drawerWidth = 240;

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.secondary.main,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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

export default function AdminLayout({ children, setRerender }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [cateList, setCateList] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Thống kê");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await productApi.getCategory();
        setCateList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const inputArray = useMemo(() => {
    return [
      {
        name: "Thống kê",
        icon: <DashboardIcon />,
        url: "/dashboard",
      },
      {
        name: "Đơn hàng",
        icon: <LocalOfferIcon />,
        url: "/dashboard/order",
      },
      {
        name: "Sản phẩm",
        icon: <Inventory2Icon />,
        url: "/dashboard/product",
      },
      {
        name: "Người dùng",
        icon: <Person2Icon width={"36px"} />,
        url: "/dashboard/user",
      },
      {
        name: "Tin tức",
        icon: <ArticleIcon />,
        url: "/dashboard/news",
      },
    ];
  }, []);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Handle open form dialog

  const [formOpen, setFormOpen] = useState(false);

  const handleClickOpen = () => {
    setFormOpen(true);
  };

  const handleClose = () => {
    reset();
    setFormOpen(false);
  };

  //------------------------

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: "600" }}
            >
              {title}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "40px",
                }}
              >
                <BasicMenu />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img style={{ maxWidth: "48px" }} src={Logo} />
              <Typography sx={{ fontWeight: 600, paddingRight: "40px" }}>
                NestSongAn
              </Typography>
            </Box>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {inputArray.map((item, index) => (
            <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  setTitle(item.name);
                  navigate(item.url);
                }}
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
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    fontWeight: 600,
                  }}
                  primary={
                    <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
                      {item.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, backgroundColor: "#d9eeef" }}
        minHeight="100vh"
      >
        <DrawerHeader />
        <Grid
          container
          direction={"column"}
          spacing={"24px"}
          padding="24px"
          paddingLeft="48px"
          paddingTop={"48px"}
        >
          <Outlet />
        </Grid>
      </Box>

      {/* <ToastPageChange url={"/"} name={"Bán hàng"} /> */}
    </Box>
  );
}
