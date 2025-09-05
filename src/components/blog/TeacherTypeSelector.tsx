"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GraduationCap, Users, BookOpen, Crown, Sprout, X } from 'lucide-react';

interface TeacherTypeSelectorProps {
  currentType?: string;
}

const teacherTypes = [
  {
    id: 'elementary',
    title: 'Elementary (K-5)',
    description: 'Creative classroom solutions',
    icon: Sprout,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 hover:bg-green-100',
    textColor: 'text-green-700'
  },
  {
    id: 'middle',
    title: 'Middle School (6-8)',
    description: 'Navigate unique challenges',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    textColor: 'text-blue-700'
  },
  {
    id: 'high-school',
    title: 'High School (9-12)',
    description: 'Advanced strategies',
    icon: GraduationCap,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
    textColor: 'text-purple-700'
  },
  {
    id: 'admin',
    title: 'Admin & Leadership',
    description: 'Strategic guidance',
    icon: Crown,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50 hover:bg-amber-100',
    textColor: 'text-amber-700'
  },
  {
    id: 'new-teacher',
    title: 'New Teacher',
    description: 'Build confidence',
    icon: BookOpen,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50 hover:bg-pink-100',
    textColor: 'text-pink-700'
  }
];

export default function TeacherTypeSelector({ currentType }: TeacherTypeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTypeSelect = (typeId: string) => {
    const params = new URLSearchParams(searchParams);
    if (typeId === currentType) {
      params.delete('teacher_type');
    } else {
      params.set('teacher_type', typeId);
    }
    
    const newSearch = params.toString();
    router.push(`/en/blog/enhanced${newSearch ? `?${newSearch}` : ''}`);
    setIsExpanded(false);
  };

  const clearSelection = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('teacher_type');
    const newSearch = params.toString();
    router.push(`/en/blog/enhanced${newSearch ? `?${newSearch}` : ''}`);
  };

  const selectedType = teacherTypes.find(type => type.id === currentType);

  return (
    <div className="relative">
      {!currentType && !isExpanded && (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Find Content for Your Role
          </h2>
          <p className="text-gray-600 mb-6">
            Get personalized recommendations based on your teaching context
          </p>
          <button
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Users className="w-5 h-5" />
            Choose Your Role
          </button>
        </div>
      )}

      {selectedType && (
        <div className={`${selectedType.bgColor} rounded-2xl p-6 mb-8 border-2 border-transparent`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedType.color} flex items-center justify-center text-white shadow-lg`}>
                <selectedType.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${selectedType.textColor}`}>
                  Content for {selectedType.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedType.description} - personalized for your needs
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(true)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-colors"
              >
                Change
              </button>
              <button
                onClick={clearSelection}
                className="w-8 h-8 rounded-lg hover:bg-white/50 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="bg-white rounded-2xl border shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              What's your teaching context?
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teacherTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`${type.bgColor} p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                  currentType === type.id 
                    ? 'border-current shadow-lg scale-105' 
                    : 'border-transparent hover:border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <type.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold ${type.textColor} mb-1`}>
                      {type.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-tight">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don't see your role? <button className="text-purple-600 hover:text-purple-700 font-medium">Browse all content</button> for universal teaching strategies.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}