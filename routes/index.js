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
    author: 'Raghav Singla',
    github: 'https://github.com/RaghavOG',
    linkedin: 'https://www.linkedin.com/in/singlaraghav/',
    official_email: config.officialEmail,
  });
});

router.post('/bfhl', async (req, res) => {
  try {
    const body = req.body;

    // Check if exactly one key is present
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

    // Handle fibonacci
    if (key === 'fibonacci') {
      if (typeof value !== 'number' || value < 0 || !Number.isInteger(value)) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'Fibonacci input must be a non-negative integer',
        });
      }

      const result = mathUtils.fibonacci(value);
      return res.status(200).json({
        is_success: true,
        official_email: config.officialEmail,
        data: result,
      });
    }

    // Handle prime
    if (key === 'prime') {
      if (!Array.isArray(value)) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'Prime input must be an array',
        });
      }

      const primes = value.filter((num) => mathUtils.isPrime(num));
      return res.status(200).json({
        is_success: true,
        official_email: config.officialEmail,
        data: primes,
      });
    }

    // Handle lcm
    if (key === 'lcm') {
      if (!Array.isArray(value) || value.length === 0) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'LCM input must be a non-empty array',
        });
      }

      const result = mathUtils.lcmOfArray(value);
      return res.status(200).json({
        is_success: true,
        official_email: config.officialEmail,
        data: result,
      });
    }

    // Handle hcf
    if (key === 'hcf') {
      if (!Array.isArray(value) || value.length === 0) {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'HCF input must be a non-empty array',
        });
      }

      const result = mathUtils.hcfOfArray(value);
      return res.status(200).json({
        is_success: true,
        official_email: config.officialEmail,
        data: result,
      });
    }

    // Handle AI
    if (key === 'AI') {
      if (typeof value !== 'string' || value.trim() === '') {
        return res.status(400).json({
          is_success: false,
          official_email: config.officialEmail,
          error: 'AI input must be a non-empty string',
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