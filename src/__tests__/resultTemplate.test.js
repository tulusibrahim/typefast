import { getByText, render, screen } from '@testing-library/react'
import ResultTemplate from '../components/resultTemplate'

test('should render result card, be visible', () => {
    render(<ResultTemplate
        wpm={40}
        accuracy={75}
        rightWords={23}
        wrongWords={12}
        totalCharacter={300}
    />)

    let card = screen.getByRole('group')
    expect(card).toBeVisible()
})

test('should not render card if no wpm passed', () => {
    render(<ResultTemplate
        wpm={0}
        accuracy={0}
        rightWords={0}
        wrongWords={0}
        totalCharacter={0}
    />)

    let card = screen.getByText('0 WPM')
    expect(card).not.toBeVisible()
})

test('should render wpm result correctly', () => {
    render(<ResultTemplate
        wpm={40}
        accuracy={75}
        rightWords={23}
        wrongWords={12}
        totalCharacter={300}
    />)

    let wpmResult = screen.getByText(/40/i)
    expect(wpmResult).toBeVisible()
})

test('should render wpm result correctly', () => {
    render(<ResultTemplate
        wpm={40}
        accuracy={75}
        rightWords={23}
        wrongWords={12}
        totalCharacter={300}
    />)
    let accResult = screen.getByText(/75/i)
    expect(accResult).toBeVisible()
})
test('should render correct words result correctly', () => {
    render(<ResultTemplate
        wpm={40}
        accuracy={75}
        rightWords={23}
        wrongWords={12}
        totalCharacter={300}
    />)
    let rightWResult = screen.getByText(/23/i)
    expect(rightWResult).toBeVisible()
})
test('should render wrong words result correctly', () => {
    render(<ResultTemplate
        wpm={40}
        accuracy={75}
        rightWords={23}
        wrongWords={12}
        totalCharacter={300}
    />)
    let wrongWResult = screen.getByText(/12/i)
    expect(wrongWResult).toBeVisible()
})
test('should render total char result correctly', () => {
    render(<ResultTemplate
        wpm={40}
        accuracy={75}
        rightWords={23}
        wrongWords={12}
        totalCharacter={300}
    />)
    let totalCharResult = screen.getByText(/300/i)
    expect(totalCharResult).toBeVisible()
})