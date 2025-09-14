import React, { useState } from 'react';
import { 
  Atom, 
  Cpu, 
  Cog, 
  Calculator, 
  Trophy, 
  Award, 
  Zap, 
  MessageCircle, 
  Users, 
  BookOpen,
  Star,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SubjectPage from './SubjectPage';
import ChatBot from './ChatBot';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  const subjects = [
    {
      id: 'science',
      name: 'Science',
      icon: Atom,
      color: 'from-blue-500 to-green-500',
      progress: 75,
      games: [
        { id: 'sci-quiz-1', name: 'Physics Quiz', description: 'Test your physics knowledge', type: 'quiz', difficulty: 'easy', points: 100, duration: '15 min', players: 245 },
        { id: 'sci-puzzle-1', name: 'Chemistry Puzzle', description: 'Solve chemical equations', type: 'puzzle', difficulty: 'medium', points: 150, duration: '20 min', players: 189 },
        { id: 'sci-hunt-1', name: 'Biology Word Hunt', description: 'Find biology terms', type: 'word-hunt', difficulty: 'easy', points: 80, duration: '12 min', players: 312 },
        { id: 'sci-sim-1', name: 'Lab Simulation', description: 'Virtual science experiments', type: 'simulation', difficulty: 'hard', points: 200, duration: '25 min', players: 156 },
        { id: 'sci-quiz-2', name: 'Advanced Physics', description: 'Complex physics problems', type: 'quiz', difficulty: 'hard', points: 180, duration: '30 min', players: 98 },
        { id: 'sci-puzzle-2', name: 'Organic Chemistry', description: 'Molecular structure puzzles', type: 'puzzle', difficulty: 'hard', points: 170, duration: '22 min', players: 134 }
      ]
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: Cpu,
      color: 'from-green-500 to-blue-500',
      progress: 60,
      games: [
        { id: 'tech-quiz-1', name: 'Computer Basics', description: 'Learn computer fundamentals', type: 'quiz', difficulty: 'easy', points: 100, duration: '15 min', players: 278 },
        { id: 'tech-sim-1', name: 'Coding Simulation', description: 'Practice programming', type: 'simulation', difficulty: 'hard', points: 200, duration: '35 min', players: 167 },
        { id: 'tech-puzzle-1', name: 'Algorithm Puzzle', description: 'Solve coding challenges', type: 'puzzle', difficulty: 'medium', points: 140, duration: '18 min', players: 203 },
        { id: 'tech-hunt-1', name: 'Tech Terms Hunt', description: 'Find technology keywords', type: 'word-hunt', difficulty: 'easy', points: 90, duration: '10 min', players: 345 },
        { id: 'tech-quiz-2', name: 'Web Development', description: 'HTML, CSS, JavaScript quiz', type: 'quiz', difficulty: 'medium', points: 130, duration: '20 min', players: 198 },
        { id: 'tech-sim-2', name: 'Database Design', description: 'Design database systems', type: 'simulation', difficulty: 'hard', points: 220, duration: '40 min', players: 89 }
      ]
    },
    {
      id: 'engineering',
      name: 'Engineering',
      icon: Cog,
      color: 'from-blue-600 to-green-400',
      progress: 45,
      games: [
        { id: 'eng-puzzle-1', name: 'Bridge Building', description: 'Design strong bridges', type: 'puzzle', difficulty: 'hard', points: 180, duration: '25 min', players: 156 },
        { id: 'eng-quiz-1', name: 'Mechanical Quiz', description: 'Mechanical engineering basics', type: 'quiz', difficulty: 'medium', points: 120, duration: '18 min', players: 234 },
        { id: 'eng-sim-1', name: 'Circuit Design', description: 'Build electrical circuits', type: 'simulation', difficulty: 'medium', points: 160, duration: '22 min', players: 187 },
        { id: 'eng-hunt-1', name: 'Engineering Terms', description: 'Find engineering vocabulary', type: 'word-hunt', difficulty: 'medium', points: 110, duration: '14 min', players: 267 },
        { id: 'eng-puzzle-2', name: 'Gear Systems', description: 'Design mechanical gears', type: 'puzzle', difficulty: 'hard', points: 190, duration: '28 min', players: 123 },
        { id: 'eng-quiz-2', name: 'Civil Engineering', description: 'Construction and structures', type: 'quiz', difficulty: 'hard', points: 170, duration: '25 min', players: 145 }
      ]
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: Calculator,
      color: 'from-green-600 to-blue-400',
      progress: 85,
      games: [
        { id: 'math-quiz-1', name: 'Algebra Challenge', description: 'Solve algebraic equations', type: 'quiz', difficulty: 'medium', points: 130, duration: '20 min', players: 289 },
        { id: 'math-puzzle-1', name: 'Geometry Puzzle', description: 'Geometric shape challenges', type: 'puzzle', difficulty: 'easy', points: 90, duration: '15 min', players: 356 },
        { id: 'math-sim-1', name: 'Calculus Simulator', description: 'Interactive calculus problems', type: 'simulation', difficulty: 'hard', points: 210, duration: '30 min', players: 134 },
        { id: 'math-hunt-1', name: 'Number Hunt', description: 'Find mathematical patterns', type: 'word-hunt', difficulty: 'easy', points: 85, duration: '12 min', players: 398 },
        { id: 'math-quiz-2', name: 'Statistics Quiz', description: 'Probability and statistics', type: 'quiz', difficulty: 'medium', points: 140, duration: '22 min', players: 212 },
        { id: 'math-puzzle-2', name: 'Trigonometry Puzzle', description: 'Solve trigonometric problems', type: 'puzzle', difficulty: 'hard', points: 175, duration: '26 min', players: 167 }
      ]
    }
  ];

  const achievements = [
    { name: 'First Quiz Master', description: 'Complete your first quiz', earned: true },
    { name: 'Streak Champion', description: '7-day learning streak', earned: true },
    { name: 'Science Explorer', description: 'Complete 5 science games', earned: false },
    { name: 'Math Wizard', description: 'Score 90% in math quiz', earned: true }
  ];

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    return (
      <SubjectPage 
        subject={subject!} 
        onBack={() => setSelectedSubject(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stats Overview */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">0</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{user?.streak || 0}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">0</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Grade {user?.grade}</div>
              <div className="text-sm text-gray-600">Current Level</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h2>
              <p className="opacity-90">Ready to continue your learning journey? Let's achieve something great today!</p>
            </div>

            {/* Subject Grid */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Choose Your Subject</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {subjects.map((subject) => {
                  const IconComponent = subject.icon;
                  return (
                    <div
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-2 border-transparent hover:border-gray-100"
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${subject.color} flex items-center justify-center mb-4`}>
                        <IconComponent className="text-white" size={32} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">{subject.name}</h4>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${subject.color}`}
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{subject.games.length} games available</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setShowChat(true)}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <MessageCircle className="mx-auto text-blue-500 mb-3" size={32} />
                  <div className="font-medium text-gray-800">AI Tutor</div>
                  <div className="text-sm text-gray-500">Get instant help</div>
                </button>
                <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <Users className="mx-auto text-green-500 mb-3" size={32} />
                  <div className="font-medium text-gray-800">Mentor Meeting</div>
                  <div className="text-sm text-gray-500">Schedule session</div>
                </button>
                <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <BookOpen className="mx-auto text-purple-500 mb-3" size={32} />
                  <div className="font-medium text-gray-800">Study Guide</div>
                  <div className="text-sm text-gray-500">Learning resources</div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Trophy className="text-yellow-500 mr-2" size={24} />
                <h3 className="font-bold text-gray-800">Recent Achievements</h3>
              </div>
              <div className="space-y-3">
                {achievements.filter(a => a.earned).slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Award className="text-yellow-500" size={20} />
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{achievement.name}</div>
                      <div className="text-xs text-gray-500">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Goal */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Target className="text-blue-500 mr-2" size={24} />
                <h3 className="font-bold text-gray-800">Daily Goal</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">3/5</div>
                <div className="text-sm text-gray-600 mb-4">Games Completed</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">2 more to reach your daily goal!</div>
              </div>
            </div>

            {/* Scholarship Alert for Grade 12 */}
            {user?.grade === 12 && (
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-2xl p-6">
                <Star className="mb-3" size={24} />
                <h3 className="font-bold mb-2">Scholarship Opportunities!</h3>
                <p className="text-sm opacity-90 mb-4">
                  You're eligible for higher education scholarships. Check available opportunities.
                </p>
                <button className="bg-white text-orange-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors">
                  View Scholarships
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Bot */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default StudentDashboard;