import { useEffect, useState } from 'react'
import Header from './components/Header'
import Gameboard from './components/Gameboard'
import './App.css'
import rapDeck from "./data/rapDeck.json";

function App() {
  const [cardList, setCardList] = useState([])

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
          position: index
        }
      })
    }) 
  }

  function createDeck(deckData) {
    initDeck(deckData)
    updateCardPosition()
  }

  useEffect(() => {
    createDeck(rapDeck)

  }, [])
  useEffect(() => {
    console.log(cardList)
  }, [cardList])

  return (
    <div className='container'>
      <Header />
      <Gameboard cardList={cardList} />
    </div>
  )
}

export default App
