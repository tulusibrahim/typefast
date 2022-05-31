import React, { useEffect, useState } from 'react';
import { border, ChakraProvider, Flex, Icon, Input, Switch, Menu, MenuButton, MenuList, MenuItem, Button, IconButton, } from '@chakra-ui/react';
import randomWords from 'random-words'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { CgChevronUp, CgChevronDown } from 'react-icons/cg'
import { BsArrowRepeat } from 'react-icons/bs'
import { FaSun, FaMoon } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

function App() {
  const [words, setWords] = useState([])
  const [limitUp, setLimitUp] = useState(10)
  const [limitDown, setLimitDown] = useState(0)
  const [timer, setTimer] = useState(60)
  const [start, setStart] = useState(false)
  const [input, setInput] = useState('')
  const [disableKeyboard, setdisableKeyboard] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [shallowInput, setShallowInput] = useState(false)
  const [borderColor, setBorderColor] = useState('blue.500')
  const [rightWords, setRightWords] = useState(0)
  const [wrongWords, setWrongWords] = useState(0)
  const [totalCharacter, setTotalCharacter] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [actualTimer, setActualTimer] = useState(0)
  const [accuracy, setAccuracy] = useState(0)

  let { textColor, bgColor, cardResultShadow, toggleColorMode, colorMode, cardResultBg } = ColorModeSwitcher()

  const getData = (second) => {
    setWords([])
    setWords(randomWords(400))
  }

  const WordTemplate = ({ word }) => {
    return (
      <Flex px='10px' py='5px' fontSize={['1.1rem', '1.3rem', '1.5rem']} bg={words[wordIndex] == word ? colorMode == 'dark' ? 'gray.900' : 'whiteAlpha.700' : ''} borderRadius='10px' mr='10px' mb='10px'>
        {word}
      </Flex>
    )
  }

  const moveOneSequence = (second) => {
    setLimitDown(limitUp + 1)
    setLimitUp(limitUp + 10)
  }

  const keyboardChange = (e) => {
    if (start === false) {
      setTotalCharacter(0)
      setWrongWords(0)
      setRightWords(0)
      setWordIndex(0)

      setActualTimer(timer / 60)
      setStart(true)
    }

    if (e.nativeEvent.key === ' ') {
      // console.log(input.match(/[^\s]/g).join(''), words[wordIndex])
      setTotalCharacter(totalCharacter + input.match(/[^\s]/g).join('').length)

      if (input.match(/[^\s]/g).join('') == words[wordIndex]) {
        setRightWords(rightWords + 1)
      }
      else {
        setWrongWords(wrongWords + 1)
      }
      setInput('')
      setWordIndex(wordIndex + 1)
      wordIndex !== 0 && wordIndex % 10 == 0 && moveOneSequence()
    }
    else {
      // console.log(input.charAt(input.length - 1), temp[input.length - 1])
      // console.log(words[wordIndex].length)

      setInput(e.target.value)
      let temp = words[wordIndex].split('')
      // console.log(input.substring(0, input.length), words[wordIndex].substring(0, input.length))
      // console.log(input.substring(0, input.length), words[wordIndex].substring(0, input.length))
      // if (input.charAt(input.length - 1) === temp[input.length - 1]) {
      if (input.substring(0, input.length) == words[wordIndex].substring(0, input.length)) {
        setBorderColor(colorMode == 'dark' ? 'green.300' : 'green.500')
      }
      else {
        setBorderColor(colorMode == 'dark' ? 'red.600' : 'red.700')
      }
    }
  }

  const CalculateWPMandAccuracy = () => {
    let grossWPM = (totalCharacter / 5) / actualTimer
    let netWPM = (grossWPM - wrongWords) / actualTimer
    let accuracy = (netWPM / grossWPM) * 100
    console.log(netWPM, accuracy)
    setWpm(netWPM)
    setAccuracy(accuracy)
    // getData()
  }

  const repeatTest = () => {
    setTimer(60)
    getData()
    setdisableKeyboard(false)
    setWordIndex(0)
    setWpm(0)
    setAccuracy(0)
  }

  const ResultTemplate = () => {
    return (
      <Flex w={['70%', '70%', '20%']} h='fit-content' display={wpm ? 'flex' : 'none'} bg={cardResultBg} boxShadow={`0px 0px 7px 0px ${cardResultShadow}`} _hover={{ transform: 'translateY(-5px)', boxShadow: `0px 0px 10px 2px ${cardResultShadow}` }} transitionDuration='.3s' color={textColor} justify='center' borderRadius='10px' py='10px' direction='column'>
        <Flex w='100%' justify='center' mb='10px'>
          <Flex fontWeight='bold' letterSpacing='1px' fontSize='2xl'>{wpm.toFixed(0)} WPM</Flex>
        </Flex>
        <Flex w='100%' direction='column' alignItems='center' justify='center'>
          <Flex w='80%' justify='space-between' my='3px'>
            <Flex w='fit-content' justify='center' fontWeight='bold'>{accuracy.toFixed(2)} %</Flex>
            <Flex>Accuracy</Flex>
          </Flex>
          <Flex w='80%' justify='space-between' my='3px'>
            <Flex w='35%' justify='center' fontWeight='bold'>{rightWords}</Flex>
            <Flex>Correct Words</Flex>
          </Flex>
          <Flex w='80%' justify='space-between' my='3px'>
            <Flex w='35%' justify='center' fontWeight='bold'>{wrongWords}</Flex>
            <Flex>Wrong words</Flex>
          </Flex>
          <Flex w='80%' justify='space-between' my='3px'>
            <Flex w='35%' justify='center' fontWeight='bold'>{totalCharacter}</Flex>
            <Flex>Keystrokes</Flex>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  useEffect(() => {
    start && timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)
    if (timer === 0) {
      setStart(false)
      setdisableKeyboard(true)
      CalculateWPMandAccuracy()
      setInput('')
      setBorderColor('')
    }
    // console.log('bener: ', rightWords, ' salah: ', wrongWords)
    // console.log(totalCharacter)
  }, [start, timer])


  useEffect(() => {
    getData()
  }, [])

  // useEffect(() => { 
  //   keyboardChange()
  // }, [input])


  return (
    <Flex bg={bgColor} color={textColor} w='100vw' minH='100vh' alignItems='center' justify={'flex-start'} direction={'column'} pb='20px' fontFamily='Montserrat'>
      <Flex w={['90%', '90%', '95%']} h='10vh' alignItems='center' alignSelf='center' justify='flex-end' right='8' top='6' >
        <Flex alignItems='center' fontSize='14px' mr='25px' display={['none', 'none', 'flex']}>
          Disable shadow input
          <Switch ml='10px' onChange={e => setShallowInput(!shallowInput)} value={shallowInput} />
          {/* <Icon as={FiSettings} boxSize={6} cursor='pointer' ml='10px' /> */}
        </Flex>
        <Icon as={colorMode == 'dark' ? FaMoon : FaSun} boxSize={6} onClick={toggleColorMode} cursor='pointer' />
      </Flex>
      <Flex w='100%' h='15vh' justify='center' alignItems='center' letterSpacing='4px' fontSize={[32, 44, 52]} fontStyle='italic' fontWeight='bold'>
        Typefast
      </Flex>
      <Flex w={['95%', '95%', '46%']} h='fit-content' my='1rem' wrap='wrap' justify='flex-start'>
        {
          words.map((i, id) => id <= limitUp && id >= limitDown && <WordTemplate word={i} />)
        }
      </Flex>
      <Flex w='100%' h='20vh' justify='center' alignItems='center'>
        <Flex h='25%' w={['90%', '90%', '45%']} pos='relative' alignItems='center'>
          <Input w={['80%', '80%', '90%']} type='text' variant='flushed' color={textColor} borderBottomColor={borderColor ? borderColor : 'blue.300'} borderBottomWidth='2px' zIndex={2} _focus={{ borderBottomColor: 'none' }} value={input} onKeyUp={keyboardChange} onChange={e => setInput(e.target.value)} disabled={disableKeyboard} />
          <Input w={['80%', '80%', '90%']} type='text' variant='flushed' color={colorMode == 'dark' ? 'whiteAlpha.400' : 'blackAlpha.600'} pos='absolute' value={input?.substring(0, input?.length) == words[wordIndex]?.substring(0, input.length) ? words[wordIndex] : ''} zIndex={1} display={shallowInput ? 'none' : 'block'} disabled />
          <Flex w={['20%', '20%', '10%']} display={timer == 0 ? 'none' : 'flex'} direction='column' pos='absolute' right={0} h='fit-content' alignItems='center' justify='center'  >
            <Icon as={CgChevronUp} color={textColor} my='2px' cursor='pointer' _hover={{ transform: 'scale(1.3)' }} transitionDuration='.2s' onClick={() => setTimer(timer + 60)} display={!start ? 'block' : 'none'} />
            <Flex w='100%' justify='center' alignItems='center' textAlign='center' userSelect='none' flexDir='column'>{timer} sec</Flex>
            <Icon as={CgChevronDown} color={textColor} my='2px' cursor='pointer' _hover={{ transform: 'scale(1.3)' }} transitionDuration='.2s' onClick={() => { timer > 60 && setTimer(timer - 60); setdisableKeyboard(false) }} display={!start ? 'block' : 'none'} />
          </Flex>
          <Flex display={timer == 0 ? 'flex' : 'none'} w={['20%', '20%', '10%']} h='100%' alignItems='center' color='white' justify='center'>
            <Icon as={BsArrowRepeat} color={textColor} boxSize={6} cursor='pointer' _hover={{ transform: 'scale(1.15)' }} transitionDuration='.2s' onClick={() => repeatTest()} />
            {/* <RepeatClockIcon boxSize={5}  /> */}
          </Flex>
        </Flex>
      </Flex>
      <ResultTemplate />
    </Flex>
  );
}

export default App;
