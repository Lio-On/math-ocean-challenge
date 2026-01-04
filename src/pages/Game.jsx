import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Timer, Trophy, Heart, AlertCircle } from 'lucide-react';

const Game = () => {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const inputRef = useRef(null);
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    // Create audio elements for sound effects
    correctSoundRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi6Dzvngj0EILW7A7+OZXRMRMZ7d8biJKwgvcLvs6pVRAw1SlOLwumwcBjiP1/PPey0GJ3fJ8diPPwoUXrPo7KlWFApGnt/yu2wiBi6Dzvjei0EILW/A7+KZXhMTMZ3c8beHKggvb7zs6pVRBA5SlOHwumscBjiO1/PQei4GKHfJ8dePPwoVXrPo7KlXFAtFnt/yuW0jBi+Dzvjei0MJLW/A7+KYXxMTMZzc8beHKwgvb7zs6pVSBA5SlOHwuWwcBzmO1/PQei4GKHjJ8daPQAoVXrLp7KpXFAtFnd/yuG4jBi+Ezfjdi0MJLXDB7+KYXxMUMZzc8baHKwgub7zt6pVSBA5TlOHvuWwdBzmO1vPPei4HKHjJ8daPQAoWXrLp66pYFQtEnd/xuG4kBjCEzfjdi0MKLXDB7uKXYBMVMZzb8baGLAgub7zt6pRSBA5TlOHvuWwdBzqO1vPPei4HKXjJ8daPQAoWXrLo66pYFQxEnd/xt28kBjCEzfjdi0MKLXHA7uKXYBMVMpzb8rWGLAgvb7zs6pRSBQ5TlOHvuGwdBzqO1vPOei8HKXjI8dWPQAsWXrLo66pYFQxFnd/xt28lBzCEzffci0QJLXHA7uKXYRMWMpva8rWGLAgvb73s6ZRSBRAUlOHvuGweCAqO1vPOei8HKnjI8dWPQAsXXrLo6qpZFQxFnd/xtm8lBzGEzffci0QJLXHA7eGXYRQWMpva8rSGLQgwb73s6ZNSBRAUlOHut2weBzuO1vPOeS8IKnjI8tWPQQsXXrPn6qpZFgxFnd/xtm8lBzGEzfbci0UKLXHA7eGWYRQWM5va8rSGLQgwb73r6ZNSBRAVLOH' + 'ut2weBzuO1vLOeS8IKnjI8tWPQQsYXrPn6qpZFgxGnd/xtW8mBzGEzfbci0UKLXHA7eGWYRQXM5va8rSFLQgwb73r6ZNSBRAVLOH');
    wrongSoundRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgYJ/cGBmb4iYoI57VklQbYea' + 'rJ1mKRcqU3ycu41iJhAZR2ygqIpXGQsqSW2TlGpQHBYzVGh/f2dLKBs0P0tUVE0/Mi8yNzs/Pzs3MzAxMjM0NDMzMjEwLy8vLzAw');
  }, []);

  const generateProblem = () => {
    let num1, num2, operator, answer;
    
    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operator = Math.random() > 0.3 ? '+' : '-';
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        operator = Math.random() > 0.5 ? '+' : '-';
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        operator = Math.random() > 0.5 ? '+' : '-';
        break;
      default:
        num1 = 5;
        num2 = 3;
        operator = '+';
    }

    // Ensure subtraction doesn't result in negative numbers
    if (operator === '-' && num2 > num1) {
      [num1, num2] = [num2, num1];
    }

    answer = operator === '+' ? num1 + num2 : num1 - num2;

    return { num1, num2, operator, answer };
  };

  useEffect(() => {
    setCurrentProblem(generateProblem());
    setGameStarted(true);
  }, [difficulty]);

  // Auto-focus input when component mounts or problem changes
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    // Multiple attempts to ensure focus
    focusInput();
    const timer1 = setTimeout(focusInput, 50);
    const timer2 = setTimeout(focusInput, 200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [currentProblem]);

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/results/${score}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, navigate, score]);

  const playSound = (isCorrect) => {
    try {
      if (isCorrect && correctSoundRef.current) {
        correctSoundRef.current.currentTime = 0;
        correctSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else if (!isCorrect && wrongSoundRef.current) {
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    } catch (e) {
      console.log('Sound effect error:', e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer === '') return;

    const isCorrect = parseInt(userAnswer) === currentProblem.answer;
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correct');
      playSound(true);
    } else {
      setFeedback('wrong');
      playSound(false);
    }

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      setCurrentProblem(generateProblem());
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);
  };

  if (!currentProblem) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-2xl p-4 shadow-lg border-4 border-blue-200">
          <div className="flex items-center gap-2">
            <Timer className="w-8 h-8 text-blue-600" />
            <span className={`text-3xl font-bold ${
              timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-blue-800'
            }`}>
              {timeLeft}s
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-3xl font-bold text-blue-800">
              {score}
            </span>
          </div>
        </div>

        {/* Problem Card */}
        <Card className={`border-8 shadow-2xl transition-all duration-300 ${
          feedback === 'correct' ? 'border-green-400 bg-green-50' :
          feedback === 'wrong' ? 'border-red-400 bg-red-50' :
          'border-blue-300 bg-white'
        }`}>
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <div className="text-7xl md:text-8xl font-bold text-blue-800 mb-4">
                {currentProblem.num1} {currentProblem.operator} {currentProblem.num2}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="text-5xl text-center h-24 border-4 border-blue-300 rounded-2xl font-bold focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                placeholder="?"
                autoFocus
                autoComplete="off"
                disabled={feedback !== null}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <Button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-8 text-2xl rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
                disabled={feedback !== null || userAnswer === ''}
              >
                Check Answer
              </Button>
            </form>

            {/* Feedback Animation */}
            {feedback === 'correct' && (
              <div className="mt-6 text-center animate-bounce">
                <Heart className="w-16 h-16 text-green-500 mx-auto" fill="currentColor" />
                <p className="text-2xl font-bold text-green-600 mt-2">Correct!</p>
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="mt-6 text-center animate-shake">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                <p className="text-2xl font-bold text-red-600 mt-2">Try the next one!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Game;