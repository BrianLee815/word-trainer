import React, { useState, useEffect } from 'react';

function WordQuiz() {
  const [wordList, setWordList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  // ✅ GitHub raw 링크로 JSON 불러오기
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
    <div>
      <h1>📝 단어 퀴즈</h1>
      {wordList.length > 0 ? (
        <div>
          <p><strong>뜻:</strong> {wordList[currentIndex].meaning}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="영어 단어 입력"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button type="submit">제출</button>
          </form>

          {isCorrect === true && <p style={{ color: 'green' }}>정답입니다!</p>}
          {isCorrect === false && (
            <p style={{ color: 'red' }}>
              오답입니다. 정답: {wordList[currentIndex].word}
            </p>
          )}

          {isCorrect !== null && (
            <button onClick={handleNext}>다음 문제</button>
          )}
        </div>
      ) : (
        <p>퀴즈 단어를 불러오는 중...</p>
      )}
    </div>
  );
}

export default WordQuiz;


