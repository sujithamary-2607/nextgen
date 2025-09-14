import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  Award, 
  BarChart3, 
  Calendar,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { StudentProgress } from '../types';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock student data
  const studentsProgress: StudentProgress[] = [
    {
      studentId: '1',
      studentName: 'Priya Sharma',
      grade: 8,
      totalPoints: 1250,
      completedGames: 15,
      averageScore: 85,
      streak: 7,
      lastActive: new Date('2024-01-15')
    },
    {
      studentId: '2',
      studentName: 'Rahul Kumar',
      grade: 9,
      totalPoints: 980,
      completedGames: 12,
      averageScore: 78,
      streak: 3,
      lastActive: new Date('2024-01-14')
    },
    {
      studentId: '3',
      studentName: 'Meera Patel',
      grade: 10,
      totalPoints: 1450,
      completedGames: 18,
      averageScore: 92,
      streak: 12,
      lastActive: new Date('2024-01-15')
    },
    {
      studentId: '4',
      studentName: 'Arjun Singh',
      grade: 7,
      totalPoints: 750,
      completedGames: 8,
      averageScore: 65,
      streak: 1,
      lastActive: new Date('2024-01-13')
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-800">{studentsProgress.length}</div>
              <div className="text-gray-600 text-sm">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-800">82%</div>
              <div className="text-gray-600 text-sm">Average Score</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <BookOpen className="text-purple-600" size={24} />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-800">53</div>
              <div className="text-gray-600 text-sm">Games Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Award className="text-yellow-600" size={24} />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-800">24</div>
              <div className="text-gray-600 text-sm">Badges Earned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Student Engagement</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
              <p>Engagement Chart</p>
              <p className="text-sm">(Chart visualization would go here)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Subject Performance</h3>
          <div className="space-y-4">
            {['Science', 'Mathematics', 'Technology', 'Engineering'].map((subject, index) => {
              const scores = [85, 78, 82, 75];
              return (
                <div key={subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{subject}</span>
                    <span className="text-gray-600">{scores[index]}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      style={{ width: `${scores[index]}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentProgress = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-green-600 text-white rounded-lg hover:from-cyan-700 hover:to-green-700 transition-colors">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Student Name</th>
                <th className="text-left p-4 font-medium text-gray-600">Grade</th>
                <th className="text-left p-4 font-medium text-gray-600">Total Points</th>
                <th className="text-left p-4 font-medium text-gray-600">Games Completed</th>
                <th className="text-left p-4 font-medium text-gray-600">Average Score</th>
                <th className="text-left p-4 font-medium text-gray-600">Streak</th>
                <th className="text-left p-4 font-medium text-gray-600">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {studentsProgress.map((student) => (
                <tr key={student.studentId} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-800">{student.studentName}</div>
                  </td>
                  <td className="p-4 text-gray-600">Grade {student.grade}</td>
                  <td className="p-4">
                    <span className="font-semibold text-blue-600">{student.totalPoints}</span>
                  </td>
                  <td className="p-4 text-gray-600">{student.completedGames}</td>
                  <td className="p-4">
                    <span className={`font-medium ${
                      student.averageScore >= 80 ? 'text-green-600' : 
                      student.averageScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {student.averageScore}%
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                      <span className="text-gray-600">{student.streak} days</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {student.lastActive.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Learning Patterns */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Learning Patterns</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <Calendar size={48} className="mx-auto mb-2 opacity-50" />
              <p>Activity Heatmap</p>
              <p className="text-sm">(Heatmap visualization would go here)</p>
            </div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
              <p>Trend Analysis</p>
              <p className="text-sm">(Line chart would go here)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Key Insights</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">↑ 23%</div>
            <div className="text-sm text-gray-600">Engagement Increase</div>
            <div className="text-xs text-gray-500 mt-1">vs last month</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">4.2</div>
            <div className="text-sm text-gray-600">Avg Games/Day</div>
            <div className="text-xs text-gray-500 mt-1">per student</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-600">Retention Rate</div>
            <div className="text-xs text-gray-500 mt-1">weekly active</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Teacher Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Current Date</div>
              <div className="font-medium">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'students', label: 'Student Progress', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'students' && renderStudentProgress()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default TeacherDashboard;