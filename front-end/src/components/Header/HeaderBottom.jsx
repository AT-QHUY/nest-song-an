import { Link, useLocation } from "react-router-dom";
export const HeaderBottom = () => {
    const active = useLocation().pathname.slice(1, 100);

    return (
        <>
            <nav className="flex md:justify-center items-center justify-around text-sm text-white">
                <Link
                    to="/"
                    className={`transition-colors flex items-center duration-300 h-full px-3  ${
                        active === ""
                            ? "bg-gradient-to-tr from-regal-blue/70 to-teal-400/60"
                            : "hover:text-cyan-300"
                    }`}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    Trang chủ
                </Link>
                <Link
                    to="/introduction"
                    className={`transition-colors flex items-center duration-300 h-full px-3  ${
                        active === "introduction"
                            ? "bg-gradient-to-tr from-regal-blue/70 to-teal-400/60"
                            : "hover:text-cyan-300"
                    }`}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    Giới thiệu
                </Link>
                <Link
                    to="/production"
                    className={`transition-colors flex items-center duration-300 h-full px-3 ${
                        active === "production"
                            ? "bg-gradient-to-tr from-regal-blue/70 to-teal-400/60"
                            : "hover:text-cyan-300"
                    }`}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    Sản phẩm
                </Link>
                <Link
                    to="/new"
                    className={`transition-colors flex items-center duration-300 h-full px-3 ${
                        active === "new"
                            ? "bg-gradient-to-tr from-regal-blue/70 to-teal-400/60"
                            : "hover:text-cyan-300"
                    }`}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    Tin tức
                </Link>
                <button
                    className={`transition-colors flex items-center duration-300 h-full px-3 hover:text-cyan-300`}
                    onClick={() => {
                        window.scroll({
                            top: document.body.scrollHeight,
                            behavior: "smooth",
                        });
                        setTimeout(() => {
                            document.getElementById("sendEmail").focus();
                        }, 1000);
                    }}
                >
                    Liên hệ
                </button>
            </nav>
        </>
    );
};
