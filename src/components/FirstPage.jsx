import { useState, useEffect, useCallback } from 'react';
import './FirstPage.css';

const GREETINGS = [
  'UE',
  'Ciao',
  'Hello',
  'Hallo',
  'Bonjour',
  'Olá',
  'Hola',
  '안녕하세요',
  'こんにちは',
  '你好',
  'مرحبا',
  'नमस्ते',
  'Xin chào',
  'Merhaba',
  'Hej',
  'Hei',
  'Hallo',
  'Hej',
  'Aloha',
  'Shalom',
  'Salaam',
  'Salam',
  'Sveikas',
  'Sėkmę',
  'Terevis',
  'Tere',
  'Zdravo',
  'Zdravstvuj',
  'Ahoj',
  'Ahoj',
  'Cześć',
  'Szia',
  'Hej',
  'Hei',
  'Moia',
  'Bula',
  'Bula',
  'Kia orana',
  'Talofa',
  'Fakalofa',
  'Malo e lelei',
  'Allo',
  'Aloha',
  'Sholem',
  'Shalom',
  'Salaam',
  'Salam',
  'Sveikas',
  'Sėkmę',
  'Terevis',
  'Tere',
  'Zdravo',
  'Zdravstvuj',
  'Ahoj',
  'Cześć',
  'Szia',
  'Hej',
  'Hei',
  'Moia',
  'Bula',
  'Kia orana',
  'Talofa',
  'Fakalofa',
  'Malo e lelei',
  'Allo',
  'Aloha',
  'Sholem',
  'Shalom',
  'Salaam',
  'Salam',
  'Sveikas',
  'Sėkmę',
  'Terevis',
  'Tere',
  'Zdravo',
  'Zdravstvuj',
  'Ahoj',
  'Cześć',
  'Szia',
  'Hej',
  'Hei',
  'Moia',
  'Bula',
  'Kia orana',
  'Talofa',
  'Fakalofa',
  'Malo e lelei',
  'Allo',
  'Aloha',
  'Sholem',
  'Shalom',
  'Salaam',
  'Salam',
  'Sveikas',
  'Sėkmę',
  'Terevis',
  'Tere',
  'Zdravo',
  'Zdravstvuj',
  'Ahoj',
  'Cześć',
  'Szia',
  'Hej',
  'Hei',
  'Moia',
  'Bula',
  'Kia orana',
  'Talofa',
  'Fakalofa',
  'Malo e lelei',
];

const GREETING_DELAY = 2000; // ms per each greeting

export default function FirstPage({ onEnter }) {
  const [currentGreeting, setCurrentGreeting] = useState('UE');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let index = 0;
    let interval;

    const startAnimation = () => {
      interval = setInterval(() => {
        index = (index + 1) % GREETINGS.length;
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentGreeting(GREETINGS[index]);
          setIsAnimating(false);
        }, 200);
      }, GREETING_DELAY);
    };

    const timeout = setTimeout(startAnimation, 1500);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleClick = useCallback(() => {
    onEnter();
  }, [onEnter]);

  return (
    <div className="first-page" onClick={handleClick}>
      <div className="first-page__greeting" data-animating={isAnimating}>
        {currentGreeting}
      </div>
      <div className="first-page__hint">
        Click anywhere to enter
      </div>
    </div>
  );
}