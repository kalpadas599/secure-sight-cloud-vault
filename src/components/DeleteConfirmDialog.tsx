
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock } from 'lucide-react';

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  date: string;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  date
}) => {
  const [pin, setPin] = useState('');
  const [step, setStep] = useState<'warning' | 'pin'>('warning');
  const correctPin = '1234'; // In real app, this would be user-specific

  const handleContinue = () => {
    setStep('pin');
  };

  const handleConfirm = () => {
    if (pin === correctPin) {
      onConfirm();
      setPin('');
      setStep('warning');
    } else {
      alert('Incorrect PIN. Please try again.');
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setPin('');
    setStep('warning');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-500" />
            <span>Secure Delete Confirmation</span>
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {step === 'warning' 
              ? 'This action will permanently delete footage and cannot be undone.'
              : 'Enter your 4-digit PIN to confirm deletion.'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'warning' ? (
          <div className="space-y-4">
            <Alert className="border-red-600 bg-red-900/20">
              <Lock className="w-4 h-4" />
              <AlertDescription className="text-red-200">
                You are about to delete all footage from <strong>{date}</strong>. 
                This action is irreversible and will permanently remove the recordings from cloud storage.
              </AlertDescription>
            </Alert>
            
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">What will be deleted:</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• All camera recordings from {date}</li>
                <li>• Motion detection events</li>
                <li>• Associated metadata</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin" className="text-slate-200">Security PIN</Label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white text-center text-lg tracking-widest"
                placeholder="••••"
                maxLength={4}
                autoFocus
              />
            </div>
            <p className="text-xs text-slate-400 text-center">
              Demo PIN: 1234
            </p>
          </div>
        )}

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="border-slate-600 text-slate-300"
          >
            Cancel
          </Button>
          {step === 'warning' ? (
            <Button 
              onClick={handleContinue}
              className="bg-red-600 hover:bg-red-700"
            >
              Continue to PIN
            </Button>
          ) : (
            <Button 
              onClick={handleConfirm}
              disabled={pin.length !== 4}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirm Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
