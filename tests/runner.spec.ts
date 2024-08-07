import { test, expect } from '@playwright/test';
import AIEngine from './ai-engine/ai-engine';

test('ai engine spec generator', async ({ page }) => {

  let ai_engine = new AIEngine();

  if (process.env.FILE == "" && process.env.FILE == undefined && process.env.FILE == null) {
    console.log("Please provide the file name as environment variable FILE, for example FILE='sample.csv'")
    test.fail();
  }

  if (process.env.TEST?.toLocaleLowerCase() == "api") {
    await ai_engine.api_spec_creator();
  } else if (process.env.TEST?.toLocaleLowerCase() == "web") {
    await ai_engine.web_spec_creator();
  } else {
    console.log('Please provide the test type either api or web as environment variable TEST, for example TEST=web')
    test.fail();
  }

});


