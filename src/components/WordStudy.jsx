import React, { useState, useEffect } from 'react';

function WordStudy() {
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [showMeaning, setShowMeaning] = useState(false);

  const wordListUrl = 'https://raw.githubusercontent.com/BrianLee815/word-trainer/main/wordList.json';

  useEffect(() => {
    fetch(wordListUrl)
      .then(response => response.json())
      .then(data => {
        setWordList(data);
        setCurrentWord(data[0]);
      })
      .catch(error => console.error('단어 불러오기 실패:', error));
  }, []);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[randomIndex]);
    setShowMeaning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">📚 단어 공부</h1>
      {currentWord ? (
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">{currentWord.word}</h2>
          {showMeaning ? (
            <p className="text-lg text-gray-700 mb-6">{currentWord.meaning}</p>
          ) : (
            <button
              onClick={() => setShowMeaning(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition mb-6"
            >
              뜻 보기
            </button>
          )}
          <button
            onClick={getRandomWord}
            className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            다음 단어
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">단어 로딩 중...</p>
      )}
    </div>
  );
}

export default WordStudy;



