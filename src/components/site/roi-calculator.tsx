'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Calculator, Clock, DollarSign, TrendingUp } from 'lucide-react';

export function ROICalculator() {
  const [classSize, setClassSize] = useState([25]);
  const [messagesPerWeek, setMessagesPerWeek] = useState([8]);
  const [hourlyRate, setHourlyRate] = useState([35]);
  
  // Calculate savings
  const weeklyTimeSaved = messagesPerWeek[0] * 14; // 14 minutes average per message
  const monthlyTimeSaved = weeklyTimeSaved * 4;
  const yearlyTimeSaved = monthlyTimeSaved * 9; // 9 months school year
  
  const weeklyMoneySaved = (weeklyTimeSaved / 60) * hourlyRate[0];
  const monthlyMoneySaved = weeklyMoneySaved * 4;
  const yearlyMoneySaved = monthlyMoneySaved * 9;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-700/50 shadow-xl">
      <CardHeader className="text-center pb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">
          Your Time & Money Savings
        </CardTitle>
        <p className="text-green-700 dark:text-green-300">
          See how much Promptly saves you based on your class size and communication needs
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <div className="space-y-3 pb-6 border-b border-green-200 dark:border-green-700">
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span>Students in your class: {classSize[0]}</span>
            </label>
            <Slider
              value={classSize}
              onValueChange={setClassSize}
              max={35}
              min={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>10 students</span>
              <span>35 students</span>
            </div>
          </div>

          <div className="space-y-3 pb-6 border-b border-green-200 dark:border-green-700">
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Parent messages per week: {messagesPerWeek[0]}
            </label>
            <Slider
              value={messagesPerWeek}
              onValueChange={setMessagesPerWeek}
              max={20}
              min={3}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>3 messages</span>
              <span>20 messages</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Your time value: ${hourlyRate[0]}/hour
            </label>
            <Slider
              value={hourlyRate}
              onValueChange={setHourlyRate}
              max={75}
              min={25}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>$25/hour</span>
              <span>$75/hour</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 space-y-4">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
            Your Promptly Savings
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{Math.round(weeklyTimeSaved)}min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">saved per week</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">${Math.round(monthlyMoneySaved)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">saved per month</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{Math.round(yearlyTimeSaved/60)}hrs</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">saved per year</div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-black text-green-600 dark:text-green-400">
              ${Math.round(yearlyMoneySaved)} saved annually
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              That's {Math.round(yearlyMoneySaved/99)}x the cost of Pro Teacher plan!
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
              <strong>Scenario:</strong> No more Sunday night email panic! 
              Write {messagesPerWeek[0]} parent messages in {Math.round(messagesPerWeek[0] * 0.5)} minutes instead of {Math.round(messagesPerWeek[0] * 15)} minutes.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}