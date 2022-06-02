import { render, screen } from '@testing-library/react'
import Title from '../components/title'

test('should render title', () => {
    let { getByText } = render(<Title />)

    expect(getByText(/Typefast/i)).toBeInTheDocument()
})

test('make sure title visible', () => {
    let { getByText } = render(<Title />)

    expect(getByText(/Typefast/i)).toBeVisible()
})