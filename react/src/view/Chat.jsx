import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

import axiosClient from "../axios-client";

export default function Chat() {
    const [contacts, setContacts] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([]);

    const [currentContact, setCurrentContact] = useState(null);

    const [newMessage, setNewMessage] = useState("");

    const chatBodyRef = useRef(null);

    const messageRef = useRef();

    const { user } = useStateContext();

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/users").then(({ data }) => {
            setLoading(false);
            setContacts(data.data);
        });
    }, []);

    const handleContact = (id) => {
        setLoading(true);
        axiosClient
            .get(`/messages/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setMessages(data.messages);
                setCurrentContact(
                    contacts.find((contact) => contact.id === id)
                );
                scrollToBottom(); // Scroll to bottom when loading new messages
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        const MessageData = {
            sender_id: user.id,
            reciever_id: currentContact.id,
            content: newMessage,
            status: "send",
        };

        axiosClient.post("/messages", MessageData).then(({ data }) => {
            setMessages((prevMessages) => [...prevMessages, data]); // Append the new message to the chat
            setNewMessage(""); // Clear input field
            scrollToBottom(); // Scroll down when a new message is sent
        });
    };

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };

    // Call scrollToBottom whenever messages are updated
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chat animated fadeInDown">
            <div className="left-menu">
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                    <button className="chat-btn">
                        <SearchIcon />
                    </button>
                </div>
                <ul className="names">
                    {contacts
                        .filter(
                            (contact) =>
                                contact.id !== user.id && contact.id !== 44
                        )
                        .map((contact) => (
                            <li
                                key={contact.id}
                                onClick={() => handleContact(contact.id)}
                            >
                                <div className="field">
                                    <div className="icon">
                                        <img src="/images/pic.jpg" alt="img" />
                                    </div>
                                    <div className="texts">
                                        <p className="chat-name">
                                            {contact.name} ({contact.role})
                                        </p>
                                        <p className="status">
                                            <span
                                                className={
                                                    contact?.status === 0
                                                        ? "sign"
                                                        : "sign active"
                                                }
                                            ></span>{" "}
                                            {contact?.status === 0
                                                ? "Offline"
                                                : "Online"}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
            <div
                className={
                    currentContact ? "chat-content" : "chat-content hidden"
                }
            >
                <div className="main-holder">
                    <div className="head">
                        <div className="field">
                            <div className="icon">
                                <img src="/images/pic.jpg" alt="img" />
                            </div>
                            <div className="texts">
                                <p className="chat-name">
                                    {currentContact?.name}
                                </p>
                                <p className="status">
                                    <span
                                        className={
                                            currentContact?.status === 0
                                                ? "sign"
                                                : "sign active"
                                        }
                                    ></span>{" "}
                                    {currentContact?.status === 0
                                        ? "Offline"
                                        : "Online"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="body" ref={chatBodyRef}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={
                                    msg.sender_id === user.id
                                        ? "sender"
                                        : "reciever"
                                }
                            >
                                <p
                                    className={
                                        msg.sender_id === user.id
                                            ? "sender-message"
                                            : "reciever-message"
                                    }
                                >
                                    {msg.content}
                                </p>
                            </div>
                        ))}
                        {/* <div className="sender">
                            <p className="sender-message">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Exercitationem facilis esse
                                similique harum, ullam tempora nostrum
                                cupiditate quia dolor nobis omnis repellendus,
                                eligendi architecto illo animi optio soluta
                                earum placeat!
                            </p>
                        </div>
                        <div className="reciever">
                            <p className="reciever-message">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Doloribus nesciunt voluptas
                                aliquid earum tempore quod nemo sapiente
                                voluptatem quas, soluta, id, illo aliquam enim
                                incidunt adipisci quidem molestiae consequuntur
                                odio.
                            </p>
                        </div> */}
                    </div>
                    <div className="footer">
                        <input
                            type="text"
                            placeholder="Type Message"
                            // ref={messageRef}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
