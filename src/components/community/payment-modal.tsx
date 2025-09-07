'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Lock,
  CheckCircle,
  AlertCircle,
  Download,
  Star,
  FileText
} from 'lucide-react';
import { ResourceMetadata } from '@/lib/resources';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: ResourceMetadata;
  onPaymentSuccess: (downloadUrl: string) => void;
}

export function PaymentModal({ isOpen, onClose, resource, onPaymentSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    acceptTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      setErrorMessage('Please accept the terms and conditions');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would integrate with Stripe:
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: {
      //       name: formData.name,
      //       email: formData.email,
      //     },
      //   }
      // });

      // Simulate successful payment
      setPaymentStatus('success');
      
      // Trigger download after successful payment
      setTimeout(() => {
        onPaymentSuccess(resource.downloadUrl);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage('Payment failed. Please check your card details and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (paymentStatus === 'success') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-4 bg-white dark:bg-slate-900 rounded-2xl">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Payment Successful!
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Thank you for your purchase. Your download will begin shortly.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Download className="h-4 w-4" />
              Preparing your download...
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 bg-white dark:bg-slate-900 rounded-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Complete Your Purchase
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-300">
            Secure checkout powered by Stripe
          </DialogDescription>
        </DialogHeader>

        {/* Resource Summary */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {resource.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                {resource.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {resource.pageCount} pages
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  {resource.stats.downloads.toLocaleString()} downloads
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {resource.stats.rating} rating
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                €{resource.price}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                One-time purchase
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status Messages */}
        {paymentStatus === 'error' && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-900 dark:text-red-100">Payment Failed</h4>
                <p className="text-sm text-red-700 dark:text-red-200">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-slate-900 dark:text-white">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              required
              disabled={isProcessing}
              className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800/50"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Receipt and download link will be sent to this email
            </p>
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              <Label className="text-sm font-semibold text-slate-900 dark:text-white">
                Payment Method
              </Label>
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Cardholder Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                required
                disabled={isProcessing}
                className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500"
              />
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Card Number *
              </Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
                disabled={isProcessing}
                className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500"
              />
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Expiry Date *
                </Label>
                <Input
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  placeholder="MM/YY"
                  required
                  disabled={isProcessing}
                  className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  CVV *
                </Label>
                <Input
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  placeholder="123"
                  required
                  disabled={isProcessing}
                  className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={formData.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              className="mt-1 h-4 w-4 text-purple-600 bg-white border-slate-300 rounded focus:ring-purple-500"
              disabled={isProcessing}
            />
            <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              I agree to the <a href="/terms" className="text-purple-600 hover:text-purple-700 underline">Terms of Service</a> and understand that this is a one-time purchase for a digital product. All sales are final.
            </label>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-2">
              <Lock className="h-4 w-4" />
              <span className="text-sm font-semibold">Secure Payment</span>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Your payment information is encrypted and secure. We use Stripe for payment processing and never store your card details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 h-12 border-2 border-slate-300 dark:border-slate-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing || !formData.acceptTerms}
              className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pay €{resource.price}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}