import { supabase } from '../lib/supabase'

export interface PaymentRequest {
  amount: number
  userId?: string
}

export const processPayment = async (request: PaymentRequest) => {
  try {
    // Simulate IntaSend test payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const txnId = `TEST-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const status = Math.random() > 0.1 ? 'SUCCESS' : 'FAILED' // 90% success rate for demo
    
    // Save transaction to database
    if (request.userId) {
      const { error } = await supabase
        .from('transactions')
        .insert([
          {
            amount: request.amount,
            txn_id: txnId,
            status,
            user_id: request.userId,
          }
        ])

      if (error) {
        console.error('Error saving transaction:', error)
      }
    }

    return {
      success: status === 'SUCCESS',
      txnId,
      status,
      message: status === 'SUCCESS' 
        ? 'Payment processed successfully! Thank you for supporting Zero Hunger.' 
        : 'Payment failed. Please try again.'
    }
  } catch (error) {
    console.error('Payment processing error:', error)
    return {
      success: false,
      txnId: null,
      status: 'ERROR',
      message: 'Payment processing failed. Please try again.'
    }
  }
}