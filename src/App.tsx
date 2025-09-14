import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginRegister from './components/LoginRegister';
import LanguageSelector from './components/LanguageSelector';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Header from './components/Header';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [languageSelected, setLanguageSelected] = useState(false);

  if (!user) {
    return <LoginRegister />;
  }

  if (user.role === 'student' && !languageSelected) {
    return <LanguageSelector onLanguageSelect={() => setLanguageSelected(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {user.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;