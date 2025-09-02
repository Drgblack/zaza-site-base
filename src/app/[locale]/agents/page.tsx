import { AgentDashboard } from '@/components/agents/agent-dashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Agents - Zaza Promptly Agent-Native Features',
  description: 'Access AutoPlanner Agent Integration, KnowledgeCore Activation, and Adaptive AI Safety Layer for enhanced educational AI assistance.',
  keywords: ['AI agents', 'AutoPlanner', 'KnowledgeCore', 'AI safety', 'educational AI', 'teacher assistants'],
};

export default function AgentsPage() {
  // In a real implementation, this would:
  // 1. Check user authentication and permissions
  // 2. Load user profile and preferences
  // 3. Initialize agent configurations
  // 4. Handle cross-app integrations
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            AI Agents Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Advanced AI-powered tools for educational professionals
          </p>
        </div>
        
        <AgentDashboard />
      </div>
    </div>
  );
}