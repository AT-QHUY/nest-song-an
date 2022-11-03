import { useEffect } from "react";
import { useState } from "react";
import { userApi } from "../../../../api/userApi";

export const useGetUsersPagination = ({ offset = 1, limit = 5, skipFetch = false }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getUsers = async (params) => {
        setLoading(true)
        try {
            const { offset, limit } = params;
            const response = await userApi.getUserByPage(offset, limit)
            setUsers(response)

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
            getUsers({ offset, limit });
        }
    }, [offset, limit]);


    return {
        data: users,
        loading,
        error,
    }

}

export const useGetUserById = (id, skipFetch = false) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getUser = async (id) => {
        setLoading(true)
        try {
            const response = await userApi.getUserInfor(id)
            setUser(response)

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
            getUser(id)
        }
    }, [id]);


    return {
        data: user,
        loading,
        error,
    }

    
}

export const useGetUsersCount = ({ skipFetch = false }) => {

    const [count, setCount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const getUsersCount = async () => {
        setLoading(true)
        try {
            const response = await userApi.getCountAllUser()
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
            getUsersCount();
        }
    }, []);


    return {
        data: count,
        loading,
        error,
    }

}  