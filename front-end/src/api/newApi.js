import adminAxios from "./adminAxios";

export const newApi = {
    getAllNew: () => {
        return adminAxios.get("/news/all");
    },
    getAllCate: () => {
        return adminAxios.get("/news-category");
    },
    getNewById: (id) => {
        return adminAxios.get(`/news/${id}`);
    },
    addNews: async (news) => {
        try {
            const res = await adminAxios.post(`/news/add`, news);
            return res;
        } catch (err) {
            throw err;
        }
    },
    updateNews: async (id, news) => {
        try {
            // console.log(id, news);
            const res = await adminAxios.post(`news/update/${id}`, news);
            return res;
        } catch (error) {}
    },
    getNewByPageAndCategory: async (page, amount, data) => {
        try {
            console.log(page, amount, data);
            const response = await adminAxios.post(
                `news/?page=${page}&numOfNews=${amount}`,
                data
            );
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
