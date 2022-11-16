import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { newApi } from "../../../../api/newApi";

export const useGetNews = (skipFetch = false) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getNews = async () => {
        setLoading(true);
        try {
            const response = await newApi.getAllNew();
            setNews(response);
        } catch (error) {
            console.log(error);
            if (error.response.status < 500) {
                setError("Không tìm thấy sản phẩm");
                return;
            }
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getNews();
        }
    }, []);

    return {
        data: news,
        loading,
        error,
    };
};

export const useGetNewById = (id, skipFetch = false) => {
    const [newsItem, setNewsItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getNew = async (id) => {
        setLoading(true);
        try {
            const response = await newApi.getNewById(id);
            setNewsItem(response);
        } catch (error) {
            console.log(error);
            if (error.response.status < 500) {
                setError("Không tìm thấy sản phẩm");
                return;
            }
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getNew(id);
        }
    }, []);

    return {
        data: newsItem,
        loading,
        error,
    };
};

export const useGetCategories = (skipFetch = false) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getCategories = async () => {
        setLoading(true);
        try {
            const response = await newApi.setCategories(response);
        } catch (error) {
            if (error.response.status < 500) {
                setError("Không tìm thấy");
                return;
            }
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getCategories();
        }
    }, []);

    return {
        data: categories,
        loading,
        error,
    };
};

export const useGetNewByPageAndCategory = (
    page,
    amount,
    category,
    skipFetch = false
) => {
    const [newsItem, setNewsItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getNew = async (page, amount, category) => {
        setLoading(true);
        try {
            const response = await newApi.getNewByPageAndCategory(
                page,
                amount,
                { id: category }
            );
            setNewsItem(response);
        } catch (error) {
            console.log(error);
            if (error.response.status < 500) {
                setError("Không tìm thấy sản phẩm");
                return;
            }
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getNew(page, amount, category);
        }
    }, [page]);

    return {
        data: newsItem,
        loading,
        error,
    };
};
