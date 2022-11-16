import React from "react";
import MessengerCustomerChat from "react-messenger-customer-chat/lib/MessengerCustomerChat";

export const ChatBox = () => {
    return (
        <div className="fixed bottom-10 right-10">
            <MessengerCustomerChat
                pageId="
                109977738588175"
                appId="1176421496622847"
            />
        </div>
    );
};
