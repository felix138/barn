import React, { useState } from 'react';
import { MessageCircle, Book, Music, Brain, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character } from '@/components/animations/Character';
import { motion } from 'framer-motion';

// 定义消息类型
interface Message {
  text: string;
  type: 'user' | 'bot';
}

// 定义主题类型
interface Topic {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

const NorwegianKidsAI = () => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const topics: Topic[] = [
    { id: 'math', name: 'Matematikk', icon: Brain, color: 'text-blue-500' },
    { id: 'nature', name: 'Natur', icon: Book, color: 'text-green-500' },
    { id: 'music', name: 'Musikk', icon: Music, color: 'text-purple-500' },
  ];

  const handleSend = () => {
    if (currentMessage.trim()) {
      const newMessage: Message = { text: currentMessage, type: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setCurrentMessage('');
      
      // 模拟机器人回复
      setTimeout(() => {
        const botMessage: Message = { 
          text: 'Bra! (Good!) 👍', 
          type: 'bot' 
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gradient-to-b from-blue-50 to-white min-h-screen relative overflow-hidden">
      {/* 表情动画 */}
      <Character />

      {/* Header with Norwegian flag colors */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-red-600 p-4 rounded-t-lg text-white relative z-10 mt-24"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hei! 👋 La oss lære sammen!</h1>
          <Award className="w-8 h-8" />
        </div>
      </motion.div>

      {/* Topic Selection with Animation */}
      <div className="grid grid-cols-3 gap-4 my-6">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedTopic === topic.id ? 'ring-2 ring-blue-400' : ''
              }`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <CardContent className="flex flex-col items-center p-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <topic.icon className={`w-8 h-8 ${topic.color} mb-2`} />
                </motion.div>
                <span className="text-lg font-medium">{topic.name}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chat Interface with Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-4"
      >
        <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ x: msg.type === 'user' ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`mb-4 ${
                msg.type === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <motion.div 
          className="flex gap-2"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Skriv din melding her..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button
            onClick={handleSend}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Footer with Helper Text */}
      <motion.div 
        className="text-center mt-6 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Du kan spørre meg om hva som helst!</p>
        <p className="text-sm">(You can ask me anything!)</p>
      </motion.div>
    </div>
  );
};

export default NorwegianKidsAI; 