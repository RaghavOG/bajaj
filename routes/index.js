import express from 'express';
import { Router } from 'express';
import config from '../config/index.js';
import mathUtils from '../utils/mathsUtils.js';
import getAIAnswer from '../utils/aiAnswer.js';




const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the BFHL API',
    description: 'This is a REST API for the BFHL assignment',
  
    official_email: config.officialEmail,
  });
});

router.post('/bfhl', async (req, res) => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        is_success: false,
        official_email: config.officialEmail,
        error: 'Request body is required',
      });
    }

    const keys = Object.keys(body);
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: config.officialEmail,
        error: 'Request must contain exactly one key',
      });
    }

    const key = keys[0];
    const value = body[key];

    if (key === 'fibonacci') {
      if (typeof value !== 'number' || !Number.isInteger(value)) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'Fibonacci input must be an integer',
        });
      }

      if (value < 0) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'Fibonacci input must be non-negative',
        });
      }

      if (value > 1000) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'Fibonacci input must be <= 1000',
        });
      }

      const result = mathUtils.fibonacci(value);
      return res.status(200).json({
        is_success: true,
        official_email: config.officialEmail,
        data: result,
      });
    }

    if (key === 'prime') {
      if (!Array.isArray(value)) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'Prime input must be an array',
        });
      }

      if (value.length === 0) {
        return res.status(200).json({
          is_success: true,
          official_email: config.officialEmail,
          data: [],
        });
      }

      if (value.length > 10000) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'Array size must be <= 10000',
        });
      }

      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] !== 'number' || !Number.isInteger(value[i])) {
          return res.status(400).json({
            is_success: false,
            official_email: config.officialEmail,
            error: 'All array elements must be integers',
          });
        }
      }

      const primes = value.filter((num) => mathUtils.isPrime(num));
      return res.status(200).json({
        is_success: true,
        official_email: config.officialEmail,
        data: primes,
      });
    }

    if (key === 'lcm') {
      if (!Array.isArray(value)) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'LCM input must be an array',
        });
      }

      if (value.length === 0) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'LCM array cannot be empty',
        });
      }

      if (value.length > 10000) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'Array size must be <= 10000',
        });
      }

      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] !== 'number' || !Number.isInteger(value[i])) {
          return res.status(400).json({
            is_success: false,
            official_email: config.officialEmail,
            error: 'All array elements must be integers',
          });
        }
        if (value[i] <= 0) {
          return res.status(400).json({
            is_success: false,
            official_email: config.officialEmail,
            error: 'LCM requires positive integers only',
          });
        }
      }

      const result = mathUtils.lcmOfArray(value);
      return res.status(200).json({
        is_success: true,
        official_email: config.officialEmail,
        data: result,
      });
    }

    if (key === 'hcf') {
      if (!Array.isArray(value)) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'HCF input must be an array',
        });
      }

      if (value.length === 0) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'HCF array cannot be empty',
        });
      }

      if (value.length > 10000) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'Array size must be <= 10000',
        });
      }

      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] !== 'number' || !Number.isInteger(value[i])) {
          return res.status(400).json({
            is_success: false,
            official_email: config.officialEmail,
            error: 'All array elements must be integers',
          });
        }
        if (value[i] <= 0) {
          return res.status(400).json({
            is_success: false,
            official_email: config.officialEmail,
            error: 'HCF requires positive integers only',
          });
        }
      }

      const result = mathUtils.hcfOfArray(value);
      return res.status(200).json({
        is_success: true,
        official_email: config.officialEmail,
        data: result,
      });
    }

    if (key === 'AI') {
      if (typeof value !== 'string') {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'AI input must be a string',
        });
      }

      if (value.trim() === '') {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'AI input cannot be empty',
        });
      }

      if (value.length > 1000) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'AI input must be <= 1000 characters',
        });
      }

      const answer = await getAIAnswer(value);
      return res.status(200).json({
        is_success: true,
        official_email: config.officialEmail,
        data: answer,
      });
    }

    // Invalid key
    return res.status(400).json({
      is_success: false,
      official_email: config.officialEmail,
      error: 'Invalid key. Must be one of: fibonacci, prime, lcm, hcf, AI',
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      is_success: false,
      official_email: config.officialEmail,
      error: 'Internal server error',
    });
  }
});

export default router;