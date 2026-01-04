import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Waves, Fish, Brain } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const difficulties = [
    {
      level: 'easy',
      title: 'Easy',
      description: 'Numbers 1-10',
      color: 'from-cyan-400 to-blue-400',
      textColor: 'text-cyan-600'
    },
    {
      level: 'medium',
      title: 'Medium',
      description: 'Numbers 1-20',
      color: 'from-blue-400 to-blue-500',
      textColor: 'text-blue-600'
    },
    {
      level: 'hard',
      title: 'Hard',
      description: 'Numbers 1-50',
      color: 'from-blue-500 to-blue-700',
      textColor: 'text-blue-700'
    }
  ];

  const handleStart = (difficulty) => {
    navigate(`/game/${difficulty}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Fish className="w-12 h-12 text-blue-600 animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-bold text-blue-800">
              Math Ocean Challenge
            </h1>
            <Fish className="w-12 h-12 text-cyan-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <p className="text-xl text-blue-700 font-medium">
            Solve as many problems as you can in 1 minute!
          </p>
        </div>

        {/* Difficulty Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {difficulties.map((diff, index) => (
            <Card 
              key={diff.level} 
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border-4 border-blue-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${diff.color} flex items-center justify-center`}>
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-2xl font-bold text-center mb-2 ${diff.textColor}`}>
                  {diff.title}
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  {diff.description}
                </p>
                <Button 
                  onClick={() => handleStart(diff.level)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg rounded-full shadow-lg transform transition-all duration-200 hover:shadow-xl"
                >
                  Start Challenge
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wave decoration */}
        <div className="flex justify-center gap-2 opacity-50">
          <Waves className="w-8 h-8 text-blue-400 animate-pulse" />
          <Waves className="w-8 h-8 text-cyan-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <Waves className="w-8 h-8 text-blue-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>
    </div>
  );
};

export default Home;