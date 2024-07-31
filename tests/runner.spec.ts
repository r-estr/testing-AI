import { test, expect } from '@playwright/test';
import AIEngine from './ai-engine/ai-engine';

test('ai engine spec generator', async ({ page }) => {

  let ai_engine = new AIEngine();
  await ai_engine.ai_engine();

});


