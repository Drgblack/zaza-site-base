'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  X, 
  Tag, 
  Crown,
  FileText,
  AlertCircle
} from 'lucide-react';

interface ResourceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResourceUploadModal({ isOpen, onClose }: ResourceUploadModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    tags: [] as string[],
    price: '',
    isPremium: false,
    file: null as File | null
  });
  const [newTag, setNewTag] = useState('');

  const categories = [
    'communication', 'assessment', 'behavior', 'academic', 'social-emotional'
  ];

  const types = [
    'snippet', 'template', 'lesson', 'assessment'
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Uploading resource:', formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File | undefined;
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-purple-600" />
            Share Your Resource
          </DialogTitle>
          <DialogDescription>
            Help fellow educators by sharing your AI-powered teaching materials
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Resource Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Parent-Teacher Conference Scripts"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your resource and how it helps teachers..."
              rows={4}
              required
            />
          </div>

          {/* Category and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Resource Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-600"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPremium"
                checked={formData.isPremium}
                onChange={(e) => setFormData(prev => ({ ...prev, isPremium: e.target.checked }))}
                className="rounded"
                aria-label="Make this a premium resource"
              />
              <Label htmlFor="isPremium" className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                Make this a premium resource
              </Label>
            </div>
            
            {formData.isPremium && (
              <div>
                <Label htmlFor="price">Price (€)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="9.99"
                />
              </div>
            )}
          </div>

          {/* File Upload */}
          <div>
            <Label htmlFor="file">Resource File</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload your resource file (PDF, DOC, or text)
              </p>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file')?.click()}
              >
                Choose File
              </Button>
              {formData.file && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {formData.file.name}
                </p>
              )}
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Upload Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure your resource is original or properly attributed</li>
                  <li>• Include clear instructions for use</li>
                  <li>• Tag appropriately for easy discovery</li>
                  <li>• Premium resources should offer exceptional value</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Resource
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
