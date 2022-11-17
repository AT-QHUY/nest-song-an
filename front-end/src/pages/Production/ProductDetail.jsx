import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { productApi } from "../../api/productApi";
import { Loading } from "../../components/Loading/Loading";
import {
    CART_ADDING_SUCCESS,
    CART_LOADING_FAIL,
    CART_LOADING_REQUEST,
    selectCart,
} from "../../features/cart/cartSlice";
import {
    PRODUCT_LOADING_FAIL,
    PRODUCT_LOADING_ONE,
    PRODUCT_LOADING_REQUEST,
    selectProduct,
} from "../../features/production/productSlice";
import {
    convertPriceToString,
    getErrorMessageFromServer,
} from "../../utils/serverUtils";
import { billApi } from "../../api/billApi";
import { selectUser } from "../../features/user/userSlice";
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@mui/material";
import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer } from "../../components/Footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const ProductDetail = () => {
    const dispatch = useDispatch();
    const [productAmount, setProductAmount] = useState(1);
    const products = useSelector(selectProduct);
    const cart = useSelector(selectCart);
    const user = useSelector(selectUser);
    const product = products.product;
    const productId = useParams();
    const navigate = useNavigate();
    const [productImage, setProductImage] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertCart, setAlertCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                dispatch(PRODUCT_LOADING_REQUEST());
                const response = await productApi.getProductById(productId.id);
                dispatch(PRODUCT_LOADING_ONE(response));
                setProductImage(response.listImages[0].imgPath);
            } catch (error) {
                const errorMessage = getErrorMessageFromServer(error);
                dispatch(PRODUCT_LOADING_FAIL(errorMessage));
            }
        };
        fetchProduct();
    }, [productId.id]);

    const handleAddToCart = async () => {
        if (user.token)
            try {
                dispatch(CART_LOADING_REQUEST());
                const response = await billApi.addToCart(
                    user.userInfor.id,
                    product,
                    productAmount
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

    console.log(product);

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
                <Loading />
            ) : products.productErrorMessage === 404 ? (
                navigate("*")
            ) : (
                <div className="bg-gray-100 p-24 h-auto relative">
                    <div className="flex bg-white p-20 relative">
                        <Slide direction="up" in={alert}>
                            <Alert
                                severity="success"
                                color="success"
                                sx={{
                                    position: "fixed",
                                    bottom: 50,
                                    left: 50,
                                }}
                            >
                                Thêm vào giỏ hàng thành công
                            </Alert>
                        </Slide>
                        <div className="w-[60%] px-14">
                            <img
                                src={productImage}
                                alt={product.name}
                                className="w-full h-[34rem] shadow-lg shadow-gray-400 object-cover"
                            />
                        </div>

                        <div className="w-[40%] flex flex-col">
                            <div>
                                <h1 className="text-4xl uppercase font-semibold font-verda">
                                    {product.name}
                                </h1>
                                <p className="text-orange-500 font-trebu font-semibold text-xl mt-10">
                                    Giá:{" "}
                                    {convertPriceToString(
                                        product.basePrice -
                                            product.basePrice * product.deal
                                    )}{" "}
                                    VNĐ{" "}
                                    {product.deal === 0 || (
                                        <span className="text-gray-400/60 text-lg font-thin line-through ml-4">
                                            {convertPriceToString(
                                                product.basePrice
                                            )}{" "}
                                            VNĐ
                                        </span>
                                    )}
                                </p>
                                <div className="flex mt-3">
                                    <p className="w-11/12 text-gray-500">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-6">
                                    {Object.keys(product).length === 0
                                        ? ""
                                        : product.listImages.map(
                                              (item, index) => (
                                                  <img
                                                      src={item.imgPath}
                                                      className="w-24 cursor-pointer border-2 rounded-md object-cover"
                                                      onMouseOver={() =>
                                                          setProductImage(
                                                              item.imgPath
                                                          )
                                                      }
                                                      key={index}
                                                  />
                                              )
                                          )}
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="mt-2 mb-1 flex">
                                    <div className="flex">
                                        <button
                                            className="px-4 border border-gray-300 text-sm flex items-center rounded-tl-3xl rounded-bl-3xl hover:bg-gray-100 transition-colors duration-200"
                                            onClick={() => {
                                                if (!productAmount)
                                                    return setProductAmount(1);
                                                if (productAmount > 1)
                                                    return setProductAmount(
                                                        (pre) => pre - 1
                                                    );
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <input
                                            value={productAmount}
                                            type="number"
                                            className="w-12 text-center border border-gray-300 font-medium"
                                            onChange={(e) => {
                                                const number = Number.parseInt(
                                                    e.target.value
                                                );
                                                if (number > product.quantity)
                                                    number = product.quantity;
                                                if (number < 1) number = 1;
                                                return setProductAmount(number);
                                            }}
                                            min="1"
                                            max={product.quantity}
                                            required
                                        />
                                        <button
                                            className="px-4 border border-gray-300 text-sm flex items-center rounded-tr-3xl rounded-br-3xl hover:bg-gray-100 transition-colors duration-200"
                                            onClick={() => {
                                                if (!productAmount)
                                                    return setProductAmount(1);
                                                if (
                                                    productAmount <
                                                    product.quantity
                                                )
                                                    return setProductAmount(
                                                        (pre) => pre + 1
                                                    );
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <button
                                        className="p-4 px-5 rounded-full bg-regal-blue/80 text-white ml-10 text-xs uppercase font-medium hover:bg-regal-blue transition-colors duration-200 flex items-center gap-2 relative disabled:bg-slate-200 disabled:text-gray-400"
                                        onClick={handleAddToCart}
                                        disabled={cart.loading}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCartPlus}
                                            className="w-5 h-5"
                                        />{" "}
                                        Thêm vào giỏ hàng
                                        {cart.loading && (
                                            <CircularProgress
                                                size={28}
                                                sx={{
                                                    color: "#00ADB5",
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    marginTop: "-12px",
                                                    marginLeft: "-12px",
                                                }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="absolute right-5 bottom-5 group">
                            {/* <div className="relative pt-10"> */}
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-regal-blue text-white rounded-full w-10 h-10 flex justify-center items-center group-hover:scale-150 transition-all duration-300 active:scale-90"
                            >
                                <ArrowBackIosNewIcon
                                    style={{ fontSize: "medium" }}
                                />
                                <div className="group-hover:scale-100 group-hover:rotate-0 scale-0 transition-all duration-300 absolute text-green-400 text-xs -rotate-180 -top-5 w-14 font-medium">
                                    Quay lại
                                </div>
                            </button>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};
