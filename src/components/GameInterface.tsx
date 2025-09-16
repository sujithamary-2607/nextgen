import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Star, Lightbulb, Shuffle, RotateCcw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface GameInterfaceProps {
  game: {
    id: string;
    title: string;
    type: 'quiz' | 'word-hunt' | 'puzzle' | 'simulation';
    subject: string;
    difficulty: string;
    points: number;
    duration: string;
    description: string;
  };
  onBack: () => void;
}

// Game data for different types
const gameData = {
  quiz: {
    questions: [
      {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correct: 0,
        hint: "It's made of hydrogen and oxygen atoms"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
        hint: "It appears red due to iron oxide on its surface"
      },
      {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
        correct: 0,
        hint: "It's approximately 3 × 10^8 meters per second"
      }
    ]
  },
  wordHunt: {
    words: ["SCIENCE", "PHYSICS", "CHEMISTRY", "BIOLOGY", "ATOM", "MOLECULE"],
    grid: [
      ['S', 'C', 'I', 'E', 'N', 'C', 'E', 'X'],
      ['P', 'H', 'Y', 'S', 'I', 'C', 'S', 'Y'],
      ['C', 'H', 'E', 'M', 'I', 'S', 'T', 'R'],
      ['B', 'I', 'O', 'L', 'O', 'G', 'Y', 'Y'],
      ['A', 'T', 'O', 'M', 'X', 'Y', 'Z', 'A'],
      ['M', 'O', 'L', 'E', 'C', 'U', 'L', 'E'],
      ['X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'F'],
      ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
    ]
  },
  puzzle: {
    pieces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null],
    solution: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null]
  },
  simulation: {
    steps: [
      { id: 1, title: "Setup Equipment", description: "Prepare the laboratory equipment", completed: false },
      { id: 2, title: "Add Chemicals", description: "Carefully add the required chemicals", completed: false },
      { id: 3, title: "Heat Solution", description: "Heat the solution to the required temperature", completed: false },
      { id: 4, title: "Observe Reaction", description: "Record your observations", completed: false },
      { id: 5, title: "Analyze Results", description: "Analyze and document the results", completed: false }
    ]
  }
};

const GameInterface: React.FC<GameInterfaceProps> = ({ game, onBack }) => {
  const { updateUserProgress, language } = useAuth();
  const [gameState, setGameState] = useState<any>({});
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [game.type]);

  const initializeGame = () => {
    switch (game.type) {
      case 'quiz':
        setGameState({
          currentQuestion: 0,
          selectedAnswer: null,
          showHint: false,
          answers: []
        });
        break;
      case 'word-hunt':
        setGameState({
          foundWords: [],
          selectedCells: [],
          currentSelection: []
        });
        break;
      case 'puzzle':
        setGameState({
          pieces: shuffleArray([...gameData.puzzle.pieces])
        });
        break;
      case 'simulation':
        setGameState({
          currentStep: 0,
          steps: [...gameData.simulation.steps]
        });
        break;
    }
  };

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleGameComplete = () => {
    setGameCompleted(true);
    updateUserProgress(game.points, 1);
  };

  const renderQuizGame = () => {
    const { currentQuestion, selectedAnswer, showHint } = gameState;
    const question = gameData.quiz.questions[currentQuestion];

    const handleAnswerSelect = (index: number) => {
      setGameState(prev => ({ ...prev, selectedAnswer: index }));
    };

    const handleNextQuestion = () => {
      const isCorrect = selectedAnswer === question.correct;
      if (isCorrect) {
        setScore(prev => prev + 10);
      }

      if (currentQuestion < gameData.quiz.questions.length - 1) {
        setGameState(prev => ({
          ...prev,
          currentQuestion: currentQuestion + 1,
          selectedAnswer: null,
          showHint: false
        }));
      } else {
        handleGameComplete();
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/80">Question {currentQuestion + 1} of {gameData.quiz.questions.length}</span>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">{score} points</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-6">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  selectedAnswer === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setGameState(prev => ({ ...prev, showHint: !showHint }))}
              className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Hint</span>
            </button>
            
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {currentQuestion < gameData.quiz.questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>

          {showHint && (
            <div className="mt-4 p-4 bg-yellow-500/20 rounded-lg">
              <p className="text-yellow-100">{question.hint}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWordHuntGame = () => {
    const { foundWords, selectedCells } = gameState;
    const { grid, words } = gameData.wordHunt;

    const handleCellClick = (row: number, col: number) => {
      const cellKey = `${row}-${col}`;
      const newSelection = selectedCells.includes(cellKey)
        ? selectedCells.filter(cell => cell !== cellKey)
        : [...selectedCells, cellKey];
      
      setGameState(prev => ({ ...prev, selectedCells: newSelection }));
    };

    const checkForWord = () => {
      // Simple word checking logic - in a real app, this would be more sophisticated
      const selectedLetters = selectedCells.map(cell => {
        const [row, col] = cell.split('-').map(Number);
        return grid[row][col];
      }).join('');

      const foundWord = words.find(word => 
        word === selectedLetters || word === selectedLetters.split('').reverse().join('')
      );

      if (foundWord && !foundWords.includes(foundWord)) {
        setGameState(prev => ({
          ...prev,
          foundWords: [...foundWords, foundWord],
          selectedCells: []
        }));
        setScore(prev => prev + 15);

        if (foundWords.length + 1 === words.length) {
          handleGameComplete();
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/80">Find {words.length} words</span>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">{score} points</span>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-1 mb-6">
            {grid.map((row, rowIndex) =>
              row.map((letter, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const isSelected = selectedCells.includes(cellKey);
                
                return (
                  <button
                    key={cellKey}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={checkForWord}
              disabled={selectedCells.length === 0}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Check Word
            </button>
            
            <button
              onClick={() => setGameState(prev => ({ ...prev, selectedCells: [] }))}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="mt-4">
            <h4 className="text-white font-semibold mb-2">Found Words ({foundWords.length}/{words.length}):</h4>
            <div className="flex flex-wrap gap-2">
              {words.map(word => (
                <span
                  key={word}
                  className={`px-3 py-1 rounded-full text-sm ${
                    foundWords.includes(word)
                      ? 'bg-green-500 text-white'
                      : 'bg-white/20 text-white/60'
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPuzzleGame = () => {
    const { pieces } = gameState;

    const handlePieceClick = (index: number) => {
      const emptyIndex = pieces.indexOf(null);
      const canMove = Math.abs(index - emptyIndex) === 1 || Math.abs(index - emptyIndex) === 4;

      if (canMove) {
        const newPieces = [...pieces];
        [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
        setGameState(prev => ({ ...prev, pieces: newPieces }));

        // Check if puzzle is solved
        const isSolved = newPieces.every((piece, idx) => 
          idx === 15 ? piece === null : piece === idx + 1
        );

        if (isSolved) {
          setScore(100);
          handleGameComplete();
        }
      }
    };

    const shufflePuzzle = () => {
      setGameState(prev => ({ ...prev, pieces: shuffleArray([...gameData.puzzle.pieces]) }));
    };

    return (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/80">Number Puzzle</span>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">{score} points</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6 max-w-xs mx-auto">
            {pieces.map((piece, index) => (
              <button
                key={index}
                onClick={() => handlePieceClick(index)}
                className={`w-16 h-16 rounded-lg font-bold text-xl transition-all ${
                  piece === null
                    ? 'bg-transparent'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {piece}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={shufflePuzzle}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <Shuffle className="w-5 h-5" />
              <span>Shuffle</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSimulationGame = () => {
    const { currentStep, steps } = gameState;

    const handleStepComplete = () => {
      const newSteps = [...steps];
      newSteps[currentStep].completed = true;
      
      if (currentStep < steps.length - 1) {
        setGameState(prev => ({
          ...prev,
          steps: newSteps,
          currentStep: currentStep + 1
        }));
        setScore(prev => prev + 20);
      } else {
        setGameState(prev => ({ ...prev, steps: newSteps }));
        setScore(prev => prev + 20);
        handleGameComplete();
      }
    };

    const currentStepData = steps[currentStep];

    return (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/80">Lab Simulation</span>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">{score} points</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80">Progress</span>
              <span className="text-white/80">{currentStep + 1} / {steps.length}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Step {currentStep + 1}: {currentStepData.title}
            </h3>
            <p className="text-white/80 mb-4">{currentStepData.description}</p>
            
            <div className="bg-blue-500/20 rounded-lg p-4 mb-4">
              <p className="text-blue-100">
                Follow the instructions carefully and click "Complete Step" when you're ready to proceed.
              </p>
            </div>

            <button
              onClick={handleStepComplete}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Complete Step
            </button>
          </div>

          <div className="space-y-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  step.completed
                    ? 'bg-green-500/20 text-green-100'
                    : index === currentStep
                    ? 'bg-blue-500/20 text-blue-100'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/20 text-white/60'
                  }`}
                >
                  {step.completed ? '✓' : index + 1}
                </div>
                <span className="font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderGameContent = () => {
    switch (game.type) {
      case 'quiz':
        return renderQuizGame();
      case 'word-hunt':
        return renderWordHuntGame();
      case 'puzzle':
        return renderPuzzleGame();
      case 'simulation':
        return renderSimulationGame();
      default:
        return <div>Game type not supported</div>;
    }
  };

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </button>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
            <p className="text-white/80 mb-6">You completed {game.title}!</p>
            
            <div className="bg-white/10 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{score}</div>
                  <div className="text-white/80">Points Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">+1</div>
                  <div className="text-white/80">Games Completed</div>
                </div>
              </div>
            </div>

            <button
              onClick={onBack}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all"
            >
              Play More Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Games</span>
        </button>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{game.title}</h1>
              <p className="text-white/80">{game.description}</p>
            </div>
            <div className="text-right">
              <div className="text-white/80">Difficulty: {game.difficulty}</div>
              <div className="text-white/80">Duration: {game.duration}</div>
            </div>
          </div>
        </div>

        {renderGameContent()}
      </div>
    </div>
  );
};

export default GameInterface;