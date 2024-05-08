import React, {useEffect, useRef} from 'react';
import SockJS from 'sockjs-client';
import {CompatClient, Stomp} from "@stomp/stompjs";
import {Message} from "../../model/Message";
import {useForm} from "react-hook-form";
import {useAuth} from "../AuthProvider/AuthProvider";
import './MessagePage.scss'
import {fetchMessagesOnUser} from "../../service/UserService";

interface ChatFormValues {
    message: string
}

export const MessagePage = () => {
    const {user, token} = useAuth();
    const {register, handleSubmit, reset} = useForm<ChatFormValues>();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const stompClientRef = useRef<CompatClient | null>(null);


    const sendMessage = (messageData: ChatFormValues) => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            const messageBody = {content: messageData.message, sender: user?.id};
            stompClientRef.current.send("/app/sendMessage", {}, JSON.stringify(messageBody));
            reset()
        } else {
            console.error('STOMP client is not connected.');
        }
    };

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const messageData = await fetchMessagesOnUser(token, user)
                setMessages(messageData)
            } catch (error) {
                console.error(error)
            }
        }
        loadMessages()
    }, [token, user]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;
        stompClient.connect({}, function (frame: string) {
            stompClient.subscribe('/topic/message', function (message) {
                setMessages(prev => [...prev, JSON.parse(message.body)])
            });
        }, function (error: string) {
            console.error('STOMP error: ', error);
        });

        stompClient.debug = () => {
        }

        return () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        };
    }, []);

    return (
        <div className="container-matmatikk">
            <div className="container-center">
                <div className="chat-container">
                    <div className="message-header">
                        <i className="header-icon fa fa-user-circle-o"
                           aria-hidden="true"></i> {user?.firstName} {user?.lastName}
                    </div>
                    <div className="message-divider"></div>
                    <ul className="message-list">
                        {messages.map((messageData, id) => (
                            <li key={id} className={`message-item ${user?.id === messageData.sender && 'own'}`}>
                                <div className="message-bubble">
                                    <span className={`message-content ${user?.id === messageData.sender && 'own'}`}>
                                        {messageData.content}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <form className="message-form" onSubmit={handleSubmit(sendMessage)}>
                        <input
                            {...register("message", {required: true})}
                            type="text"
                            placeholder="Skriv en melding..."
                            className="message-input"
                        />
                        <button type="submit" className="send-button">
                            <i className="send-icon fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

