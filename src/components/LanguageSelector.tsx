import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LanguageSelectorProps {
  onLanguageSelect: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect }) => {
  const { user, updateLanguage } = useAuth();

  const handleLanguageSelect = (language: 'tamil' | 'english') => {
    updateLanguage(language);
    onLanguageSelect();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Globe className="mx-auto text-green-600 mb-4" size={60} />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Language</h2>
          <p className="text-gray-600">Select your preferred language to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLanguageSelect('english')}
            className="w-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">English</div>
                <div className="text-gray-500 text-sm">Continue in English</div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={24} />
            </div>
          </button>

          <button
            onClick={() => handleLanguageSelect('tamil')}
            className="w-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-xl font-semibold text-gray-800 group-hover:text-orange-600">தமிழ்</div>
                <div className="text-gray-500 text-sm">தமிழில் தொடரவும்</div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" size={24} />
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Welcome, <span className="font-medium text-gray-700">{user?.name}</span>! 
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;