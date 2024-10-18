import React, { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { ATMStateType } from '@/types'

interface KeypadProps {
  onEnterPin: (pin: string) => void
  onSelectTransaction: (type: string, amount?: number) => void
  currentState: ATMStateType
}

export const Keypad: React.FC<KeypadProps> = ({ onEnterPin, onSelectTransaction, currentState }) => {
  const [input, setInput] = useState('')

  const handleKeyPress = useCallback((key: string) => {
    if (currentState === 'pin' && input.length < 4) {
      setInput(prev => prev + key)
    } else if (currentState === 'withdraw' || currentState === 'deposit') {
      setInput(prev => prev + key)
    }
  }, [currentState, input])

  const handleEnter = useCallback(() => {
    if (currentState === 'pin' && input.length === 4) {
      onEnterPin(input)
      setInput('')
    } else if (currentState === 'transaction') {
      switch (input) {
        case '1':
          onSelectTransaction('withdraw')
          break
        case '2':
          onSelectTransaction('deposit')
          break
        case '3':
          onSelectTransaction('balance')
          break
      }
      setInput('')
    } else if (currentState === 'withdraw' || currentState === 'deposit') {
      const amount = parseInt(input)
      if (!isNaN(amount)) {
        onSelectTransaction(currentState, amount)
      }
      setInput('')
    }
  }, [currentState, input, onEnterPin, onSelectTransaction])

  const handleClear = useCallback(() => {
    setInput('')
  }, [])

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Clear', 0, 'Enter'].map((key) => (
        <Button
          key={key}
          onClick={() => {
            if (key === 'Clear') handleClear()
            else if (key === 'Enter') handleEnter()
            else handleKeyPress(key.toString())
          }}
          className="w-full"
          variant={typeof key === 'number' ? 'outline' : 'default'}
        >
          {key}
        </Button>
      ))}
    </div>
  )
}