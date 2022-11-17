import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { convertPriceToString } from "../../utils/serverUtils";

export const CartItem = ({
    item,
    handleChangeAmount,
    handleDelete,
    reRender,
    setReRender,
}) => {
    const [amount, setAmount] = useState(item.quantity);
    const [loading, setLoading] = useState(false);

    const cartTimeoutRef = useRef(null);
    const firstUpdate = useRef(true);
    const firstReRender = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (reRender) {
            setReRender(false);
            return;
        }
        if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);

        cartTimeoutRef.current = setTimeout(() => {
            setLoading(
                true,
                handleChangeAmount(item.id, amount, item.billId, setLoading)
            );
        }, 700);
    }, [amount]);

    useLayoutEffect(() => {
        if (firstReRender.current) {
            firstReRender.current = false;
            return;
        }
        if (reRender) setAmount(item.quantity);
    }, [reRender]);

    return (
        <>
            <div className=" bg-white relative items-center my-6 transition-all duration-700">
                <ul className="grid grid-cols-12 grid-flow-row-dense text-center text-base font-normal text-zinc-500 items-center">
                    <li className="col-span-5 grid grid-cols-12 justify-self-start items-center">
                        <div className="col-span-3">
                            <Link
                                to={`/production/${item.product.id}`}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                <img
                                    src={item.product.listImages[0].imgPath}
                                    className="aspect-square rounded-xs"
                                />
                            </Link>
                        </div>
                        <div className="col-span-9 ml-6">
                            <Link
                                to={`/production/${item.product.id}`}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                <div className="text-base uppercase font-bold text-left">
                                    {item.product.name}
                                </div>
                            </Link>
                            <div className="truncate text-xs">
                                {item.product.description}
                            </div>
                        </div>
                    </li>
                    <li className="col-span-2">Loại</li>
                    <li className="col-span-2 font-trebu">
                        {loading ? (
                            <CircularProgress
                                size={28}
                                sx={{
                                    color: "#00ADB5",
                                }}
                            />
                        ) : (
                            <>
                                <button className="hover:text-red-500">
                                    <FontAwesomeIcon
                                        icon={faMinus}
                                        onClick={() => {
                                            if (!amount) return setAmount(1);
                                            if (amount > 1)
                                                return setAmount(
                                                    (pre) => pre - 1
                                                );
                                        }}
                                    />
                                </button>
                                <input
                                    value={amount}
                                    type="number"
                                    className="w-8 text-center mx-2 font-bold"
                                    onChange={(e) => {
                                        const number = Number.parseInt(
                                            e.target.value
                                        );
                                        if (number > item.product.quantity)
                                            number = item.product.quantity;
                                        if (number < 1 || number == NaN)
                                            number = 1;
                                        return setAmount(number);
                                    }}
                                    min="1"
                                    max={item.product.quantity}
                                    required
                                />
                                <button className="hover:text-green-500">
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        onClick={() => {
                                            if (!amount) return setAmount(1);
                                            if (amount < item.product.quantity)
                                                return setAmount(
                                                    (pre) => pre + 1
                                                );
                                        }}
                                    />
                                </button>
                            </>
                        )}
                    </li>
                    <li className="col-span-2 font-trebu text-orange-500">
                        {loading ? (
                            <CircularProgress
                                size={28}
                                sx={{
                                    color: "#00ADB5",
                                }}
                            />
                        ) : (
                            convertPriceToString(item.price * item.quantity)
                        )}
                    </li>
                    <button
                        className="text-red-400 h-fit px-3 py-1.5 col-span-1 cursor-pointer hover:text-red-600 hover:scale-125 transition-all duration-200 disabled:text-slate-200 disabled:cursor-default"
                        onClick={() =>
                            setLoading(true, handleDelete(item, setLoading))
                        }
                        disabled={loading}
                    >
                        &#10006;
                    </button>
                </ul>
            </div>
        </>
    );
};
