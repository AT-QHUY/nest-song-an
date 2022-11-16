import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/system";
import logo from "./../../assets/icons/SongAnLogo.png";
import { Button, CircularProgress, Slide } from "@mui/material";
import sendIcon from "../../assets/icons/Vector.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { mailApi } from "../../api/mailApi";

export const Footer = () => {
    const { register, handleSubmit } = useForm();
    const [sendSuccess, setSendSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = (input) => {
        setLoading(true);
        mailApi
            .sendEmail(input.userEmail)
            .then(() => setSendSuccess(true))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    if (sendSuccess) {
        console.log("render");
        setTimeout(() => setSendSuccess(false), 2000);
    }

    return (
        <>
            <Slide direction="down" in={sendSuccess} mountOnEnter unmountOnExit>
                <div
                    className="z-10 fixed w-fit bottom-20 right-14 transition-all duration-200 bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center"
                    role="alert"
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="check-circle"
                        className="w-4 h-4 mr-2 fill-current"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                        ></path>
                    </svg>
                    Gửi thông tin thành công
                </div>
            </Slide>
            <Box className="w-full flex justify-between text-2xl bg-[#304659] text-[#fff] px-48 items-center h-[20vh]">
                <div className="text-base w-3/12 flex flex-col gap-1 items-start mb-3 text-gray-400">
                    <h5 className="uppercase text-lg font-medium mb-1 text-white">
                        Liên hệ
                    </h5>
                    <p>
                        <LocationOnIcon
                            sx={{ width: "20px", height: "20px" }}
                            className="mr-2"
                        />
                        281/3 Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, TP HCM, Việt
                        Nam
                    </p>
                    <p>
                        <PhoneIcon
                            sx={{ width: "20px", height: "18px" }}
                            className="mr-2"
                        />
                        0258 3525379 - 0258 3524539
                    </p>
                    <p>
                        <MailIcon
                            sx={{ width: "20px", height: "17px" }}
                            className="mr-2"
                        />
                        nestsongan@gmail.com
                    </p>
                </div>
                <Box className="flex flex-col items-center">
                    <Box className="flex cursor-pointer">
                        <img
                            src={logo}
                            style={{ filter: "brightness(0) invert(1)" }}
                            className="w-8 mr-2.5"
                        />
                        Song Ân
                    </Box>
                    <p className="text-gray-300/80 mt-2 text-base text-center">
                        Copyright &copy; SongAn 2022
                    </p>
                </Box>
                <Box className="flex flex-col w-3/12 items-end">
                    {/* <h5 className="mb-3 uppercase text-lg font-medium">Kết nối</h5> */}
                    <form
                        className="flex gap-3 p-3 px-6 rounded-lg border border-gray-400 bg-gray-700/60"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            {...register("userEmail")}
                            type="text"
                            className="h-10 bg-inherit text-base w-64 outline-none px-2"
                            placeholder="Nhập email của bạn"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Invalid email"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={
                                <img
                                    src={sendIcon}
                                    alt="send icon"
                                    className="w-4 mb-0.5"
                                />
                            }
                            size="small"
                            sx={{
                                backgroundColor: "#00ADB5",
                                ":disabled": {
                                    backgroundColor: "#ddebeb",
                                    color: "#404242",
                                },
                            }}
                            disabled={loading}
                        >
                            Gửi
                            {loading && (
                                <CircularProgress
                                    size={22}
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
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};
