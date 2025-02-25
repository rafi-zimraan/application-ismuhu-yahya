import {useEffect, useState} from 'react';

export const useWelcomeMessage = () => {
  const [welcomeText, setWelcomeText] = useState('');

  useEffect(() => {
    let index = 0;
    const welcomeMessage = "Assalamu'alaikum, ";
    const message = [
      'Orang Baik',
      'Orang Kaya',
      'Orang Dermawan',
      'Orang Muslih',
    ];
    const todayIndex = new Date().getDate() % message.length;
    const selectedMessage = welcomeMessage + message[todayIndex];
    setWelcomeText('');
    const typingInterval = setInterval(() => {
      setWelcomeText(prev => prev + selectedMessage[index]);
      index++;
      if (index === selectedMessage.length) {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return welcomeText;
};
