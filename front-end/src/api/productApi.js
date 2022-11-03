import adminAxios from "./adminAxios";

export const productApi = {
    getAllProduct: () => {
        return adminAxios.get("/product");
    },

    getProductByPage: async (offset, limit) => {
        try {
           
            const res = await adminAxios.get(
                `/product/page?page=${offset}&limit=${limit}`
            );
            return res;
        } catch (err) {
            throw err;
        }
    },

    getAllProductByPage: async (offset, limit) => {
        try {
            const res = await adminAxios.get(
                `/product/page/all?page=${offset}&limit=${limit}`
            );
            return res;
        } catch (err) {
            throw err;
        }
    },

    getCountAllProduct: async () => {
        try {
            const res = await adminAxios.get(`/product/count/all`);
            return res;
        } catch (err) {
            throw err;
        }
    },

    getProductById: (id) => {
        return adminAxios.get(`/product/${id}`);
    },
    getCategory: () => {
        return adminAxios.get("/category");
    },
    getProductByFilter: (filter, cateId) => {
        const data = { ...filter, cateId: 0 };
        return adminAxios.post("/product/filter", data);
    },

    getProductByStatus: (data) => {
        return adminAxios.post("/product/status", data);
    },

    // Add new product

    addProductAPI: async (data) => {
        try {
            const res = await adminAxios.post("/product/add", data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    // Update product
    updateProductById: async (proId, proData) => {
        try {
            const res = await adminAxios.put(`/product/${proId}`, proData);
            return res;
        } catch (err) {
            throw err;
        }
    },
    //-------------------------

    //update product status

    updateProductStatus: async (proiId, status) => {
        try {
            const data = { status: status };
            const res = await adminAxios.put(
                `/product/status/${proiId}`,
                data
            );
            return res;
        } catch (err) {
            throw err;
        }
    },

    //-------------------------
    //  delete product

    deleteProductById: async (proiId) => {
        try {
            const res = await adminAxios.delete(`/product/${proiId}`);
            return res;
        } catch (err) {
            throw err;
        }
    },

    //-------------------------
};
