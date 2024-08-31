export default function generateQuizId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 7);
  return `quiz-${timestamp}-${randomPart}`;
}
