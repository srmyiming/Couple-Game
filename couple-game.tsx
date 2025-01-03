import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const GameCard = ({ value, content, isRolling }) => {
  return (
    <div 
      className={`relative w-40 h-56 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl 
        shadow-lg flex flex-col items-center justify-center p-6 text-center overflow-hidden
        border border-pink-100
        ${isRolling ? 'animate-[shake_0.5s_ease-in-out_infinite]' : 'hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1'}
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-pink-100/50 before:to-purple-100/50 before:opacity-0 before:transition-opacity before:hover:opacity-100`}
      style={{
        animation: isRolling ? 'shake 0.5s ease-in-out infinite' : undefined
      }}
    >
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg) scale(1.05); }
          75% { transform: rotate(5deg) scale(1.05); }
        }
      `}</style>
      <div className="text-base font-medium text-gray-700">
        {isRolling ? (
          <div className="animate-pulse text-2xl font-bold text-pink-300">?</div>
        ) : (
          <div className="break-words max-h-44 overflow-auto">
            {content[value - 1] || `内容${value}`}
          </div>
        )}
      </div>
    </div>
  );
};

const CouplesGame = () => {
  const [card1Value, setCard1Value] = useState(1);
  const [card2Value, setCard2Value] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [card1Content, setCard1Content] = useState(Array(6).fill(''));
  const [card2Content, setCard2Content] = useState(Array(6).fill(''));

  const rollCards = () => {
    if (isRolling) return;

    setIsRolling(true);
    if (navigator.vibrate) {
      navigator.vibrate([100, 100, 100]);
    }

    // Generate random final values
    const newValue1 = Math.floor(Math.random() * 6) + 1;
    const newValue2 = Math.floor(Math.random() * 6) + 1;

    // Update values after animation
    setTimeout(() => {
      setCard1Value(newValue1);
      setCard2Value(newValue2);
      setIsRolling(false);
      
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }, 1500);
  };

  const updateCardContent = (cardNum, index, value) => {
    const newContent = cardNum === 1 ? [...card1Content] : [...card2Content];
    newContent[index] = value;
    if (cardNum === 1) {
      setCard1Content(newContent);
    } else {
      setCard2Content(newContent);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4">
      {/* 添加标题 */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          情侣互动小游戏
        </h1>
        <p className="mt-2 text-purple-400 text-sm">让爱更有趣</p>
      </div>

      <Tabs defaultValue="game" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="game">游戏</TabsTrigger>
          <TabsTrigger value="card1">卡片1设置</TabsTrigger>
          <TabsTrigger value="card2">卡片2设置</TabsTrigger>
        </TabsList>

        <TabsContent value="game">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-pink-100">
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="mb-2 text-lg font-medium text-pink-600">卡片1</div>
                  <GameCard 
                    value={card1Value} 
                    content={card1Content}
                    isRolling={isRolling}
                  />
                </div>
                <div className="text-center">
                  <div className="mb-2 text-lg font-medium text-purple-600">卡片2</div>
                  <GameCard 
                    value={card2Value} 
                    content={card2Content}
                    isRolling={isRolling}
                  />
                </div>
              </div>
              
              <Button 
                onClick={rollCards} 
                disabled={isRolling}
                className={`w-full max-w-xs bg-gradient-to-r from-pink-400 to-purple-400 
                  hover:from-pink-500 hover:to-purple-500 text-white font-medium py-6 rounded-xl
                  transform transition-all duration-300 hover:scale-105 disabled:opacity-50
                  ${isRolling ? 'animate-pulse' : ''}`}
              >
                {isRolling ? '抽取中...' : '抽取卡片'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="card1">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-pink-100">
            <div className="space-y-4">
              {card1Content.map((content, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-20 text-pink-600 font-medium">内容 {index + 1}</span>
                  <Input
                    value={content}
                    onChange={(e) => updateCardContent(1, index, e.target.value)}
                    placeholder={`请输入内容${index + 1}`}
                    className="flex-1 border-pink-200 focus:ring-pink-200"
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="card2">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-pink-100">
            <div className="space-y-4">
              {card2Content.map((content, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-20 text-purple-600 font-medium">内容 {index + 1}</span>
                  <Input
                    value={content}
                    onChange={(e) => updateCardContent(2, index, e.target.value)}
                    placeholder={`请输入内容${index + 1}`}
                    className="flex-1 border-purple-200 focus:ring-purple-200"
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CouplesGame;