import { render, screen } from '@testing-library/react'
import WordTemplate from '../components/wordTemplate'

test('should render word template', () => {
    render(<WordTemplate word='applied' />)

    let word = screen.getByText(/applied/i)
    expect(word).toBeInTheDocument()
    expect(word).toBeVisible()
})

test('should have no bg color when wordIndex and id different', () => {
    render(<WordTemplate word='applied' wordIndex={2} id={1} />)

    let bgColor = screen.getByText(/applied/i)
    expect(bgColor).toHaveStyle(`background-color: ''`)
})

test('should have bg color when wordIndex and id same', () => {
    render(<WordTemplate word='applied' wordIndex={2} id={2} />)

    let bgColor = screen.getByText(/applied/i)
    expect(bgColor).toHaveStyle(`background-color: whiteAlpha.700`)
})