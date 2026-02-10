import openai from '../services/openai.js';

async function getAIAnswer(question) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant. Give short and concise answers.',
        },
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 50,
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    throw new Error('AI service error');
  }
}

export default getAIAnswer;
