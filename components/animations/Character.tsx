import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// 导入动画JSON文件
import emojiAnimation from '@/public/animations/Animation - 1730850819386.json';

interface CharacterProps {
  className?: string;
}

export const Character = ({ className = '' }: CharacterProps) => {
  const [screenWidth, setScreenWidth] = useState(1000); // 默认值

  useEffect(() => {
    // 在客户端运行时更新屏幕宽度
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 定义动画变体
  const walkAnimation = {
    walk: {
      x: [-1000, screenWidth + 100], // 使用状态中的屏幕宽度
      transition: {
        x: {
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }
      }
    }
  };

  return (
    <motion.div
      variants={walkAnimation}
      animate="walk"
      initial={{ x: screenWidth }} // 使用状态中的屏幕宽度
      className={`fixed top-4 ${className}`}
      style={{ zIndex: 50 }}
    >
      <div className="w-24 h-24">
        <Lottie
          animationData={emojiAnimation}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </motion.div>
  );
}; 