import { Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Navbar from './components/navbar';
import Title from './components/title';
import ListWord from './components/listWord';
import ResultTemplate from './components/resultTemplate';
import useListWord from './components/useListWord';
import InputComponent from './components/input';
import Feedback from './components/feedback';

function App() {

  let { textColor, bgColor } = ColorModeSwitcher()
  let {
    wpm,
    timer,
    input,
    start,
    words,
    limitUp,
    accuracy,
    limitDown,
    wordIndex,
    rightWords,
    wrongWords,
    borderColor,
    shallowInput,
    totalCharacter,
    disableKeyboard,
    allInputtedWords,
    setdisableKeyboard,
    setShallowInput,
    keyboardChange,
    repeatTest,
    setInput,
    setTimer,
  } = useListWord()

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <Flex bg={bgColor} color={textColor} w='100vw' minH='100vh' alignItems='center' justify={'flex-start'} direction={'column'} pb='20px' fontFamily='Montserrat'>
      <Navbar shallowInput={shallowInput} setShallowInput={setShallowInput} />

      <Title />

      <ListWord words={words} limitUp={limitUp} limitDown={limitDown} wordIndex={wordIndex} allInputtedWords={allInputtedWords} />

      <InputComponent
        borderColor={borderColor}
        input={input}
        disableKeyboard={disableKeyboard}
        words={words}
        wordIndex={wordIndex}
        shallowInput={shallowInput}
        timer={timer}
        start={start}
        keyboardChange={keyboardChange}
        setInput={setInput}
        setTimer={setTimer}
        setdisableKeyboard={setdisableKeyboard}
        repeatTest={repeatTest}
      />

      <ResultTemplate
        wpm={wpm}
        accuracy={accuracy}
        rightWords={rightWords}
        wrongWords={wrongWords}
        totalCharacter={totalCharacter}
      />

      <Feedback />
    </Flex>
  );
}

export default App;
