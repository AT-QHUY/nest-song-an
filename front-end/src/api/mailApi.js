import adminAxios from "./adminAxios";

export const mailApi = {
    sendEmail: async (email) => {
        try {
            const response = await adminAxios.get(
                `mail/send-discount/${email}`
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
};
