'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Eye,
  EyeOff,
  Lightbulb,
  Settings,
  Lock,
  Unlock,
  Scan,
  FileText,
  Zap,
  Target,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { aiServices, SafetyFilterResult } from '@/lib/ai-services';

interface AISafetyLayerProps {
  content?: string;
  onContentProcessed?: (result: { approved: boolean; content: string; reasons?: string[] }) => void;
  mode?: 'scan' | 'protect' | 'monitor';
}

interface SafetyMetrics {
  totalScans: number;
  approvedContent: number;
  blockedContent: number;
  neutralizedContent: number;
  confidenceAverage: number;
}

interface SafetyAlert {
  id: string;
  content: string;
  severity: 'high' | 'medium' | 'low';
  reason: string;
  timestamp: string;
  resolved: boolean;
}

export function AdaptiveAISafetyLayer({ content = '', onContentProcessed, mode = 'scan' }: AISafetyLayerProps) {
  const [inputContent, setInputContent] = useState(content);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<SafetyFilterResult | null>(null);
  const [processedContent, setProcessedContent] = useState<string>('');
  const [safetyMetrics, setSafetyMetrics] = useState<SafetyMetrics>({
    totalScans: 0,
    approvedContent: 0,
    blockedContent: 0,
    neutralizedContent: 0,
    confidenceAverage: 0
  });
  const [safetyAlerts, setSafetyAlerts] = useState<SafetyAlert[]>([]);
  const [showProcessedContent, setShowProcessedContent] = useState(false);
  const [autoProtectionEnabled, setAutoProtectionEnabled] = useState(true);

  useEffect(() => {
    loadSafetyMetrics();
    loadSafetyAlerts();
  }, []);

  useEffect(() => {
    if (content && content !== inputContent) {
      setInputContent(content);
    }
  }, [content]);

  const loadSafetyMetrics = () => {
    const savedMetrics = localStorage.getItem('ai-safety-metrics');
    if (savedMetrics) {
      setSafetyMetrics(JSON.parse(savedMetrics));
    }
  };

  const loadSafetyAlerts = () => {
    const savedAlerts = localStorage.getItem('ai-safety-alerts');
    if (savedAlerts) {
      setSafetyAlerts(JSON.parse(savedAlerts));
    }
  };

  const updateSafetyMetrics = (result: SafetyFilterResult) => {
    setSafetyMetrics(prev => {
      const newMetrics = {
        totalScans: prev.totalScans + 1,
        approvedContent: prev.approvedContent + (result.isApproved ? 1 : 0),
        blockedContent: prev.blockedContent + (!result.isApproved && result.reasons && result.reasons.length > 0 ? 1 : 0),
        neutralizedContent: prev.neutralizedContent + (!result.isApproved ? 1 : 0),
        confidenceAverage: ((prev.confidenceAverage * prev.totalScans) + result.confidence) / (prev.totalScans + 1)
      };
      
      localStorage.setItem('ai-safety-metrics', JSON.stringify(newMetrics));
      return newMetrics;
    });
  };

  const addSafetyAlert = (content: string, reasons: string[]) => {
    if (reasons.length === 0) return;

    const newAlert: SafetyAlert = {
      id: Date.now().toString(),
      content: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
      severity: determineSeverity(reasons),
      reason: reasons[0],
      timestamp: new Date().toISOString(),
      resolved: false
    };

    setSafetyAlerts(prev => {
      const updated = [newAlert, ...prev.slice(0, 19)]; // Keep last 20
      localStorage.setItem('ai-safety-alerts', JSON.stringify(updated));
      return updated;
    });
  };

  const determineSeverity = (reasons: string[]): 'high' | 'medium' | 'low' => {
    const highRiskPatterns = ['personal information', 'inappropriate', 'boundary'];
    const mediumRiskPatterns = ['unprofessional', 'unclear'];
    
    for (const reason of reasons) {
      const lowerReason = reason.toLowerCase();
      if (highRiskPatterns.some(pattern => lowerReason.includes(pattern))) {
        return 'high';
      } else if (mediumRiskPatterns.some(pattern => lowerReason.includes(pattern))) {
        return 'medium';
      }
    }
    return 'low';
  };

  const scanContent = async () => {
    if (!inputContent.trim()) return;

    setIsScanning(true);
    setScanProgress(0);

    try {
      // Simulate progressive scanning
      setScanProgress(25);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setScanProgress(50);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setScanProgress(75);
      const result = await aiServices.safety.scanContent(inputContent);
      
      setScanProgress(100);
      setScanResult(result);
      updateSafetyMetrics(result);

      if (!result.isApproved) {
        addSafetyAlert(inputContent, result.reasons || []);
      }

      // Auto-neutralize if protection is enabled and content needs it
      if (autoProtectionEnabled && !result.isApproved) {
        const neutralized = await aiServices.safety.neutralizeSensitiveContent(inputContent);
        setProcessedContent(neutralized);
        setShowProcessedContent(true);
        
        if (onContentProcessed) {
          onContentProcessed({
            approved: false,
            content: neutralized,
            reasons: result.reasons
          });
        }
      } else if (onContentProcessed) {
        onContentProcessed({
          approved: result.isApproved,
          content: inputContent,
          reasons: result.reasons
        });
      }

    } catch (error) {
      console.error('Safety scan error:', error);
      setScanResult({
        isApproved: false,
        confidence: 0,
        reasons: ['Safety scan failed - content blocked for review']
      });
    } finally {
      setIsScanning(false);
      setTimeout(() => setScanProgress(0), 2000);
    }
  };

  const neutralizeContent = async () => {
    if (!inputContent.trim()) return;

    try {
      const neutralized = await aiServices.safety.neutralizeSensitiveContent(inputContent);
      setProcessedContent(neutralized);
      setShowProcessedContent(true);
      
      if (onContentProcessed) {
        onContentProcessed({
          approved: true,
          content: neutralized
        });
      }
    } catch (error) {
      console.error('Content neutralization error:', error);
    }
  };

  const resolveAlert = (alertId: string) => {
    setSafetyAlerts(prev => {
      const updated = prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      );
      localStorage.setItem('ai-safety-alerts', JSON.stringify(updated));
      return updated;
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const unresolvedAlerts = safetyAlerts.filter(alert => !alert.resolved);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-600" />
              <div>
                <CardTitle className="text-xl">Adaptive AI Safety Layer</CardTitle>
                <CardDescription>
                  Real-time content scanning and neutralization for educational safety
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Lock className="h-3 w-3 mr-1" />
                Protected
              </Badge>
              {unresolvedAlerts.length > 0 && (
                <Badge className="bg-red-100 text-red-800">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {unresolvedAlerts.length} Alert{unresolvedAlerts.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{safetyMetrics.totalScans}</div>
              <div className="text-sm text-gray-600">Total Scans</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{safetyMetrics.approvedContent}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{safetyMetrics.neutralizedContent}</div>
              <div className="text-sm text-gray-600">Neutralized</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${getConfidenceColor(safetyMetrics.confidenceAverage)}`}>
                {(safetyMetrics.confidenceAverage * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Avg Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <Scan className="h-5 w-5 text-blue-600 animate-pulse" />
              <span className="font-medium">Scanning content for safety...</span>
            </div>
            <Progress value={scanProgress} className="w-full" />
            <div className="text-sm text-gray-600 mt-2">
              {scanProgress < 30 && 'Analyzing content structure...'}
              {scanProgress >= 30 && scanProgress < 60 && 'Detecting sensitive information...'}
              {scanProgress >= 60 && scanProgress < 90 && 'Checking professional boundaries...'}
              {scanProgress >= 90 && 'Calculating safety score...'}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Interface */}
      <Tabs defaultValue="scanner" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scanner">Content Scanner</TabsTrigger>
          <TabsTrigger value="alerts">
            Safety Alerts
            {unresolvedAlerts.length > 0 && (
              <Badge className="ml-1 bg-red-500 text-white text-xs">
                {unresolvedAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="metrics">Safety Metrics</TabsTrigger>
          <TabsTrigger value="settings">Protection Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="scanner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Content Safety Scanner
              </CardTitle>
              <CardDescription>
                Analyze educational content for privacy, appropriateness, and professional boundaries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Content to Scan</label>
                <Textarea
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  placeholder="Paste your educational content here to scan for potential safety issues..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={scanContent}
                  disabled={!inputContent.trim() || isScanning}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {isScanning ? 'Scanning...' : 'Scan Content'}
                </Button>
                
                <Button
                  onClick={neutralizeContent}
                  disabled={!inputContent.trim()}
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Neutralize Content
                </Button>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-gray-600">Auto-protect:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAutoProtectionEnabled(!autoProtectionEnabled)}
                    className={autoProtectionEnabled ? 'text-green-600' : 'text-gray-400'}
                  >
                    {autoProtectionEnabled ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scan Results */}
          {scanResult && (
            <Card className={`${scanResult.isApproved ? 'border-green-200' : 'border-red-200'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {scanResult.isApproved ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                    Safety Scan Results
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getConfidenceColor(scanResult.confidence)} bg-gray-100`}>
                      Confidence: {(scanResult.confidence * 100).toFixed(0)}%
                    </Badge>
                    <Badge className={scanResult.isApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {scanResult.isApproved ? 'Approved' : 'Needs Review'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!scanResult.isApproved && scanResult.reasons && (
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Safety Concerns:</h4>
                    <ul className="space-y-1">
                      {scanResult.reasons.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {scanResult.suggestedEdits && scanResult.suggestedEdits.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Suggested Improvements:</h4>
                    <ul className="space-y-1">
                      {scanResult.suggestedEdits.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Lightbulb className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {processedContent && showProcessedContent && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-600">Neutralized Content:</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowProcessedContent(!showProcessedContent)}
                      >
                        {showProcessedContent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {showProcessedContent && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <pre className="text-sm whitespace-pre-wrap">{processedContent}</pre>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {unresolvedAlerts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Safety Alerts</h3>
                <p className="text-gray-600">
                  Your content is being monitored and protected. Any safety concerns will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {unresolvedAlerts.map((alert) => (
                <Card key={alert.id} className={getSeverityColor(alert.severity)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity} priority
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(alert.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <h4 className="font-semibold mb-1">{alert.reason}</h4>
                          <p className="text-sm text-gray-600">{alert.content}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Safety Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Approval Rate</span>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={safetyMetrics.totalScans > 0 ? (safetyMetrics.approvedContent / safetyMetrics.totalScans) * 100 : 0} 
                        className="w-20" 
                      />
                      <span className="text-sm">
                        {safetyMetrics.totalScans > 0 ? 
                          Math.round((safetyMetrics.approvedContent / safetyMetrics.totalScans) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Safety Confidence</span>
                    <div className="flex items-center gap-2">
                      <Progress value={safetyMetrics.confidenceAverage * 100} className="w-20" />
                      <span className={`text-sm ${getConfidenceColor(safetyMetrics.confidenceAverage)}`}>
                        {(safetyMetrics.confidenceAverage * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Protection Effectiveness</span>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={safetyMetrics.totalScans > 0 ? 
                          ((safetyMetrics.approvedContent + safetyMetrics.neutralizedContent) / safetyMetrics.totalScans) * 100 : 0} 
                        className="w-20" 
                      />
                      <span className="text-sm text-green-600">
                        {safetyMetrics.totalScans > 0 ? 
                          Math.round(((safetyMetrics.approvedContent + safetyMetrics.neutralizedContent) / safetyMetrics.totalScans) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Safety Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Content Quality Improving</div>
                      <div className="text-sm text-gray-600">
                        Your content safety scores are trending upward
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Consistent Professional Tone</div>
                      <div className="text-sm text-gray-600">
                        Maintaining educational appropriateness standards
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Educational Focus</div>
                      <div className="text-sm text-gray-600">
                        Content consistently aligned with teaching objectives
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Safety Protection Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Automatic Content Protection</h4>
                  <p className="text-sm text-gray-600">
                    Automatically neutralize sensitive content before displaying
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setAutoProtectionEnabled(!autoProtectionEnabled)}
                  className={autoProtectionEnabled ? 'text-green-600' : 'text-gray-400'}
                >
                  {autoProtectionEnabled ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Safety Features Active:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Personal Information Detection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Professional Boundary Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Educational Appropriateness Checking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real-time Content Neutralization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>FERPA Compliance Monitoring</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}