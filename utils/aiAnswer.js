import openai from '../services/openai.js';

async function getAIAnswer(question) {
  try {
    
    const sanitizedQuestion = question.trim();
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant. Give short and concise answers in one or two sentences maximum.',
        },
        {
          role: 'user',
          content: sanitizedQuestion,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const answer = completion.choices[0]?.message?.content?.trim();
    
    if (!answer) {
      throw new Error('No response from AI');
    }
    
    return answer;
  } catch (error) {
    console.error('AI Error:', error.message);
    
    
    if (error.code === 'insufficient_quota') {
      throw new Error('AI service quota exceeded');
    }
    if (error.code === 'invalid_api_key') {
      throw new Error('AI service configuration error');
    }
    
    throw new Error('AI service temporarily unavailable');
  }
}

export default getAIAnswer;
