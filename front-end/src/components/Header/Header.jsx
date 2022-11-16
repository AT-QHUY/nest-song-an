import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import UserDropDown from "../UserDropDown/UserDropDown";
import { HeaderBottom } from "./HeaderBottom";
import logo from "./../../assets/icons/SongAnLogo.png";
import {
    CART_LOADING_FAIL,
    CART_LOADING_REQUEST,
    CART_LOADING_SUCCESS,
    selectCart,
} from "../../features/cart/cartSlice";
import { Badge } from "@mui/material";
import { billApi } from "../../api/billApi";
import { getErrorMessageFromServer } from "../../utils/serverUtils";
import { useForm } from "react-hook-form";
import { FILTER_ADD_SEARCH } from "../../features/production/filterSlice";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

const Header = () => {
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const searchTimeoutRef = useRef();
    const [search, setSearch] = useState("");
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    // state yen
    useEffect(() => {
        const fetchCart = async () => {
            try {
                dispatch(CART_LOADING_REQUEST());
                const response = await billApi.getCart(user.userInfor.id);
                localStorage.setItem("cart", response[0]);
                dispatch(CART_LOADING_SUCCESS(response[0]));
            } catch (error) {
                const errorMessage = getErrorMessageFromServer(error);
                dispatch(CART_LOADING_FAIL(errorMessage));
            }
        };
        fetchCart();
    }, [user.token]);

    useEffect(() => {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        searchTimeoutRef.current = setTimeout(() => {
            // console.log(search);
        }, 600);
    }, [search]);

    const onSubmit = () => {
        dispatch(FILTER_ADD_SEARCH(search));
        // setSearch("");
        navigate(`/production`);
    };

    return (
        <div className="fixed w-full z-10">
            <div className="flex justify-between bg-[#000000CC]/75 text-white my-0">
                <Link
                    to="/"
                    className="md:ml-[10%] flex items-center text-lg my-2"
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <img
                        src={logo}
                        style={{ filter: "brightness(0) invert(1)" }}
                        className="w-8 mr-2.5"
                    />
                    Song Ân
                </Link>
                <HeaderBottom />
                <div className="flex my-2">
                    <div className="md:w-96 w-36 my-auto mx-3">
                        <form
                            className="relative"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                className="border-2 focus:outline-none block p-3 pl-12 w-full text-sm text-gray-900 bg-gray-50 rounded-xl dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Tìm kiếm sản phẩm"
                                pattern="[^'\x22]+"
                                title="Invalid input"
                                maxLength={150}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
                <div className="md:mr-[7%] flex items-center relative">
                    <UserDropDown />
                    <Link
                        to="/shopping-cart"
                        className="flex items-center px-2 hover:text-cyan-300"
                    >
                        <Badge
                            badgeContent={cart.cart.listBillDetails?.length}
                            color="secondary"
                        >
                            <LocalMallOutlinedIcon />
                            {/* <FontAwesomeIcon
                                icon={faCartShopping}
                                className={`w-6 px-1 ml-1 h-6 hover:cursor-pointer hover:text-cyan-300 transition-colors duration-100`}
                            /> */}
                        </Badge>
                    </Link>
                    {user.token && (
                        <div className="text-xs ml-5">
                            <div>Xin chào,</div>
                            <Link
                                className="hover:underline"
                                to="/user"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                {user.userInfor?.fullname}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
