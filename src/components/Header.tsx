import React from 'react';
import { User, LogOut, Trophy, Zap, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-green-400 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-200 to-green-200 bg-clip-text text-transparent">NEOLEARN</div>
                <div className="text-xs opacity-80">Learn, Play, Grow</div>
              </div>
            </div>
            {user.role === 'student' && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                  <Zap size={16} />
                  <span className="text-sm font-medium">{user.streak} Day Streak</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                  <Trophy size={16} />
                  <span className="text-sm font-medium">{user.badges?.length || 0} Badges</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User size={20} />
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs opacity-80 capitalize">{user.role}</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;