import '@testing-library/jest-dom'
import { fireEvent, render, screen, within } from '@testing-library/react'
import Navbar from '../components/navbar'

test('should render navbar', () => {
    render(<Navbar />)
    let navbar = screen.getByRole('navigation')
    expect(navbar).toBeInTheDocument()
})

test('make sure navbar visible', () => {
    render(<Navbar />)
    let navbar = screen.getByRole('navigation')
    expect(navbar).toBeVisible()
})

test('should display text', () => {
    render(<Navbar />)
    let navbar = screen.getByRole('navigation')
    expect(navbar).toHaveTextContent('Disable shadow input')
})

test('should render color mode switch', () => {
    render(<Navbar />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toBeVisible()
})