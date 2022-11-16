import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Loading } from "../../components/Loading/Loading";
import { Pagination } from "../../components/Pagination/Pagination";
import {
    useGetCategories,
    useGetNewByPageAndCategory,
    useGetNews,
} from "../Admin/news/api/hook";

export const New = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const { data: news, error: errorNews, loading: loadingNews } = useGetNews();
    // const {
    //     data: cateList,
    //     error: errorCateList,
    //     loading: loadingCateList,
    // } = useGetCategories();

    // const {
    //     data: newList,
    //     error: errorNews,
    //     loading: loadingNews,
    // } = useGetNewByPageAndCategory(page, pageSize, 1);

    // console.log(cateList, errorCateList, loadingCateList);

    if (loadingNews) return <Loading />;

    if (errorNews) return <Navigate to="404" />;

    return (
        <>
            <div className="pt-16">
                <div className="p-20 px-32 min-h-[80vh]">
                    <div className="dropdown relative mb-10">
                        <button
                            className="border border-l-red-400 border-r-red-400 text-red-500 dropdown-toggle px-6 py-2.5 font-medium text-sm leading-tight rounded-full transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {/* {category.name} */} Phân loại
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="caret-down"
                                className="w-2 ml-2"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                />
                            </svg>
                        </button>
                        <div
                            className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border "
                            aria-labelledby="dropdownMenuButton1"
                        >
                            <div className="flex p-2 gap-2">
                                {/* {cateList.map((cate) => (
                                    <li key={cate.id}>
                                        <div
                                            className="cursor-pointer dropdown-item text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "
                                            onClick={() => setCategory(cate)}
                                        >
                                            {cate.name}
                                        </div>
                                    </li>
                                ))} */}
                                <div key={0}>
                                    <div
                                        className="cursor-pointer dropdown-item text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "
                                        // onClick={() =>
                                        //     setCategory({
                                        //         id: 0,
                                        //         name: "Tất cả",
                                        //     })
                                        // }
                                    >
                                        Tất cả
                                    </div>
                                </div>
                                <div key={1}>
                                    <div
                                        className="cursor-pointer dropdown-item text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "
                                        // onClick={() =>
                                        //     setCategory({
                                        //         id: 0,
                                        //         name: "Tất cả",
                                        //     })
                                        // }
                                    >
                                        Tất cả
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {news.map(
                            (card, index) =>
                                index < page * pageSize &&
                                index >= (page - 1) * pageSize && (
                                    <Link
                                        to={`/new/${card.id}`}
                                        key={card.id}
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        <div className="flex my-5 gap-4">
                                            <div className="rounded-sm">
                                                <img
                                                    src={
                                                        card.listImages[0]
                                                            ?.imgPath
                                                    }
                                                    alt={card.title}
                                                    className="aspect-square object-cover w-52 rounded"
                                                />
                                            </div>
                                            <div className="p-6 pt-0 px-10 w-8/12">
                                                <h1 className="text-3xl font-bold mb-5 uppercase">
                                                    {card.title}
                                                </h1>
                                                <p className="text-gray-500/80">
                                                    {card.shortDescription}
                                                    ...
                                                </p>
                                            </div>
                                        </div>
                                        <div className="border-t-2 w-full border-gray-200" />
                                    </Link>
                                )
                        )}
                    </div>
                </div>
                <div className="mb-20">
                    <Pagination
                        page={page}
                        data={news}
                        setPage={setPage}
                        pageSize={pageSize}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};
