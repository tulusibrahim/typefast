import { render, screen } from '@testing-library/react'
import useListWord from '../components/useListWord'
import { renderHook, act } from '@testing-library/react-hooks'

test('should fill words with data', () => {
    const { result } = renderHook(() => useListWord())

    act(() => result.current.getData())

    expect(result.current.words).not.toEqual([])
})

test('should add limitup, limitdown value', () => {
    const { result } = renderHook(() => useListWord())

    act(() => result.current.moveOneSequence())

    expect(result.current.limitDown).toEqual(11)
    expect(result.current.limitUp).toEqual(20)
})

test('should calculate result test', () => {
    const { result } = renderHook(() => useListWord())
    result.current.setTotalCharacter(300)
    result.current.setActualTimer(1)
    result.current.setWrongWords(4)

    act(() => result.current.CalculateWPMandAccuracy())

    expect(result.current.wpm).toEqual(56)
    expect(result.current.accuracy).toEqual(93.33333333333333)
})

test('should reset hooks inside repeat test function', () => {
    const { result } = renderHook(() => useListWord())

    act(() => result.current.repeatTest())

    expect(result.current.timer).toEqual(60)
    expect(result.current.words).not.toEqual([])
    expect(result.current.disableKeyboard).toEqual(false)
    expect(result.current.wordIndex).toEqual(0)
    expect(result.current.wpm).toEqual(0)
    expect(result.current.accuracy).toEqual(0)
    expect(result.current.limitDown).toEqual(0)
    expect(result.current.limitUp).toEqual(10)
})

describe('test onchange keyboard', () => {
    let mockParamSpace = {
        nativeEvent: {
            key: ' '
        }
    }
    let mockParamWithChar = {
        nativeEvent: {
            key: 'a'
        },
        target: {
            value: 'a'
        }
    }
    test('should change input state when typing', () => {
        const { result } = renderHook(() => useListWord())
        result.current.setInput('test')

        act(() => result.current.keyboardChange(mockParamSpace))

        expect(result.current.totalCharacter).toEqual(4)
    })

    test('should add 1 right word when input is same', () => {
        const { result } = renderHook(() => useListWord())
        result.current.setInput('test')
        result.current.setWords(['test'])
        result.current.setWordIndex(0)

        act(() => result.current.keyboardChange(mockParamSpace))

        expect(result.current.rightWords).toEqual(1)
    })

    test('should add 1 wrong word when input is same', () => {
        const { result } = renderHook(() => useListWord())
        result.current.setInput('tes')
        result.current.setWords(['test'])
        result.current.setWordIndex(0)

        act(() => result.current.keyboardChange(mockParamSpace))

        expect(result.current.wrongWords).toEqual(1)
    })

    test('should clear input state after type space, add 1 wordIndex', () => {
        const { result } = renderHook(() => useListWord())
        result.current.setInput('tes')

        act(() => result.current.keyboardChange(mockParamSpace))

        expect(result.current.input).toEqual('')
        expect(result.current.wordIndex).toEqual(1)
    })

    test('should add current type to input state', () => {
        const { result } = renderHook(() => useListWord())

        act(() => result.current.keyboardChange(mockParamWithChar))

        expect(result.current.input).toEqual('a')
    })

    test('should change border color to green when typing correct', () => {
        const { result } = renderHook(() => useListWord())
        result.current.setInput('tes')
        result.current.setWords(['test'])
        result.current.setWordIndex(0)

        act(() => result.current.keyboardChange(mockParamWithChar))

        expect(result.current.borderColor).toEqual('green.500')
    })

    test('should change border color to red when typing correct', () => {
        const { result } = renderHook(() => useListWord())
        result.current.setInput('ted')
        result.current.setWords(['test'])
        result.current.setWordIndex(0)

        act(() => result.current.keyboardChange(mockParamWithChar))

        expect(result.current.borderColor).toEqual('red.700')
    })
})

test('should reset some state when timer == 0', () => {
    const { result } = renderHook(() => useListWord())
    result.current.setTimer(0)

    expect(result.current.start).toEqual(false)
    expect(result.current.input).toEqual('')
    expect(result.current.borderColor).toEqual('blue.500')
})