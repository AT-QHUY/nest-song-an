import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/system";
import logo from "./../../assets/icons/SongAnLogo.png";
export const Footer = () => {
    return (
        <Box className="w-full flex justify-between text-2xl bg-[#000000CC]/75 text-[#fff] px-48 items-center h-[20vh]">
            <div className="text-base w-3/12 flex flex-col gap-1 items-start mb-3 text-gray-400">
                <h5 className="uppercase text-lg font-medium mb-1 text-white">
                    Liên hệ
                </h5>
                <p>
                    <LocationOnIcon
                        sx={{ width: "20px", height: "20px" }}
                        className="mr-2"
                    />
                    281/3 Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, TP HCM, Việt Nam
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
                <Box className="flex">
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
                <h5 className="mb-3 uppercase text-lg font-medium">Kết nối</h5>
                <div className="flex gap-3 items-center text-gray-300/80">
                    <GitHubIcon
                        sx={{ width: "30px", height: "30px" }}
                        className="hover:text-white cursor-pointer"
                    />
                    <FacebookRoundedIcon
                        sx={{ width: "32px", height: "32px" }}
                        className="hover:text-white cursor-pointer"
                    />
                    <InstagramIcon
                        sx={{ width: "31px", height: "31px" }}
                        className="hover:text-white cursor-pointer"
                    />
                    <YouTubeIcon
                        sx={{ width: "37px", height: "37px" }}
                        className="hover:text-white cursor-pointer"
                    />
                </div>
            </Box>
        </Box>
    );
};
