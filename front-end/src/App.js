import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Introduction } from "./pages/Introduction";
import { Production } from "./pages/Production/Production";
import { UserProfile } from "./pages/UserProfile";
import { New } from "./pages/New/New";
import Header from "./components/Header/Header";
import { ShoppingCart } from "./pages/ShoppingCart/ShoppingCart";
import { ProductDetail } from "./pages/Production/ProductDetail";
import { NewDetail } from "./pages/New/NewDetail";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { selectUser } from "./features/user/userSlice";
import { Loading } from "./components/Loading/Loading";
import { DashBoard } from "./pages/Admin/DashBoard";
import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/theme";
import { Order } from "./pages/Order/Order";
import { ToastPageChange } from "./components/Toast";
import { useState } from "react";
import AdminLayout from "./components/layout/AdminLayout";
import { Products } from "./pages/Admin/product";
import { CreateProduct } from "./pages/Admin/product/create";
import { EditProduct } from "./pages/Admin/product/edit";
import { Users } from "./pages/Admin/user";
import { Orders } from "./pages/Admin/order";
import { Detail } from "./pages/Admin/order/detail";
import { News } from "./pages/Admin/news";
import { EditNews } from "./pages/Admin/news/edit";
import { CreateNews } from "./pages/Admin/news/create";

export const App = () => {
    const [name, setName] = useState("Bán hàng");
    const [url, setUrl] = useState("/");
    const user = useSelector(selectUser);
    const handleSwitch = () => {
        if (url === "/") {
            setName("Quản trị", setUrl("/dashboard"));
        } else {
            setName("Bán hàng", setUrl("/"));
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />
                {user.loading ? (
                    <Loading />
                ) : (
                    <Routes>
                        <Route path="/dashboard" element={<AdminLayout />} >
                            <Route path="" element={<DashBoard />} index={true} />
                            <Route path="product" element={<Outlet />} >
                                <Route path="" element={<Products />} index={true} />
                                <Route path="create" element={<CreateProduct />} />
                                <Route path="edit/:id" element={<EditProduct />} />
                            </Route>
                            <Route path="user" element={<Outlet />} >
                                <Route path="" element={<Users />} index={true} />
                            </Route>
                            <Route path="order" element={<Outlet />} >
                                <Route path="" element={<Orders />} index={true} />
                                <Route path="detail/:id" element={<Detail />}  />
                            </Route>
                            <Route path="news" element={<Outlet />} >
                                <Route path="" element={<News />} index={true} />
                                <Route path="edit/:id" element={<EditNews />}  />
                                <Route path="create" element={<CreateNews />}  />

                            </Route>
                        </Route>
                        <Route path="/" element={<Home />} />

                        <Route
                            path="/introduction"
                            element={<Introduction />}
                        />
                        <Route path="/production" element={<Production />} />
                        <Route path="/user" element={<UserProfile />} />
                        <Route path="/new" element={<New />} />
                        <Route
                            path="/shopping-cart"
                            element={<ShoppingCart />}
                        />
                        <Route
                            path="/production/:id"
                            element={<ProductDetail />}
                        />
                        <Route path="/new/:id" element={<NewDetail />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="*" element={<NotFound />} />

                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Routes>
                )}
                {user.userInfor?.role === "ADMIN" && (
                    <ToastPageChange
                        url={url}
                        name={name}
                        onClick={() => handleSwitch()}
                    />
                )}
                {/* {user.userInfor?.role === "CUSTOMER" && <ChatBox />} */}
            </BrowserRouter>
        </ThemeProvider>
    );
};
