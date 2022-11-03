import adminAxios from "./adminAxios";

export const accountApi = {
    getAllAccountByPage: (offset, limit) => {
        return adminAxios.get(`/user/page?page=${offset}&limit=${limit}`);
    },
    getCountAllAccount: () => {
        return adminAxios.get("/user/count/all");
    },
    unblockUser: (id) => {
        return adminAxios.put(`/user/update-unblock/${id}`);
    },
    blockUser: (id) => {
        return adminAxios.delete(`/user/${id}`);
    },
};
