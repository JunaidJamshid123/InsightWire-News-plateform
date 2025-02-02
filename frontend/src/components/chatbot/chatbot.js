import React, { useState, useEffect } from 'react';
import './chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false); // Controls visibility of the chatbot
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false); // Simulate typing response from the bot

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSend = () => {
        if (userInput.trim()) {
            setMessages([...messages, { text: userInput, sender: 'user' }]);
            setIsTyping(true);
            // Simulate chatbot response (replace this with API call for actual response)
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { text: "This is a response from the chatbot.", sender: 'bot' }
                ]);
                setIsTyping(false);
            }, 1000);
            setUserInput('');
        }
    };

    return (
        <>
            {/* Chatbot Icon */}
            <div className="chatbot-icon" onClick={toggleChatbot}>
                <img src={process.env.PUBLIC_URL + '/chatbot_icon.jpg'} alt="Chatbot" />
            </div>

            {/* Chatbot Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h4>InsightWire Chatbot</h4>
                        <button className="close-btn" onClick={toggleChatbot}>×</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chatbot-message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && <div className="typing-indicator">Chatbot is typing...</div>}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="Type your question..."
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
