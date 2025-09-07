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
  AlertCircle,
  Info,
  CheckCircle,
  XCircle
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      // Validate file types
      if (formData.file) {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!allowedTypes.includes(formData.file.type)) {
          throw new Error('Please upload a PDF, DOC, DOCX, or TXT file.');
        }
      }

      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if resource is original (simulation)
      const isOriginal = !formData.title.toLowerCase().includes('copied');
      if (!isOriginal) {
        throw new Error('This resource appears to be copied. Please ensure you upload original or properly attributed content.');
      }

      // Success
      setUploadStatus('success');
      setTimeout(() => {
        onClose();
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          type: '',
          tags: [],
          price: '',
          isPremium: false,
          file: null
        });
        setUploadStatus('idle');
      }, 2000);

    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File | undefined;
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto bg-white dark:bg-slate-900 backdrop-blur-md border-2 border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl mx-4" 
        aria-labelledby="upload-modal-title" 
        aria-describedby="upload-modal-description"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full p-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          aria-label="Close upload modal"
        >
          <X className="h-5 w-5" />
        </button>

        <DialogHeader className="space-y-3 md:space-y-4 pb-4 md:pb-6">
          <DialogTitle 
            id="upload-modal-title"
            className="flex items-center gap-3 text-xl md:text-2xl font-bold text-slate-900 dark:text-white"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Upload className="h-5 w-5 text-white" />
            </div>
            Upload Your Resource
          </DialogTitle>
          <DialogDescription 
            id="upload-modal-description"
            className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            Share your knowledge with fellow educators and help build our community of AI-powered teaching resources
          </DialogDescription>
        </DialogHeader>

        {/* Status Messages */}
        {uploadStatus === 'success' && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-100">Upload Successful!</h4>
                <p className="text-sm text-green-700 dark:text-green-200">Your resource has been submitted and will be reviewed shortly.</p>
              </div>
            </div>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              <div>
                <h4 className="font-semibold text-red-900 dark:text-red-100">Upload Failed</h4>
                <p className="text-sm text-red-700 dark:text-red-200">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base font-semibold text-slate-900 dark:text-white">
              Resource Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Parent-Teacher Conference Scripts"
              required
              disabled={isUploading}
              className="h-12 text-base border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800/50 rounded-lg bg-white dark:bg-slate-800 transition-all duration-200"
              aria-describedby="title-help"
            />
            <p id="title-help" className="text-sm text-slate-500 dark:text-slate-400">
              Choose a clear, descriptive title that educators will easily find
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-semibold text-slate-900 dark:text-white">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your resource and how it helps teachers..."
              rows={4}
              required
              disabled={isUploading}
              className="text-base border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800/50 rounded-lg bg-white dark:bg-slate-800 transition-all duration-200 resize-none"
              aria-describedby="description-help"
            />
            <p id="description-help" className="text-sm text-slate-500 dark:text-slate-400">
              Explain what your resource contains and how other teachers can benefit from it
            </p>
          </div>

          {/* Category and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <Label htmlFor="category" className="text-base font-semibold text-slate-900 dark:text-white">
                Category *
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                disabled={isUploading}
              >
                <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800/50 rounded-lg bg-white dark:bg-slate-800 transition-all duration-200">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-xl rounded-lg">
                  {categories.map(category => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="text-base hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md transition-colors"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="type" className="text-base font-semibold text-slate-900 dark:text-white">
                Resource Type *
              </Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                disabled={isUploading}
              >
                <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800/50 rounded-lg bg-white dark:bg-slate-800 transition-all duration-200">
                  <SelectValue placeholder="Choose resource type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-xl rounded-lg">
                  {types.map(type => (
                    <SelectItem 
                      key={type} 
                      value={type}
                      className="text-base hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md transition-colors"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label htmlFor="tags" className="text-base font-semibold text-slate-900 dark:text-white">
              Tags (Optional)
            </Label>
            <div className="flex gap-3">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="e.g., parent-teacher, conferences..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                disabled={isUploading}
                className="flex-1 h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800/50 rounded-lg bg-white dark:bg-slate-800 transition-all duration-200"
              />
              <Button 
                type="button" 
                onClick={handleAddTag} 
                variant="outline"
                disabled={isUploading || !newTag.trim()}
                className="h-12 px-4 border-2 border-slate-300 dark:border-slate-600 hover:border-purple-500 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200"
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                {formData.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      aria-label={`Remove tag ${tag}`}
                      disabled={isUploading}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Add tags to help other educators discover your resource
            </p>
          </div>

          {/* Pricing */}
          <div className="space-y-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl border border-amber-200 dark:border-amber-800/30">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="isPremium"
                checked={formData.isPremium}
                onChange={(e) => setFormData(prev => ({ ...prev, isPremium: e.target.checked }))}
                disabled={isUploading}
                className="mt-1 h-4 w-4 text-yellow-600 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-yellow-500 transition-colors"
                aria-label="Make this a premium resource"
              />
              <div className="flex-1">
                <Label htmlFor="isPremium" className="text-base font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  Make this a premium resource
                </Label>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Premium resources generate revenue and are featured prominently in search results
                </p>
              </div>
            </div>
            
            {formData.isPremium && (
              <div className="space-y-3 pl-7">
                <Label htmlFor="price" className="text-base font-semibold text-amber-900 dark:text-amber-100">
                  Price (€) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0.99"
                  max="99.99"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="9.99"
                  required={formData.isPremium}
                  disabled={isUploading}
                  className="h-12 w-32 border-2 border-amber-200 dark:border-amber-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800/50 rounded-lg bg-white dark:bg-slate-800 transition-all duration-200"
                />
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Recommended range: €2.99 - €19.99 for templates and resources
                </p>
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <Label htmlFor="file" className="text-base font-semibold text-slate-900 dark:text-white">
              Resource File
            </Label>
            <div className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
              formData.file 
                ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20' 
                : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/20'
            }`}>
              <div className="space-y-4">
                {formData.file ? (
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                ) : (
                  <FileText className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto" />
                )}
                
                {formData.file ? (
                  <div>
                    <p className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                      File Selected Successfully
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                      {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(1)} MB)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                      className="text-slate-600 hover:text-slate-800"
                      disabled={isUploading}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Drag and drop your file here
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                      Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file')?.click()}
                      disabled={isUploading}
                      className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-950/30"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
                
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-2xl border-2 border-blue-100 dark:border-blue-800/30 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  Upload Guidelines
                </h4>
                <div className="grid gap-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Original Content:</strong> Ensure your resource is original or properly attributed to avoid copyright issues
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Clear Instructions:</strong> Include detailed usage instructions so other educators can easily implement your resource
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Appropriate Tagging:</strong> Use relevant tags to help other teachers discover your resource easily
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Premium Quality:</strong> Premium resources should offer exceptional value and comprehensive content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 pt-4 md:pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isUploading}
              className="h-12 px-6 text-base border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isUploading || !formData.title || !formData.description || !formData.category || !formData.type}
              className="h-12 px-8 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resource
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
