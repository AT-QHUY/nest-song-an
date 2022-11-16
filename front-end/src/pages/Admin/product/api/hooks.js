import { useEffect } from "react";
import { useState } from "react";
import adminAxios from "../../../../api/adminAxios";
import { productApi } from "../../../../api/productApi";


//Products

export const useGetProducts = ({ skipFetch = false }) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [error, setError] = useState("")

    const getProducts = async () => {
        setLoading(true)
        try {
            const res = await adminAxios.get('/product');
            setData(res)
        } catch (error) {

            if (error.response.status < 500) {
                setError("Không tìm thấy sản phẩm")
                return;
            }
            setError("Internal Server Error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!skipFetch) {
            getProducts()
        }
    }, [])

    return {
        data,
        loading,
        error,
    }

}

export const useGetProductsPagination = ({category = 0, offset = 1, limit = 10, skipFetch = false,reRender }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getProducts = async (params) => {
        setLoading(true)
        try {
            var response;
            if(category === 0) {
           const { offset, limit } = params;
            response = await productApi
                .getAllProductByPage(offset, limit)
            }
            else{
                response = await productApi.getProductByCateId(category)
            }
           
            setProducts(response)

        } catch (error) {
            console.log(error)
            if (error.response.status < 500) {
                setError("Không tìm thấy sản phẩm")
                return;
            }
            setError("Internal Server Error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!skipFetch) {
            getProducts({ offset, limit });
        }
    }, [offset, limit, reRender, category]);


    return {
        data: products,
        loading,
        error,
    }

}
export const useGetProductsCount = ({ skipFetch = false }) => {

    const [count, setCount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getProductsCount = async () => {
        setLoading(true)
        try {

            const response = await productApi.getCountAllProduct()
            setCount(response)

        } catch (error) {
            if (error.response.status < 500) {
                setError("Không tìm thấy")
                return;
            }
            setError("Internal Server Error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!skipFetch) {
            getProductsCount();
        }
    }, []);


    return {
        data: count,
        loading,
        error,
    }

}  


//Meta datas
export const useGetCategories = ({ skipFetch = false }) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getCategories = async () => {
        setLoading(true)
        try {

            const response = await productApi.getCategory()
            setCategories(response)

        } catch (error) {
            if (error.response.status < 500) {
                setError("Không tìm thấy")
                return;
            }
            setError("Internal Server Error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!skipFetch) {
            getCategories();
        }
    }, []);


    return {
        data: categories,
        loading,
        error,
    }

}  

export const useGetProduct = (id, skipFetch = false) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getProduct = async (id) => {
        setLoading(true)
        try {
            const response = await productApi
                .getProductById(id)

            setProducts(response)

        } catch (error) {
            console.log(error)
            if (error.response.status < 500) {
                setError("Không tìm thấy sản phẩm")
                return;
            }
            setError("Internal Server Error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!skipFetch) {
            getProduct(id)
        }
    }, [id]);


    return {
        data: products,
        loading,
        error,
    }

}

export const useGetCountProductOnBill = ( {skipFetch = false}) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getProduct = async () => {
        setLoading(true)
       
        try {
            const response = await productApi.getCountProductOnBill()
            setProducts(response)

        } catch (error) {
            console.log(error);
            if (error.response.status < 500) {
                setError("Không tìm thấy sản phẩm")
                return;
            }
            setError("Internal Server Error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!skipFetch) {
            getProduct()
        }
    }, []);

   


    return {
        data: products,
        loading,
        error,
    }

}

