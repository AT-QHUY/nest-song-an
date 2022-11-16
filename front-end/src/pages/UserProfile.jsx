import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import Avatar from "../assets/images/avatar.jpg";
import { Footer } from "../components/Footer/Footer";
import { Input } from "../components/Input/Input";
import {
    selectUser,
    USER_REQUEST,
    USER_UPDATE_SUCCESS,
} from "../features/user/userSlice";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";

export const UserProfile = () => {
    const [userInfor, setUserInfor] = useState({});
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({});
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        const fetchInfor = async () => {
            try {
                // console.log("render");
                const response = await userApi.getUserInfor(user.userInfor.id);
                setUserInfor(response);
            } catch (error) {
                if (error.response) console.log(error.response.data);
            }
        };
        fetchInfor();
    }, [user, reRender]);

    useEffect(() => {
        if (!user.token)
            navigate("/sign-in", { state: { alertNotLogin: true } });
    }, []);

    const onSubmit = async () => {
        try {
            dispatch(USER_REQUEST());
            const data = {
                fullname: "",
                phoneNumber: "",
                address: "",
                dateOfBirth: null,
            };
            const response = await userApi.updateProfile(user.userInfor.id, {
                ...data,
                ...userInfo,
            });
            if (response.status === 200) {
                dispatch(USER_UPDATE_SUCCESS());
                setReRender(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (reRender) setReRender(false);

    return (
        <div>
            <div className="bg-gray-100 w-full h-[85vh] p-32 px-44 pb-20 flex justify-center">
                <div className="shadow-lg shadow-cyan-100 w-9/12 h-full bg-white flex rounded-xl">
                    <div className="w-4/12 border-r-2 h-full border-gray-200">
                        <div className="p-16 pt-24 pb-3">
                            <img
                                src={Avatar}
                                className="rounded-full border w-28 h-28 m-auto flex justify-center items-center object-cover"
                            />
                        </div>
                        <div className="text-center font-medium text-black/70">
                            {userInfor.fullname}
                        </div>

                        <div className="flex flex-col items-center mt-8">
                            <div className="py-2">
                                <div className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                        />
                                    </svg>
                                    <h1 className="text-sm font-semibold">
                                        Số điện thoại
                                    </h1>
                                    <p className="text-xs font-medium opacity-60">
                                        {userInfor.phoneNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </svg>
                                    <h1 className="text-sm font-semibold">
                                        Địa chỉ
                                    </h1>
                                    <p className="text-xs font-medium opacity-60">
                                        {userInfor.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full justify-center flex gap-10 mt-14">
                            <div className="py-1 hover:border-b-2 hover:border-b-cyan-500">
                                <Link to="/order">
                                    <LocalOfferIcon fontSize="large" />
                                </Link>
                            </div>
                            <div className="py-1 hover:border-b-2 hover:border-b-cyan-500">
                                <Link to="/shopping-cart">
                                    <LocalMallOutlinedIcon fontSize="large" />
                                </Link>
                            </div>
                            <div className="py-1 hover:border-b-2 hover:border-b-cyan-500">
                                <Link to="/production ">
                                    <Inventory2Icon fontSize="large" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-8/12">
                        <div className="px-20 py-20">
                            <h1 className="opacity-60 font-semibold text-center text-2xl">
                                Thay đổi thông tin
                            </h1>
                            <form onSubmit={onSubmit}>
                                <div className="mt-6 flex flex-col gap-5 justify-center w-full">
                                    <div className="text-gray-600 mt-1">
                                        <Input
                                            type="text"
                                            label="Họ và tên"
                                            handleChange={(value) =>
                                                setUserInfo((pre) => ({
                                                    ...pre,
                                                    fullname: value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="text-gray-600 mt-1">
                                        <Input
                                            type="text"
                                            label="Số điện thoại"
                                            pattern="0[0-9]{9}"
                                            handleChange={(value) =>
                                                setUserInfo((pre) => ({
                                                    ...pre,
                                                    phoneNumber: value,
                                                }))
                                            }
                                            title="Invalid phone number. Phone number must begin with 0 and have 10 digits"
                                        />
                                    </div>
                                    <div className="text-gray-600 mt-1">
                                        <Input
                                            type="date"
                                            label="Ngày sinh"
                                            handleChange={(value) =>
                                                setUserInfo((pre) => ({
                                                    ...pre,
                                                    dateOfBirth:
                                                        Date.parse(value),
                                                }))
                                            }
                                            max={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            defaultValue="2000-01-01"
                                        />
                                    </div>
                                    <div className="text-gray-600 mt-1">
                                        <Input
                                            type="text"
                                            label="Địa chỉ"
                                            handleChange={(value) =>
                                                setUserInfo((pre) => ({
                                                    ...pre,
                                                    address: value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-fit mt-5 bg-[#00ADB5] text-white py-2 px-8 rounded-full text-lg m-auto hover:bg-regal-blue/70 active:bg-cyan-700 active:scale-90"
                                    >
                                        Lưu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
