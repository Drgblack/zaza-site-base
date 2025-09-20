'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Search, Save, BookOpen, Tag, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  MessageTemplate, 
  TemplateStorage, 
  applyTemplate, 
  generateTemplateId 
} from '@/lib/templates';

interface TemplateLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: MessageTemplate) => void;
  currentMessage?: {
    content: string;
    starter: string;
    format: 'email' | 'sms';
    tone: string;
    student: string;
  };
}

export function TemplateLibrary({ 
  isOpen, 
  onClose, 
  onSelectTemplate, 
  currentMessage 
}: TemplateLibraryProps) {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveForm, setSaveForm] = useState({
    name: '',
    description: '',
    category: 'custom' as MessageTemplate['category'],
    tags: ''
  });

  const categories = [
    { id: 'all', label: 'All Templates', count: 0 },
    { id: 'positive', label: 'Positive News', count: 0 },
    { id: 'concern', label: 'Concerns', count: 0 },
    { id: 'update', label: 'Updates', count: 0 },
    { id: 'homework', label: 'Homework', count: 0 },
    { id: 'behavior', label: 'Behavior', count: 0 },
    { id: 'custom', label: 'My Templates', count: 0 }
  ];

  useEffect(() => {
    if (isOpen) {
      const allTemplates = TemplateStorage.getAllTemplates();
      setTemplates(allTemplates);
      
      // Update category counts
      categories.forEach(cat => {
        if (cat.id === 'all') {
          cat.count = allTemplates.length;
        } else {
          cat.count = allTemplates.filter(t => t.category === cat.id).length;
        }
      });
    }
  }, [isOpen]);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSaveCurrentMessage = () => {
    if (!currentMessage) return;
    
    const newTemplate: MessageTemplate = {
      id: generateTemplateId(),
      name: saveForm.name || `${currentMessage.format} - ${currentMessage.starter}`,
      description: saveForm.description || 'Custom template',
      starter: currentMessage.starter as any,
      format: currentMessage.format,
      tone: currentMessage.tone,
      category: saveForm.category,
      content: currentMessage.content,
      student: '{{student}}',
      tags: saveForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false,
      useCount: 0
    };

    TemplateStorage.saveTemplate(newTemplate);
    setTemplates(TemplateStorage.getAllTemplates());
    setShowSaveDialog(false);
    setSaveForm({ name: '', description: '', category: 'custom', tags: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] bg-slate-900 border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-fuchsia-500" />
            <h2 className="text-xl font-semibold text-white">Template Library</h2>
          </div>
          <div className="flex items-center gap-2">
            {currentMessage && (
              <Button
                onClick={() => setShowSaveDialog(true)}
                variant="outline"
                size="sm"
                className="text-white border-slate-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Current
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(80vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-slate-700 p-4 bg-slate-800/50">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
            </div>

            {/* Categories */}
            <div className="space-y-1">
              <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Categories
              </h3>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                    selectedCategory === category.id
                      ? "bg-fuchsia-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  )}
                >
                  <span>{category.label}</span>
                  <span className="text-xs opacity-60">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Template List */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid gap-4">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  className="bg-slate-800/30 border border-slate-600 rounded-lg p-4 hover:bg-slate-800/50 transition-colors cursor-pointer"
                  onClick={() => onSelectTemplate(template)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-white mb-1">{template.name}</h3>
                      <p className="text-sm text-slate-400 mb-2">{template.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="bg-slate-700 px-2 py-1 rounded">{template.format}</span>
                      <span className="bg-slate-700 px-2 py-1 rounded">{template.tone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      <span>{template.tags.join(', ') || 'No tags'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{template.author || 'You'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{template.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-300 bg-slate-900/50 rounded p-3 max-h-20 overflow-hidden">
                    {template.content.substring(0, 150)}...
                  </div>
                </div>
              ))}
              
              {filteredTemplates.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No templates found</h3>
                  <p className="text-sm">Try adjusting your search or category filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-white mb-4">Save as Template</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={saveForm.name}
                    onChange={(e) => setSaveForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    placeholder="e.g., Positive Behavior Email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={saveForm.description}
                    onChange={(e) => setSaveForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    placeholder="Brief description of when to use this template"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={saveForm.category}
                    onChange={(e) => setSaveForm(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  >
                    <option value="positive">Positive News</option>
                    <option value="concern">Concerns</option>
                    <option value="update">Updates</option>
                    <option value="homework">Homework</option>
                    <option value="behavior">Behavior</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={saveForm.tags}
                    onChange={(e) => setSaveForm(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    placeholder="behavior, positive, communication"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleSaveCurrentMessage}
                  className="flex-1"
                  disabled={!saveForm.name}
                >
                  Save Template
                </Button>
                <Button
                  onClick={() => setShowSaveDialog(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}