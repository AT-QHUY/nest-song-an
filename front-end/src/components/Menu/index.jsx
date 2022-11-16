import * as React from "react";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useDispatch } from "react-redux";
import { ORDER_CLEAR } from "../../features/order/orderSlice";
import { USER_LOGOUT_SUCCESS } from "../../features/user/userSlice";
import { CART_CLEAR } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        dispatch(ORDER_CLEAR());
        dispatch(USER_LOGOUT_SUCCESS());
        dispatch(CART_CLEAR());
        navigate("/");
    };

    return (
        <div>
            <Button
                id="basic-button"
                sx={{ color: "#ffffff" }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <PermIdentityOutlinedIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={() => navigate("/user")}>
                    Thông tin cá nhân
                </MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
        </div>
    );
}
