import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import {
    selectUser,
    USER_LOGIN_SUCCESS,
    USER_REQUEST,
} from "../features/user/userSlice";
import { getErrorMessageFromServer } from "../utils/serverUtils";

export const SignUp = () => {
    const user = useSelector(selectUser);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (input) => {
        console.log(input);
        const FetchUser = async () => {
            try {
                dispatch(USER_REQUEST());
                const response = await userApi.signUp(input);
                console.log(response);
                localStorage.setItem("token", JSON.stringify(response));
                dispatch(USER_LOGIN_SUCCESS(JSON.stringify(response)));
            } catch (error) {
                const errorMessage = getErrorMessageFromServer(error);
                // dispatch(USER_LOGIN_FAIL(errorMessage));
            }
        };
        FetchUser();
    };

    useEffect(() => {
        if (user.token) navigate("/");
    }, [user.token]);

    useEffect(() => window.scroll(0, 0), []);

    return (
        <section className="h-screen">
            <div
                className="h-full w-full text-gray-800 bg-fixed"
                style={{
                    backgroundImage: "url(bg-image.jpg)",
                    backgroundSize: "100%",
                    backgroundPosition: "100%",
                }}
            >
                <div className="flex flex-col xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full">
                    <div className="md:w-fit w-11/12 border border-gray-300 bg-white flex blocks rounded-lg p-10 pb-7 shadow-2xl shadow-gray-800">
                        <div className="lg:w-96 w-full px-4 md:px-0">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="text-center font-bold text-xl my-3 ">
                                    ĐĂNG KÝ
                                </div>
                                <div>
                                    {user.loginViaGoogleFail && (
                                        <div
                                            className="bg-red-100 rounded-lg mb-3 py-3 px-6 text-sm text-red-700 inline-flex items-center w-full"
                                            role="primary"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="times-circle"
                                                className="w-4 h-4 mr-2 fill-current"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                                                ></path>
                                            </svg>
                                            Bạn chưa từng đăng nhập. Hãy tạo tài
                                            khoản!
                                        </div>
                                    )}
                                    <div className="relative inputBox mt-4">
                                        <input
                                            {...register("fullname")}
                                            className="px-3 py-3 border focus:border-regal-blue focus:outline-none w-full text-slate-900 rounded-md"
                                            type="text"
                                            required
                                            defaultValue={
                                                location.state?.jwtDecodeUser
                                                    .name
                                            }
                                            placeholder=" "
                                        />
                                        <span
                                            className={`absolute left-0 mx-2 px-1 my-3 w-fit pointer-events-none transition-all duration-500 rounded-md text-gray-400`}
                                        >
                                            Họ và tên
                                        </span>
                                    </div>
                                    <div className="relative inputBox mt-4">
                                        <input
                                            {...register("username")}
                                            className="px-3 py-3 border focus:border-regal-blue focus:outline-none w-full text-slate-900 rounded-md"
                                            type="text"
                                            required
                                            pattern="[A-Za-z0-9_@.]+"
                                            maxLength={70}
                                            minLength={3}
                                            defaultValue={
                                                location.state?.jwtDecodeUser
                                                    .email
                                            }
                                            placeholder=" "
                                        />
                                        <span
                                            className={`absolute left-0 mx-2 px-1 my-3 w-fit pointer-events-none transition-all duration-500 rounded-md text-gray-400`}
                                        >
                                            Tên đăng nhập
                                        </span>
                                        <p className="text-sm text-gray-300 ml-3 mt-1 flex gap-1">
                                            <p>*</p>
                                            <p>
                                                Tên đăng nhập phải chứa ít nhất
                                                3 ký tự
                                            </p>
                                        </p>
                                    </div>
                                    <div className="relative inputBox mt-4">
                                        <input
                                            {...register("password")}
                                            className="px-3 py-3 border focus:border-regal-blue focus:outline-none w-full text-slate-900 rounded-md"
                                            type="password"
                                            required
                                            maxLength={70}
                                            minLength={8}
                                            placeholder=" "
                                        />
                                        <span
                                            className={`absolute left-0 mx-2 px-1 my-3 w-fit pointer-events-none transition-all duration-500 rounded-md text-gray-400`}
                                        >
                                            Mật khẩu
                                        </span>
                                        <p className="text-sm text-gray-300 ml-3 mt-1 flex gap-1">
                                            <p>*</p>
                                            <p>
                                                Mật khẩu phải chứa ít nhất 8 ký
                                                tự
                                            </p>
                                        </p>
                                    </div>
                                    <div className="relative inputBox mt-4">
                                        <input
                                            {...register("address")}
                                            className="px-3 py-3 border focus:border-regal-blue focus:outline-none w-full text-slate-900 rounded-md"
                                            type="text"
                                            required
                                            maxLength={70}
                                            minLength={1}
                                            placeholder=" "
                                        />
                                        <span
                                            className={`absolute left-0 mx-2 px-1 my-3 w-fit pointer-events-none transition-all duration-500 rounded-md text-gray-400`}
                                        >
                                            Địa chỉ
                                        </span>
                                    </div>
                                    <div className="relative inputBox mt-4">
                                        <input
                                            {...register("phoneNumber")}
                                            className="px-3 py-3 border focus:border-regal-blue focus:outline-none w-full text-slate-900 rounded-md"
                                            type="text"
                                            pattern="0[0-9]{9}"
                                            title="Invalid phone number. Phone number must begin with 0 and have 10 digits"
                                            required
                                            placeholder=" "
                                        />
                                        <span
                                            className={`absolute left-0 mx-2 px-1 my-3 w-fit pointer-events-none transition-all duration-500 rounded-md text-gray-400`}
                                        >
                                            Số điện thoại
                                        </span>
                                        <p className="text-sm text-gray-300 ml-3 mt-1 flex gap-1">
                                            <p>*</p>
                                            <p>
                                                Số điện thoại gồm 10 chữ số bắt
                                                đầu bằng chữ số 0
                                            </p>
                                        </p>
                                    </div>
                                </div>
                                <button className="w-full mt-5 inline-block p-2.5 hover:bg-gray-700 text-white font-medium text-xs leading-snug uppercase rounded shadow-gray-400 bg-gray-500 transition duration-100 ease-in-out">
                                    Đăng ký
                                </button>
                                <div className="flex items-center my-4">
                                    <div className="flex-1 border-t border-gray-300 mt-0.5" />
                                </div>

                                <div className="text-sm text-center opacity-60 mt-4">
                                    Bạn đã có tài khoản?&nbsp;
                                    <Link to="/sign-in">
                                        <span className="text-blue-600 font-bold active:text-blue-400">
                                            Đăng nhập
                                        </span>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
