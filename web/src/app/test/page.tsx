'use client';
import { res } from './res';

function splitSections(inputString: string) {
  const llmResponseMarker = '__LLM_RESPONSE__';
  const relatedQuestionsMarker = '__RELATED_QUESTIONS__';

  const llmResponseIndex = inputString.indexOf(llmResponseMarker);
  const relatedQuestionsIndex = inputString.indexOf(relatedQuestionsMarker);

  if (llmResponseIndex === -1 || relatedQuestionsIndex === -1) {
    throw new Error('Markers not found in the input string.');
  }

  const beforeLlmResponse = inputString.substring(0, llmResponseIndex).trim();
  const betweenLlmResponseAndRelatedQuestions = inputString
    .substring(
      llmResponseIndex + llmResponseMarker.length,
      relatedQuestionsIndex
    )
    .trim();
  const afterRelatedQuestions = inputString
    .substring(relatedQuestionsIndex + relatedQuestionsMarker.length)
    .trim();

  return {
    resources: beforeLlmResponse,
    summary: betweenLlmResponseAndRelatedQuestions,
    related: afterRelatedQuestions,
  };
}

function Page() {
  const output = splitSections(res);
  console.log(output);
  return <div>Test page</div>;
}

export default Page;
