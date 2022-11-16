import { buildQueries } from "@testing-library/react";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { billApi } from "../../api/billApi";
import {
    CART_LOADING_REQUEST,
    CART_PAYING_SUCCESS,
    selectCart,
} from "../../features/cart/cartSlice";

export const Paypal = ({ totalPrice, setStep }) => {
    const paypal = useRef();
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                // description: billId,
                                amount: {
                                    currency_code: "USD",
                                    value: Math.round(totalPrice * 0.00004),
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    try {
                        const order = await actions.order.capture();
                        // console.log(order);
                        if (order.status === "COMPLETED") {
                            dispatch(CART_LOADING_REQUEST());
                            const response = await billApi.payment({
                                ...cart.shipInfor,
                                paymentStatusCodeId: 2,
                            });
                            dispatch(CART_PAYING_SUCCESS());
                            setStep("receipt");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal} className="w-[22rem]"></div>
        </div>
    );
};
