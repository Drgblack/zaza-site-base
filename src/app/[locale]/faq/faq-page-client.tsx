'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowUp, 
  MessageCircle, 
  Zap, 
  ExternalLink, 
  Copy, 
  Check,
  HelpCircle,
  Clock,
  Shield
} from 'lucide-react';
import { faqData, faqCategories, searchFAQs, getFAQsByCategory, getCategoryById } from '@/data/faq';
import type { FAQItem } from '@/data/faq';

export default function FAQPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [filteredFAQs, setFilteredFAQs] = useState<FAQItem[]>(faqData);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle search and filtering
  const updateFilteredFAQs = useCallback(() => {
    let faqs = faqData;
    
    if (selectedCategory !== 'all') {
      faqs = getFAQsByCategory(selectedCategory);
    }
    
    if (searchQuery.trim()) {
      faqs = searchFAQs(searchQuery).filter(faq => 
        selectedCategory === 'all' || faq.category === selectedCategory
      );
    }
    
    setFilteredFAQs(faqs);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    updateFilteredFAQs();
  }, [updateFilteredFAQs]);

  // Handle URL hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setOpenItems(prev => new Set([...prev, id]));
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Analytics tracking
    if (value.trim()) {
      // Track search query
      const searchEvent = new CustomEvent('analytics', {
        detail: { 
          event: 'faq_search',
          query: value.trim(),
          results_count: searchFAQs(value).length
        }
      });
      window.dispatchEvent(searchEvent);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Analytics tracking
    const categoryEvent = new CustomEvent('analytics', {
      detail: { 
        event: 'faq_category_select',
        category: categoryId
      }
    });
    window.dispatchEvent(categoryEvent);
  };

  // Toggle FAQ item open/closed
  const toggleFAQItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (openItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
      
      // Analytics tracking
      const expandEvent = new CustomEvent('analytics', {
        detail: { 
          event: 'faq_open',
          question_id: id
        }
      });
      window.dispatchEvent(expandEvent);
    }
    setOpenItems(newOpenItems);
    
    // Update URL hash
    if (newOpenItems.has(id)) {
      window.history.replaceState(null, '', `#${id}`);
    } else if (window.location.hash === `#${id}`) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQItem(id);
    } else if (e.key === 'Escape') {
      const newOpenItems = new Set(openItems);
      newOpenItems.delete(id);
      setOpenItems(newOpenItems);
    }
  };

  // Copy link to clipboard
  const copyLink = async (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      
      // Analytics tracking
      const copyEvent = new CustomEvent('analytics', {
        detail: { 
          event: 'faq_copy_link',
          question_id: id
        }
      });
      window.dispatchEvent(copyEvent);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus search input for accessibility
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const iconMap = {
      'getting-started': Clock,
      'writing-features': MessageCircle,
      'classroom-pedagogy': HelpCircle,
      'accounts-billing': Zap,
      'privacy-safety': Shield,
      'technical-integrations': ExternalLink
    };
    return iconMap[categoryId as keyof typeof iconMap] || HelpCircle;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950/20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.04),transparent_60%)]" />
        
        <div className="max-w-4xl mx-auto px-4 relative text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Quick answers for busy teachers
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
            Get quick answers about Zaza Promptly. Find what you need to start writing better parent messages in minutes.
          </p>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search questions and answers..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-4 text-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                data-analytics="faq-search"
                aria-label="Search FAQ questions and answers"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 ring-2 ring-purple-500/20'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/20 border border-slate-200 dark:border-slate-700'
              }`}
              aria-pressed={selectedCategory === 'all'}
            >
              All Questions ({faqData.length})
            </button>
            
            {faqCategories.map(category => {
              const IconComponent = getCategoryIcon(category.id);
              const count = getFAQsByCategory(category.id).length;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 ring-2 ring-purple-500/20'
                      : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/20 border border-slate-200 dark:border-slate-700'
                  }`}
                  aria-pressed={selectedCategory === category.id}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          {filteredFAQs.length === 0 ? (
            <Card className="p-12 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No questions found
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Try adjusting your search or selecting a different category.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Clear filters
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => {
                const isOpen = openItems.has(faq.id);
                const categoryInfo = getCategoryById(faq.category);
                
                return (
                  <Card
                    key={faq.id}
                    id={faq.id}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-6 cursor-pointer group"
                      onClick={() => toggleFAQItem(faq.id)}
                      onKeyDown={(e) => handleKeyDown(e, faq.id)}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-content-${faq.id}`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-3 mb-2">
                          {categoryInfo && (
                            <Badge 
                              variant="outline" 
                              className="text-xs bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300"
                            >
                              {categoryInfo.name}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyLink(faq.id);
                          }}
                          className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          aria-label={`Copy link to ${faq.question}`}
                          title="Copy link to this question"
                        >
                          {copiedId === faq.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <ExternalLink className="w-4 h-4" />
                          )}
                        </button>
                        
                        <div className="p-2 rounded-lg group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {isOpen && (
                      <CardContent 
                        id={`faq-content-${faq.id}`}
                        className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700"
                        role="region"
                        aria-labelledby={`faq-question-${faq.id}`}
                      >
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {faq.answer.split(/(\/)/).map((part, i) => {
                              if (part.startsWith('/') && part.length > 1) {
                                const link = part === '/' ? '/' : part;
                                return (
                                  <a
                                    key={i}
                                    href={link}
                                    className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium underline decoration-purple-300 hover:decoration-purple-500 transition-colors"
                                  >
                                    {link}
                                  </a>
                                );
                              }
                              return part;
                            })}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Didn't Find Your Answer CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Didn't find your answer?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Our support team is here to help. Or try Promptly free to see how it works for your classroom communication needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a href="/support">
                  Contact Support
                </a>
              </Button>
              
              <Button 
                variant="outline"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                asChild
              >
                <a href="/#snippet-tool">
                  Try Promptly Free
                </a>
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Write caring, parent-ready messages in minutes • Free to start • No contracts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}