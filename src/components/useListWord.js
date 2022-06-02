import { useState, useEffect } from "react"
import randomWords from 'random-words'
import { ColorModeSwitcher } from "../ColorModeSwitcher"

const useListWord = () => {
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

    let { colorMode } = ColorModeSwitcher()

    const getData = () => {
        setWords([])
        setWords(randomWords(400))
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
            //regex to filter space from user input
            // console.log(input.match(/[^\s]/g).join(''), words[wordIndex])

            setTotalCharacter(totalCharacter + input.length)

            if (input.match(/[^\s]/g).join('') === words[wordIndex]) {
                setRightWords(rightWords + 1)
            }
            else {
                setWrongWords(wrongWords + 1)
            }
            setInput('')
            setWordIndex(wordIndex + 1)
            wordIndex !== 0 && wordIndex % 10 === 0 && moveOneSequence()
        }
        else {
            // console.log(input.charAt(input.length - 1), temp[input.length - 1])
            // console.log(words[wordIndex].length)

            setInput(e.target.value)
            // let temp = words[wordIndex].split('')
            // console.log(input.substring(0, input.length), words[wordIndex].substring(0, input.length))
            // console.log(input.substring(0, input.length), words[wordIndex].substring(0, input.length))
            // if (input.charAt(input.length - 1) === temp[input.length - 1]) {
            if (input.substring(0, input.length) === words[wordIndex].substring(0, input.length)) {
                setBorderColor(colorMode === 'dark' ? 'green.300' : 'green.500')
            }
            else {
                setBorderColor(colorMode === 'dark' ? 'red.600' : 'red.700')
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
        setLimitDown(0)
        setLimitUp(10)
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
    }, [start, timer])

    useEffect(() => {
        getData()
    }, [])

    return {
        wpm,
        words,
        start,
        timer,
        input,
        limitUp,
        accuracy,
        limitDown,
        wordIndex,
        rightWords,
        wrongWords,
        borderColor,
        actualTimer,
        shallowInput,
        totalCharacter,
        disableKeyboard,
        setdisableKeyboard,
        setShallowInput,
        keyboardChange,
        repeatTest,
        setTimer,
        setInput,
        CalculateWPMandAccuracy,
        setTotalCharacter,
        moveOneSequence,
        setActualTimer,
        setWrongWords,
        getData,
        setWords,
        setWordIndex,
    }
}

export default useListWord;