import { useEffect } from "react";
import { useState } from "react";
import { accountApi } from "../../../../api/accountApi";
import { billApi } from "../../../../api/billApi";
import { userApi } from "../../../../api/userApi";


export const useGetOrderByStatusId = (status= 2, skipFetch = false ) => {
  
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getOrdersByStatus = async (status) => {
        setLoading(true)
        try {

            const response = await billApi.getBillByStatus(status)
            setOrders(response)

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
            getOrdersByStatus(status);
        }
    }, [status]);


    return {
        data: orders,
        loading,
        error,
    }

}

export const useGetOrderByOrderId = (order_id, skipFetch = false) => {

   
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getOrderByOrderId = async (order_id) => {
        setLoading(true)
        try {
            const response = await billApi.getBillByBillId(order_id)
            setOrder(response)

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
            getOrderByOrderId(order_id);
        }
    }, [order_id]);


    return {
        data: order,
        loading,
        error,
    }

}

export const useGetBillStatus = ( skipFetch = false ) => {

    const [statusList, setStatusList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getBillStatus = async () => {
        setLoading(true)
        try {

            const response = await billApi.getBillStatus();
            setStatusList(response)

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
            getBillStatus();
        }
        
    }, []);

    return {
        data: statusList,
        loading,
        error,
    }

}  

export const useGetUserData = (id, skipFetch = false ) => {
  
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getUserById = async (id) => {
        setLoading(true)
        try {

            const response = await userApi.getUserInfor(id)
            setUser(response)

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
            getUserById(id);
        }
    }, [id]);


    return {
        data: user,
        loading,
        error,
    }

}