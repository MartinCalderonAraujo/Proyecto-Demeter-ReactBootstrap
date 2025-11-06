import { render, screen } from '@testing-library/react'
import App from '../App'
import { describe, it, expect } from 'vitest'

describe('App component', () => {
  it('renderiza correctamente', () => {
    render(<App />)
    expect(screen.getByText(/Demeter/i)).toBeInTheDocument()
  })
})
