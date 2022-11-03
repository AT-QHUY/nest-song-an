import adminAxios from "./adminAxios";

export const billApi = {
    getCart: (customerId) => {
        return adminAxios.get(
            `/bill/customer-id-status?customerId=${customerId}&Status=1`
        );
    },
    getOrder: (userId) => {
        return adminAxios.get(`bill/customer-id/${userId}`);
    },
    getOrderByPage: (offset, limit) => {
        return adminAxios.get(`/bill/page?page=${offset}&limit=${limit}`);
    },
    getBillByBillId: (bill_id) => {
        return adminAxios.get(`/bill/${bill_id}`);
    },
    getBillStatus: () =>{
        return adminAxios.get("/bill_status")
    },
    getBillByStatus: (status) => {
        return adminAxios.get(`/bill/status/${status}`)
    },
    payment: (data) => {
        return adminAxios.post("/cart/buy/customer", data);
    },
    addToCart: (userId, product, quantity) => {
        const data = {
            quantity: quantity,
            product: product,
        };
        return adminAxios.post(`/cart/add/customer/${userId}`, data);
    },
    updateQuantity: (userId, id, quantity, billId) => {
        const data = { id: id, quantity: quantity, billId: billId };
        return adminAxios.put(
            `/cart/update/cart-line-items/user/${userId}`,
            data
        );
    },
    removeFromCart: (userId, billId) => {
        return adminAxios.delete(
            `/cart/cart-line-items/user?userId=${userId}&id=${billId}`
        );
    },
};
