import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Heart, Loader2 } from 'lucide-react';
import { processPayment } from '../services/paymentService';
import { useAuth } from '../hooks/useAuth';

interface PaymentModalProps {
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setMessage('');

    try {
      const result = await processPayment({
        amount,
        userId: user?.id,
      });

      setMessage(result.message);
      setSuccess(result.success);

      if (result.success) {
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      setMessage('Payment processing failed. Please try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Support Zero Hunger
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Help us support <strong>SDG 2: Zero Hunger</strong> by contributing to food security initiatives worldwide.
          </p>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <p className="text-orange-800 text-sm">
              🌱 Your contribution helps provide meals and cooking education to communities in need.
            </p>
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            success
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contribution Amount (USD)
            </label>
            <div className="flex gap-2 mb-3">
              {[5, 10, 25, 50].map(preset => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    amount === preset
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="1"
              max="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={loading || success}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Payment...
              </>
            ) : success ? (
              <>
                <Heart className="w-5 h-5" />
                Thank You!
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Donate ${amount}
              </>
            )}
          </motion.button>

          <p className="text-xs text-gray-500 text-center">
            This is a test payment system. No real charges will be made.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;