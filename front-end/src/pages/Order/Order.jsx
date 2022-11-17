import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { billApi } from "../../api/billApi";
import {
    ORDER_CANCEL,
    ORDER_LOADING,
    ORDER_LOADING_FAIL,
    ORDER_LOADING_SUCCESS,
    selectOrder,
} from "../../features/order/orderSlice";
import { selectUser } from "../../features/user/userSlice";
import { getErrorMessageFromServer } from "../../utils/serverUtils";
import { OrderCard } from "./OrderCard";
import { Footer } from "../../components/Footer/Footer";
import { Box } from "@mui/material";
import { useState } from "react";

const ButtonOrder = ({ type, children, step, setStep }) => {
    return (
        <button
            className={`w-full border-r py-4 border-b-2 hover:text-regal-blue ${
                step === type ? "border-b-regal-blue text-regal-blue" : ""
            }`}
            onClick={() => setStep(type)}
        >
            {children}
        </button>
    );
};

export const Order = () => {
    const [step, setStep] = useState("All");
    const [reRender, setReRender] = useState(false);
    const user = useSelector(selectUser);
    const order = useSelector(selectOrder);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const FetchOrder = async () => {
            try {
                dispatch(ORDER_LOADING());
                const response = await billApi.getOrder(user.userInfor.id);
                dispatch(ORDER_LOADING_SUCCESS(response));
            } catch (error) {
                const errorMessage = getErrorMessageFromServer(error);
                dispatch(ORDER_LOADING_FAIL(errorMessage));
            }
        };
        if (user.token) {
            FetchOrder();
        } else navigate("/sign-in", { state: { alertNotLogin: true } });
    }, [user, reRender]);

    let orders = [];
    if (order.data !== null) {
        if (step === "All") orders = [...order.data];

        if (step === "Processing")
            orders = [...order.data].filter((ord) => ord.status === 2);

        if (step === "Complete")
            orders = [...order.data].filter((ord) => ord.status === 3);

        if (step === "Cancel")
            orders = [...order.data].filter((ord) => ord.status === 4);
        // orders.reverse();
    }

    const handleCancelOrder = async (billId) => {
        try {
            dispatch(ORDER_LOADING());
            const response = await billApi.cancelBill(billId);
            console.log(response);
            dispatch(ORDER_CANCEL(billId));
            setReRender(true);
        } catch (error) {
            const errorMessage = getErrorMessageFromServer(error);
            console.log(error);
            dispatch(ORDER_LOADING_FAIL(errorMessage));
        }
    };

    const handleSendRating = async (rating, comment, callback) => {
        try {
            console.log(rating, comment);
            // dispatch(ORDER_LOADING());
            // const response = await billApi.cancelBill(billId);
            // console.log(response);
            // dispatch(ORDER_CANCEL(billId));
            callback();
            setReRender(true);
        } catch (error) {
            // const errorMessage = getErrorMessageFromServer(error);
            // console.log(error);
            // dispatch(ORDER_LOADING_FAIL(errorMessage));
        }
    };

    if (reRender) setReRender(false);

    return (
        <div className="bg-gray-200 min-h-[100vh] pt-28">
            <Box className="mx-44 bg-white flex justify-around text-xl">
                <ButtonOrder type="All" step={step} setStep={setStep}>
                    Tất cả
                </ButtonOrder>
                <ButtonOrder type="Processing" step={step} setStep={setStep}>
                    Đang giao
                </ButtonOrder>
                <ButtonOrder type="Complete" step={step} setStep={setStep}>
                    Đã hoàn thành
                </ButtonOrder>
                <ButtonOrder type="Cancel" step={step} setStep={setStep}>
                    Đã hủy
                </ButtonOrder>
            </Box>
            {order.loading ? (
                <Loading />
            ) : orders.length === 0 ? (
                <div className="text-2xl font-medium flex justify-center items-center flex-col min-h-[85vh] bg-white mx-44 my-9">
                    <div
                        style={{
                            backgroundImage:
                                "url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "50%",
                            backgroundSize: "contain",
                            width: "100px",
                            height: "100px",
                        }}
                    ></div>
                    <div className="mt-4">Bạn không có đơn hàng nào</div>
                </div>
            ) : (
                <div className="px-44 min-h-[66.9vh] mb-20">
                    {orders.map((card, index) => (
                        <OrderCard
                            card={card}
                            key={index}
                            handleCancelOrder={handleCancelOrder}
                            handleSendRating={handleSendRating}
                        />
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};
