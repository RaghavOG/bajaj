import OpenAI from 'openai';
import config from '../config/index.js';

const openai = new OpenAI({
    apiKey: config.openaiApiKey,
});

export default openai;