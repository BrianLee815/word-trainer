import React, { useState, useEffect } from 'react';

function WordQuiz() {
  const [wordList, setWordList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const wordListUrl = 'https://raw.githubusercontent.com/BrianLee815/word-trainer/main/wordList.json';

  useEffect(() => {
    fetch(wordListUrl)
      .then(res => res.json())
      .then(data => setWordList(data))
      .catch(err => console.error('퀴즈 단어 불러오기 실패:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wordList.length) return;

    const correctAnswer = wordList[currentIndex].word.toLowerCase().trim();
    const userInput = userAnswer.toLowerCase().trim();

    if (userInput === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wordList.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-8">📝 단어 퀴즈</h1>
      {wordList.length > 0 ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <p className="text-lg mb-6">
            <strong>뜻:</strong> {wordList[currentIndex].meaning}
          </p>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              placeholder="영어 단어 입력"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition w-full"
            >
              제출
            </button>
          </form>

          {isCorrect === true && (
            <p className="text-green-600 font-semibold mb-4">정답입니다! 🎉</p>
          )}
          {isCorrect === false && (
            <p className="text-red-500 font-semibold mb-4">
              오답입니다. 정답: {wordList[currentIndex].word}
            </p>
          )}

          {isCorrect !== null && (
            <button
              onClick={handleNext}
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition w-full"
            >
              다음 문제
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">퀴즈 단어를 불러오는 중...</p>
      )}
    </div>
  );
}

export default WordQuiz;



