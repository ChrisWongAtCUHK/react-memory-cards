import { useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import Header from './components/Header'
import Gameboard from './components/Gameboard'
import Button from './components/Button'
import Footer from './components/Footer'
import './App.css'
import rapDeck from './data/rapDeck.json'
import { launchConfetti } from './utilities/confetti'

function App() {
  const [cardList, setCardList] = useState([])
  const [userSelection, setUserSelection] = useState([])
  const [newPlayer, setNewPlayer] = useState(true)
  const [status, setStatus] = useState('0')
  
  const initialized = useRef(false)

  function initDeck(deckData) {
    deckData.forEach((item) => {
      setCardList((pre) => {
        return [
          ...pre,
          {
            value: item,
            variant: 1,
            visible: false,
            position: null,
            matched: false,
          },
          {
            value: item,
            variant: 2,
            visible: true,
            position: null,
            matched: false,
          },
        ]
      })
    })
  }

  function updateCardPosition() {
    setCardList((pre) => {
      return pre.map((card, index) => {
        return {
          ...card,
          position: index,
        }
      })
    })
  }

  function createDeck(deckData) {
    initDeck(deckData)
    updateCardPosition()
  }

  function flipCard(payload) {
    setCardList((pre) => {
      return pre.map((card, index) => {
        if (index === payload.position) {
          card.visible = true
        }

        return card
      })
    })

    if (userSelection[0]) {
      if (
        userSelection[0].position === payload.position &&
        userSelection[0].faceValue === payload.faceValue
      ) {
        return
      } else {
        setUserSelection((pre) => {
          const us = [...pre]
          us[1] = payload
          return us
        })
      }
    } else {
      setUserSelection((pre) => {
        const us = [...pre]
        us[0] = payload
        return us
      })
    }
  }

  function restartGame() {
    const deck = _.shuffle(cardList)
    setCardList(() => {
      return deck.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false,
        }
      })
    })
  }

  function startGame() {
    setNewPlayer(() => false)
    restartGame()
  }

  function startNewGame() {
    if(newPlayer) {
      startGame()
    } else {
      restartGame()
    }
  }

  useEffect(() => {
    if (!initialized.current) {
      createDeck(rapDeck)
      initialized.current = true
    }
  })

  useEffect(() => {
    if (userSelection.length === 2) {
      const cardOne = userSelection[0]
      const cardTwo = userSelection[1]

      if (cardOne.faceValue === cardTwo.faceValue) {
        const cards = [...cardList]
        cards[cardOne.position].matched = true
        cards[cardTwo.position].matched = true

        setCardList(() => cards)

        // check 
        const matchedPairs = cards.filter(card => card.matched === true).length / 2

        if(matchedPairs === rapDeck.length) {
          setStatus(() => 'Player wins!')
          launchConfetti()
        } else {
          setStatus(() => matchedPairs)
        }
      } else {
        setTimeout(() => {
          setCardList((pre) => {
            const cards = [...pre]
            pre[cardOne.position].visible = false
            pre[cardTwo.position].visible = false
            return cards
          })
        }, 1000)
      }
      setUserSelection(() => [])
    }
  }, [userSelection])

  return (
    <div className='container'>
      <Header />
      <Gameboard cardList={cardList} flipCard={flipCard} />
      <Button newPlayer={newPlayer} startNewGame={startNewGame}  />
      <Footer status={status}/>
    </div>
  )
}

export default App
