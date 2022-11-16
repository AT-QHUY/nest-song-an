import adminAxios from "./adminAxios";

export const userApi = {
    getAll: () => {
        return adminAxios.get("user");
    },
    getRoles: () => {
        return adminAxios.get("role");
    },
    getUserByPage: async (offset, limit) => {
        try {
            const res = await adminAxios.get(
                `/user/page?page=${offset}&limit=${limit}`
            );
            return res;
        } catch (err) {
            throw err;
        }
    },
    getCountAllUser: async () => {
        try {
            const res = await adminAxios.get(`/user/count/all`);
            return res;
        } catch (err) {
            throw err;
        }
    },
    getUserInfor: (id) => {
        const token = localStorage.getItem("token");
        const data = { id: id, token: token };
        return adminAxios.get(`user/${id}`, data);
    },
    login: (input) => {
        return adminAxios.post("user/login", input);
    },
    loginViaGoogle: (email) => {
        const data = { username: email };
        return adminAxios.post("user/login-google", data);
    },
    signUp: (input) => {
        return adminAxios.post("user/insert", input);
    },
    updateProfile: (userId, data) => {
        return adminAxios.post(`user/${userId}`, data);
    },
};
