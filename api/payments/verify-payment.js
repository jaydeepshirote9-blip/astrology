import { Cashfree } from 'cashfree-pg';
import crypto from 'crypto';

// Initialize Cashfree with environment variables
const initializeCashfree = () => {
  Cashfree.XClientId = process.env.CASHFREE_APP_ID;
  Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
  Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === 'live' 
    ? Cashfree.Environment.PRODUCTION 
    : Cashfree.Environment.SANDBOX;
};

// CORS headers
const getCorsOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'https://astrology-website.vercel.app';
  }
  return 'http://localhost:3001';
};

const corsHeaders = {
  'Access-Control-Allow-Origin': getCorsOrigin(),
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Initialize Cashfree
    initializeCashfree();

    const { order_id } = req.query;

    if (!order_id) {
      res.status(400).json({ error: 'Order ID is required' });
      return;
    }

    console.log('Verifying payment for order:', order_id);

    // Get order details from Cashfree
    const response = await Cashfree.PGOrderFetchPayments('2023-08-01', order_id);
    
    if (response.data && response.data.length > 0) {
      const payment = response.data[0]; // Get the latest payment
      
      // Also fetch order details for complete information
      const orderResponse = await Cashfree.PGOrderFetchOrder('2023-08-01', order_id);
      
      res.status(200).setHeader('Content-Type', 'application/json');
      Object.keys(corsHeaders).forEach(key => {
        res.setHeader(key, corsHeaders[key]);
      });
      
      res.json({
        success: true,
        order_id: order_id,
        payment_status: payment.payment_status,
        payment_amount: payment.payment_amount,
        payment_currency: payment.payment_currency,
        payment_method: payment.payment_method,
        payment_time: payment.payment_time,
        cf_payment_id: payment.cf_payment_id,
        order_status: orderResponse.data?.order_status,
        order_amount: orderResponse.data?.order_amount,
      });
    } else {
      res.status(404).json({ 
        error: 'Payment not found',
        order_id: order_id
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}