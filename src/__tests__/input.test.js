import { fireEvent, getByRole, render, screen } from '@testing-library/react'
import InputComponent from '../components/input'


const mockKeyboardChange = jest.fn()
const mockInput = jest.fn()
const mockTimer = jest.fn()
const mockDisableKeyboard = jest.fn()
const mockRepeatTest = jest.fn()

const renderInput = (timer) => {
    render(<InputComponent
        borderColor={'blue.500'}
        input={'fir'}
        disableKeyboard={false}
        words={['first']}
        wordIndex={2}
        shallowInput={true}
        timer={timer}
        start={false}
        keyboardChange={mockKeyboardChange}
        setInput={mockInput}
        setTimer={mockTimer}
        setdisableKeyboard={mockDisableKeyboard}
        repeatTest={mockRepeatTest}
    />)
}
test('should render input component, be visible', () => {
    renderInput(60)
    let input = screen.getByRole('textbox')
    expect(input).toBeVisible()
})

test('check onchangekeyboard function called when type', () => {
    renderInput(60)

    let input = screen.getByRole('textbox')
    fireEvent.keyUp(input)
    expect(mockKeyboardChange).toHaveBeenCalledTimes(1)
})

test('check setInput called when keyboard onchange', () => {
    renderInput(60)

    let input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(mockInput).toBeCalledWith('test')
})

test('check add second work when clicked', () => {
    renderInput(60)

    let addSecond = screen.getByTitle('Add timer')
    fireEvent.click(addSecond)
    expect(mockTimer).toHaveBeenCalledTimes(1)
})

test('check subs second work when clicked', () => {
    renderInput(120)

    let subsSecond = screen.getByTitle('Subs timer')
    fireEvent.click(subsSecond)
    expect(mockTimer).toHaveBeenCalledTimes(1)
})

test('check subs second not work when timer == 60 when clicked', () => {
    renderInput(60)

    let subsSecond = screen.getByTitle('Subs timer')
    fireEvent.click(subsSecond)
    expect(mockTimer).not.toHaveBeenCalledTimes(1)
})

test('check disable keyboard when timer == 0', () => {
    renderInput(0)

    let keyboard = screen.getByRole('textbox')
    expect(keyboard).toHaveProperty('disabled')
})

test('check repeat icon function when clicked', () => {
    renderInput(0)

    let repeatIcon = screen.getByTitle('Repeat')
    fireEvent.click(repeatIcon)
    expect(mockRepeatTest).toHaveBeenCalledTimes(1)
})