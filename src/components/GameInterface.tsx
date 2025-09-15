import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Star, CheckCircle, XCircle, Lightbulb, Shuffle, Search, Zap } from 'lucide-react';
import { Game, Subject } from '../types';

interface GameInterfaceProps {
  game: Game;
  subject: Subject;
  onBack: () => void;
}

// Mock quiz data
const quizQuestions: { [key: string]: any[] } = {
  'sci-quiz-1': [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      correct: 0,
      hint: "Think about the most common compound made of hydrogen and oxygen."
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: 1,
      hint: "It's named after the Roman messenger god."
    },
    {
      question: "What is the speed of light in vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
      correct: 0,
      hint: "It's approximately 3 × 10^8 meters per second."
    }
  ],
  'tech-quiz-1': [
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"],
      correct: 0,
      hint: "It's the brain of the computer."
    },
    {
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correct: 2,
      hint: "It runs in web browsers."
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
      correct: 0,
      hint: "It's used to create web pages."
    }
  ],
  'tech-sim-1': [
    {
      question: "In programming, what does 'debugging' mean?",
      options: ["Writing code", "Finding and fixing errors", "Running code", "Deleting code"],
      correct: 1,
      hint: "It's like being a detective for code problems."
    },
    {
      question: "What is the binary representation of decimal 5?",
      options: ["101", "110", "100", "111"],
      correct: 0,
      hint: "Think about powers of 2: 4+1=5."
    },
    {
      question: "Which protocol is used for secure web browsing?",
      options: ["HTTP", "HTTPS", "FTP", "SMTP"],
      correct: 1,
      hint: "The 'S' stands for Secure."
    }
  ],
  'tech-puzzle-1': [
    {
      question: "Complete the algorithm: To sort numbers, compare and ___",
      options: ["Delete", "Swap", "Add", "Multiply"],
      correct: 1,
      hint: "You need to change positions of elements."
    },
    {
      question: "What data structure follows LIFO principle?",
      options: ["Queue", "Stack", "Array", "Tree"],
      correct: 1,
      hint: "Last In, First Out - like a stack of plates."
    },
    {
      question: "In databases, what does SQL stand for?",
      options: ["Simple Query Language", "Structured Query Language", "System Query Language", "Standard Query Language"],
      correct: 1,
      hint: "It's used to manage and query databases."
    }
  ],
  'tech-hunt-1': [
    {
      question: "Find the tech term: 'Artificial intelligence that learns'",
      options: ["Machine Learning", "Deep Learning", "Neural Networks", "All of the above"],
      correct: 3,
      hint: "All these terms are related to AI that can learn."
    },
    {
      question: "What does 'IoT' stand for?",
      options: ["Internet of Things", "Input of Technology", "Interface of Tools", "Integration of Tech"],
      correct: 0,
      hint: "It connects everyday objects to the internet."
    },
    {
      question: "Which technology enables contactless payments?",
      options: ["Bluetooth", "WiFi", "NFC", "GPS"],
      correct: 2,
      hint: "Near Field Communication - works at very short distances."
    }
  ],
  'tech-quiz-2': [
    {
      question: "What is the main purpose of CSS?",
      options: ["Structure", "Styling", "Functionality", "Database"],
      correct: 1,
      hint: "It makes web pages look beautiful."
    },
    {
      question: "Which company developed the React framework?",
      options: ["Google", "Microsoft", "Facebook", "Apple"],
      correct: 2,
      hint: "It's now called Meta."
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Process Interface"],
      correct: 0,
      hint: "It allows different software applications to communicate."
    }
  ],
  'tech-sim-2': [
    {
      question: "In database design, what is a primary key?",
      options: ["A password", "A unique identifier", "A foreign reference", "A data type"],
      correct: 1,
      hint: "It uniquely identifies each record in a table."
    },
    {
      question: "What is the purpose of normalization in databases?",
      options: ["Speed up queries", "Reduce redundancy", "Increase storage", "Add security"],
      correct: 1,
      hint: "It eliminates duplicate data."
    },
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
      correct: 2,
      hint: "You use it to choose and display data."
    }
  ],
  'math-quiz-1': [
    {
      question: "What is the value of π (pi) approximately?",
      options: ["3.14159", "2.71828", "1.41421", "1.61803"],
      correct: 0,
      hint: "It's the ratio of a circle's circumference to its diameter."
    },
    {
      question: "If x + 5 = 12, what is the value of x?",
      options: ["7", "17", "5", "12"],
      correct: 0,
      hint: "Subtract 5 from both sides of the equation."
    },
    {
      question: "What is 2³ (2 to the power of 3)?",
      options: ["6", "8", "9", "4"],
      correct: 1,
      hint: "Multiply 2 by itself three times."
    }
  ],
  'math-puzzle-1': [
    {
      question: "What is the area of a triangle with base 6 and height 8?",
      options: ["24", "48", "14", "32"],
      correct: 0,
      hint: "Area = (1/2) × base × height"
    },
    {
      question: "If a circle has radius 5, what is its circumference?",
      options: ["10π", "25π", "5π", "15π"],
      correct: 0,
      hint: "Circumference = 2πr"
    },
    {
      question: "What is the volume of a cube with side length 4?",
      options: ["16", "64", "12", "48"],
      correct: 1,
      hint: "Volume = side³"
    }
  ],
  'math-sim-1': [
    {
      question: "What is the derivative of x²?",
      options: ["2x", "x", "2", "x²"],
      correct: 0,
      hint: "Use the power rule: bring down the exponent and subtract 1."
    },
    {
      question: "What is the integral of 2x?",
      options: ["x²", "x² + C", "2", "2x²"],
      correct: 1,
      hint: "Don't forget the constant of integration!"
    },
    {
      question: "What is the limit of (x²-1)/(x-1) as x approaches 1?",
      options: ["0", "1", "2", "undefined"],
      correct: 2,
      hint: "Factor the numerator first."
    }
  ],
  'math-hunt-1': [
    {
      question: "Find the pattern: 2, 4, 8, 16, ___",
      options: ["24", "32", "20", "18"],
      correct: 1,
      hint: "Each number is double the previous one."
    },
    {
      question: "What comes next in the Fibonacci sequence: 1, 1, 2, 3, 5, ___",
      options: ["7", "8", "9", "6"],
      correct: 1,
      hint: "Add the two previous numbers."
    },
    {
      question: "Complete the sequence: 1, 4, 9, 16, ___",
      options: ["20", "25", "24", "21"],
      correct: 1,
      hint: "These are perfect squares: 1², 2², 3², 4², ..."
    }
  ],
  'math-quiz-2': [
    {
      question: "What is the mean of the dataset: 2, 4, 6, 8, 10?",
      options: ["5", "6", "7", "8"],
      correct: 1,
      hint: "Add all numbers and divide by how many there are."
    },
    {
      question: "What is the probability of rolling a 6 on a fair die?",
      options: ["1/6", "1/3", "1/2", "1/4"],
      correct: 0,
      hint: "There's one favorable outcome out of six possible."
    },
    {
      question: "What is the standard deviation a measure of?",
      options: ["Central tendency", "Spread", "Correlation", "Frequency"],
      correct: 1,
      hint: "It tells you how spread out the data points are."
    }
  ],
  'math-puzzle-2': [
    {
      question: "What is sin(30°)?",
      options: ["1/2", "√3/2", "1", "√2/2"],
      correct: 0,
      hint: "It's one of the special angles in trigonometry."
    },
    {
      question: "What is cos(60°)?",
      options: ["1/2", "√3/2", "1", "0"],
      correct: 0,
      hint: "cos(60°) = sin(30°)"
    },
    {
      question: "What is tan(45°)?",
      options: ["1", "√2", "1/2", "√3"],
      correct: 0,
      hint: "At 45°, sine and cosine are equal."
    }
  ],
  'eng-quiz-1': [
    {
      question: "What is the strongest shape in engineering?",
      options: ["Square", "Triangle", "Circle", "Rectangle"],
      correct: 1,
      hint: "It distributes weight evenly across its structure."
    },
    {
      question: "Which material is commonly used in construction for its strength?",
      options: ["Wood", "Steel", "Plastic", "Glass"],
      correct: 1,
      hint: "It's an alloy of iron and carbon."
    },
    {
      question: "What does CAD stand for in engineering?",
      options: ["Computer Aided Design", "Central Air Distribution", "Computer And Design", "Creative Art Design"],
      correct: 0,
      hint: "It's software used to create technical drawings."
    }
  ]
};

const defaultQuestions = [
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correct: 0,
    hint: "Think about the most common compound made of hydrogen and oxygen."
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correct: 1,
    hint: "It's named after the Roman messenger god."
  },
  {
    question: "What is the speed of light in vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
    correct: 0,
    hint: "It's approximately 3 × 10^8 meters per second."
  }
];

const GameInterface: React.FC<GameInterfaceProps> = ({ game, subject, onBack }) => {
  const currentQuestions = quizQuestions[game.id] || defaultQuestions;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showHint, setShowHint] = useState(false);
  
  // Word Hunt specific states
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  
  // Puzzle specific states
  const [puzzlePieces, setPuzzlePieces] = useState<number[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  
  // Simulation specific states
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationInputs, setSimulationInputs] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < currentQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowHint(false);
    } else {
      setGameCompleted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScorePercentage = () => {
    return Math.round((score / currentQuestions.length) * 100);
  };

  if (gameCompleted) {
    const percentage = getScorePercentage();
    const earnedPoints = Math.round((percentage / 100) * game.points);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            {percentage >= 80 ? (
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            ) : (
              <XCircle className="mx-auto text-orange-500 mb-4" size={64} />
            )}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {percentage >= 80 ? 'Excellent Work!' : 'Good Effort!'}
            </h2>
            <p className="text-gray-600">You've completed the {game.name}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
              <div className="text-sm text-gray-600">Final Score</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-xl font-bold text-green-600">{score}/{currentQuestions.length}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-xl font-bold text-yellow-600">+{earnedPoints}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onBack}
              className={`w-full py-3 bg-gradient-to-r ${subject.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300`}
            >
              Continue Learning
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${subject.color} text-white`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="p-2 hover:bg-white/20 rounded-full transition-colors mr-4"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-xl font-bold">{game.name}</h1>
                <div className="flex items-center space-x-4 text-sm opacity-90">
                  <span>Question {currentQuestion + 1} of {currentQuestions.length}</span>
                  <div className="flex items-center">
                    <Star size={16} className="mr-1" />
                    <span>{game.points} points</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-lg font-bold">
                <Clock size={20} className="mr-2" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 bg-gradient-to-r ${subject.color} rounded-full transition-all duration-300`}
              style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Question */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentQuestions[currentQuestion].question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? `border-cyan-500 bg-cyan-50`
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Hint Section */}
            {showHint && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <Lightbulb className="text-yellow-600 mr-2 mt-1" size={20} />
                  <div>
                    <div className="font-medium text-yellow-800 mb-1">Hint:</div>
                    <div className="text-sm text-yellow-700">
                      {currentQuestions[currentQuestion].hint}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Lightbulb size={20} className="mr-2" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedAnswer !== null
                  ? `bg-gradient-to-r ${subject.color} text-white hover:shadow-lg`
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion + 1 === currentQuestions.length ? 'Finish' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInterface;