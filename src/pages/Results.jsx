import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Trophy, Home, RotateCcw, Star } from 'lucide-react';

const Results = () => {
  const { score } = useParams();
  const navigate = useNavigate();
  const finalScore = parseInt(score) || 0;

  const seaCreatures = [
    { 
      name: 'Clownfish', 
      minScore: 0, 
      message: 'Great start! You\'re swimming in the right direction!',
      image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f',
      color: 'from-orange-300 to-orange-400'
    },
    { 
      name: 'Seahorse', 
      minScore: 5, 
      message: 'Wonderful! You\'re getting stronger!',
      image: 'https://images.unsplash.com/photo-1572317708804-41107920bee5',
      color: 'from-pink-300 to-purple-400'
    },
    { 
      name: 'Starfish', 
      minScore: 9, 
      message: 'Awesome! You\'re shining bright!',
      image: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      color: 'from-red-300 to-orange-400'
    },
    { 
      name: 'Jellyfish', 
      minScore: 13, 
      message: 'Amazing! You\'re flowing with brilliance!',
      image: 'https://images.unsplash.com/photo-1543007168-5fa9b3c5f5fb',
      color: 'from-purple-300 to-pink-400'
    },
    { 
      name: 'Sea Turtle', 
      minScore: 17, 
      message: 'Fantastic! You\'re wise and quick!',
      image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f',
      color: 'from-green-300 to-teal-400'
    },
    { 
      name: 'Octopus', 
      minScore: 21, 
      message: 'Incredible! Your brain power is unstoppable!',
      image: 'https://images.unsplash.com/photo-1523486230352-65ff5222cea4',
      color: 'from-red-400 to-purple-500'
    },
    { 
      name: 'Dolphin', 
      minScore: 25, 
      message: 'Outstanding! You\'re super smart and playful!',
      image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8',
      color: 'from-blue-300 to-cyan-400'
    },
    { 
      name: 'Shark', 
      minScore: 30, 
      message: 'Phenomenal! You\'re a math predator!',
      image: 'https://images.unsplash.com/photo-1531959870249-9f9b729efcf4',
      color: 'from-gray-400 to-blue-500'
    },
    { 
      name: 'Orca', 
      minScore: 35, 
      message: 'Spectacular! You\'re the king of the ocean!',
      image: 'https://images.unsplash.com/photo-1721750887731-a0c76043092d',
      color: 'from-gray-700 to-blue-600'
    },
    { 
      name: 'Blue Whale', 
      minScore: 40, 
      message: 'LEGENDARY! You\'re the biggest brain in the ocean!',
      image: 'https://images.unsplash.com/photo-1698472505070-6d3b90afb530',
      color: 'from-blue-600 to-blue-800'
    }
  ];

  // Find the appropriate sea creature based on score
  const achievement = [...seaCreatures]
    .reverse()
    .find(creature => finalScore >= creature.minScore) || seaCreatures[0];

  const level = seaCreatures.indexOf(achievement) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card className="border-8 border-blue-300 shadow-2xl bg-white">
          <CardContent className="p-8 md:p-12">
            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="w-12 h-12 text-yellow-500" />
                <h1 className="text-5xl md:text-6xl font-bold text-blue-800">
                  {finalScore}
                </h1>
                <Trophy className="w-12 h-12 text-yellow-500" />
              </div>
              <p className="text-2xl text-blue-700 font-medium">
                Correct Answers!
              </p>
            </div>

            {/* Achievement Display */}
            <div className="mb-8">
              <div className={`w-full h-64 md:h-80 rounded-3xl overflow-hidden mb-6 shadow-xl bg-gradient-to-br ${achievement.color}`}>
                <img 
                  src={achievement.image} 
                  alt={achievement.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  {[...Array(Math.min(level, 10))].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-6 h-6 text-yellow-500" 
                      fill="currentColor"
                    />
                  ))}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-800">
                  {achievement.name}
                </h2>
                <p className="text-xl md:text-2xl text-blue-700 font-medium px-4">
                  {achievement.message}
                </p>
                <div className="inline-block bg-blue-100 px-6 py-2 rounded-full">
                  <p className="text-lg font-bold text-blue-800">
                    Level {level} of 10
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-xl rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                <Home className="w-6 h-6 mr-2" />
                Back to Home
              </Button>
              <Button 
                onClick={() => navigate('/game/medium')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-xl rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Play Again
              </Button>
            </div>

            {/* Encouragement */}
            <div className="mt-8 text-center">
              <p className="text-lg text-blue-600 font-medium">
                {finalScore < 40 
                  ? 'Can you reach the Blue Whale? Try again!' 
                  : 'You\'re a Math Ocean Champion! 🏆'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;