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
              <img 
                src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                alt="NEOLEARN Logo" 
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <div className="text-2xl font-bold">NEOLEARN</div>
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