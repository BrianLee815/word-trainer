import React, { useState, useEffect } from 'react';

function WordStudy() {
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [showMeaning, setShowMeaning] = useState(false);

  // 🔗 여기에 본인의 GitHub raw 링크를 넣어주세요!
  const wordListUrl = 'https://raw.githubusercontent.com/BrianLee815/word-trainer/main/wordList.json';

  useEffect(() => {
    fetch(wordListUrl)
      .then(response => response.json())
      .then(data => {
        setWordList(data);
        setCurrentWord(data[0]); // 첫 단어 표시 (또는 랜덤도 가능)
      })
      .catch(error => console.error('단어 불러오기 실패:', error));
  }, []);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[randomIndex]);
    setShowMeaning(false);
  };

  return (
    <div>
      <h1>📚 단어 공부</h1>
      {currentWord ? (
        <div>
          <h2>{currentWord.word}</h2>
          {showMeaning && <p>{currentWord.meaning}</p>}
          <button onClick={() => setShowMeaning(true)}>뜻 보기</button>
        </div>
      ) : (
        <p>단어 로딩 중...</p>
      )}
      <button onClick={getRandomWord}>다음 단어</button>
    </div>
  );
}

export default WordStudy;


