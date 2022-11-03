import {
    faCartPlus,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, CircularProgress, Slide } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { billApi } from "../../api/billApi";
import { productApi } from "../../api/productApi";
import {
    CART_ADDING_SUCCESS,
    CART_LOADING_FAIL,
    CART_LOADING_REQUEST,
    selectCart,
} from "../../features/cart/cartSlice";
import {
    FILTER_CLEAR_SEARCH,
    selectFilter,
} from "../../features/production/filterSlice";
import {
    PRODUCT_LOADING_FAIL,
    PRODUCT_LOADING_BY_PAGE_SUCCESS,
    PRODUCT_LOADING_REQUEST,
    selectProduct,
} from "../../features/production/productSlice";
import { selectUser } from "../../features/user/userSlice";
import {
    convertPriceToString,
    getErrorMessageFromServer,
} from "../../utils/serverUtils";
import { Loading } from "../Loading/Loading";
import { Pagination } from "./Pagination";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export const List = ({ inProductPage, category }) => {
    const [alertCart, setAlertCart] = useState(false);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const filter = useSelector(selectFilter);
    let { search, ...filterList } = filter;
    filterList.name = [...filter.name, search];

    const products = useSelector(selectProduct);
    const user = useSelector(selectUser);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(false);

    // console.log(filterList);
    useEffect(() => {
        window.scroll(0, 0);
        dispatch(FILTER_CLEAR_SEARCH());
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                dispatch(PRODUCT_LOADING_REQUEST());
                const response = await productApi.getProductByFilter(
                    filterList
                );
                dispatch(PRODUCT_LOADING_BY_PAGE_SUCCESS(response));
                setPage(1);
            } catch (error) {
                const errorMessage = getErrorMessageFromServer(error);
                dispatch(PRODUCT_LOADING_FAIL(errorMessage));
            }
        };
        fetchProduct();
    }, [filter]);

    useEffect(() => {
        setPage(1);
    }, [category]);

    let productList = [...products.products];
    if (products.products.length !== 0 && category !== undefined)
        if (category.id !== 0)
            productList = [...products.products].filter(
                (product) => product.cateId === category.id
            );

    const handleAddToCart = async (product) => {
        if (user.token)
            try {
                dispatch(CART_LOADING_REQUEST());
                const response = await billApi.addToCart(
                    user.userInfor.id,
                    product,
                    1
                );
                localStorage.setItem("cart", response);
                dispatch(CART_ADDING_SUCCESS(response));
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 2000);
            } catch (error) {
                const errorMessage = getErrorMessageFromServer(error);
                dispatch(CART_LOADING_FAIL(errorMessage));
            }
        else setAlertCart(true);
    };

    return (
        <>
            {alertCart && (
                <Dialog open={alertCart} onClose={() => setAlertCart(false)}>
                    <DialogTitle id="alert-dialog-title">
                        {"BẠN CHƯA ĐĂNG NHẬP"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bạn phải đăng nhập để có thể mua hàng
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() =>
                                setAlertCart(false, navigate("/sign-in"))
                            }
                            autoFocus
                        >
                            Đăng nhập
                        </Button>
                        <Button onClick={() => setAlertCart(false)}>
                            Đóng
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            {products.loading ? (
                inProductPage && <Loading />
            ) : (
                <div className="flex flex-col justify-around">
                    <Slide direction="up" in={alert}>
                        <Alert
                            severity="success"
                            color="success"
                            sx={{
                                position: "fixed",
                                bottom: 50,
                                right: 50,
                                zIndex: 1000,
                            }}
                        >
                            Thêm vào giỏ hàng thành công
                        </Alert>
                    </Slide>
                    <div className="grid-cols-3 grid gap-7">
                        {productList.length === 0 ? (
                            <div className="text-center font-semibold text-gray-600 col-span-3 p-10 text-2xl h-screen">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
                                Không tìm thấy sản phẩm nào
                            </div>
                        ) : (
                            productList.map(
                                (card, index) =>
                                    index < page * 9 &&
                                    index >= (page - 1) * 9 && (
                                        <div
                                            className="mb-6 shadow-md"
                                            key={index}
                                        >
                                            <Link
                                                to={`/production/${card.id}`}
                                                onClick={() =>
                                                    window.scrollTo(0, 0)
                                                }
                                            >
                                                <img
                                                    src={
                                                        card.listImages[0]
                                                            .imgPath
                                                    }
                                                    className="object-cover aspect-square rounded-md"
                                                />
                                            </Link>

                                            <div className="pt-4 p-1 flex flex-col gap-1.5 m-4 mt-0">
                                                <Link
                                                    to={`/production/${card.id}`}
                                                    onClick={() =>
                                                        window.scrollTo(0, 0)
                                                    }
                                                >
                                                    <h1 className="uppercase font-bold font-verda h-12">
                                                        {card.name}
                                                    </h1>
                                                </Link>
                                                <div className="truncate text-gray-400/80">
                                                    {card.description}
                                                </div>
                                                <div className="text-orange-500 font-trebu relative">
                                                    <div className="flex justify-between p-2 pl-0">
                                                        <div>
                                                            <div className="font-semibold">
                                                                {convertPriceToString(
                                                                    card.basePrice -
                                                                        card.basePrice *
                                                                            card.deal
                                                                )}{" "}
                                                                VNĐ
                                                            </div>
                                                            {card.deal ===
                                                                0 || (
                                                                <div className="text-gray-400/60 text-sm font-thin line-through">
                                                                    {convertPriceToString(
                                                                        card.basePrice
                                                                    )}{" "}
                                                                    VNĐ
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div
                                                            className="relative"
                                                            onClick={() =>
                                                                handleAddToCart(
                                                                    card
                                                                )
                                                            }
                                                            disabled={
                                                                cart.loading
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faCartPlus
                                                                }
                                                                className={`w-8 h-8 mt-0.5 hover:cursor-pointer hover:text-regal-blue ${
                                                                    cart.loading
                                                                        ? "text-slate-300"
                                                                        : ""
                                                                }`}
                                                            />
                                                            {cart.loading && (
                                                                <CircularProgress
                                                                    size={28}
                                                                    sx={{
                                                                        color: "#00ADB5",
                                                                        position:
                                                                            "absolute",
                                                                        top: "50%",
                                                                        left: "50%",
                                                                        marginTop:
                                                                            "-12px",
                                                                        marginLeft:
                                                                            "-12px",
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            )
                        )}
                    </div>
                    {inProductPage && (
                        <Pagination
                            page={page}
                            products={productList}
                            setPage={setPage}
                        />
                    )}
                </div>
            )}
        </>
    );
};
