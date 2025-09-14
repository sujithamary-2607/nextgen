import React, { useState } from 'react';
import { ArrowLeft, Play, Trophy, Star, Clock, Users } from 'lucide-react';
import { Subject, Game } from '../types';
import GameInterface from './GameInterface';

interface SubjectPageProps {
  subject: Subject;
  onBack: () => void;
}

const SubjectPage: React.FC<SubjectPageProps> = ({ subject, onBack }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGameTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return '🧠';
      case 'puzzle': return '🧩';
      case 'word-hunt': return '🔍';
      case 'simulation': return '⚗️';
      default: return '🎮';
    }
  };

  if (selectedGame) {
    return (
      <GameInterface 
        game={selectedGame}
        subject={subject}
        onBack={() => setSelectedGame(null)}
      />
    );
  }

  const IconComponent = subject.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${subject.color} text-white`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-full transition-colors mr-4"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <IconComponent size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{subject.name}</h1>
                <p className="opacity-90">Interactive Learning Games</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">75%</div>
              <div className="text-sm opacity-90">Progress</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{subject.games.length}</div>
              <div className="text-sm opacity-90">Games</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">850</div>
              <div className="text-sm opacity-90">Points</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Game</h2>
          <p className="text-gray-600">Select a game to start learning and earning points!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subject.games.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{getGameTypeIcon(game.type)}</div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} />
                    <span className="text-sm font-medium ml-1">{game.points}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{game.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>{game.players} players</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{game.description}</p>

              <button className={`w-full py-3 bg-gradient-to-r ${subject.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2`}>
                <Play size={20} />
                <span>Start Game</span>
              </button>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Subject Achievements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <Trophy className="mx-auto text-yellow-500 mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Quiz Master</h3>
              <p className="text-sm text-gray-600 mb-4">Complete 5 quizzes with 80% score</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">3/5 completed</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <Trophy className="mx-auto text-purple-500 mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Puzzle Solver</h3>
              <p className="text-sm text-gray-600 mb-4">Solve 10 puzzles without hints</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">2/10 completed</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <Trophy className="mx-auto text-green-500 mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Speed Runner</h3>
              <p className="text-sm text-gray-600 mb-4">Complete any game in under 5 minutes</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="text-xs text-green-600 mt-2 font-medium">Achieved! ✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;