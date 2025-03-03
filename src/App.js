import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import Gameboard from './components/Gameboard'
import './App.css'
import rapDeck from './data/rapDeck.json'

function App() {
  const [cardList, setCardList] = useState([])
  const [userSelection, setUserSelection] = useState([])
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

  useEffect(() => {
    if(!initialized.current) {
      createDeck(rapDeck)
      initialized.current = true
    }
  }, [])
  useEffect(() => {
    if(userSelection.length === 2) {
      const cardOne = userSelection[0]
      const cardTwo = userSelection[1]

      if(cardOne.faceValue === cardTwo.faceValue) {
        setCardList((pre) => {
          const cards = [...pre]
          pre[cardOne.position].matched = true
          pre[cardTwo.position].matched = true
          return cards
        })
      } else {
        setTimeout(() => {
          setCardList((pre) => {
            const cards = [...pre]
            pre[cardOne.position].visible = false
            pre[cardTwo.position].visible = false
            return cards
          })
        }, 1000);
      }
      setUserSelection(() => [])
    }
  }, [userSelection])

  return (
    <div className='container'>
      <Header />
      <Gameboard cardList={cardList} flipCard={flipCard}/>
    </div>
  )
}

export default App
