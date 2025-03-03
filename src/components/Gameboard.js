import './Gameboard.css'
import Card from './Card'

function Gameboard(props) {
  function selectCard(payload) {
    props.flipCard(payload)
  }
  return (
    <div className='game-board' name='shuffle-card'>
      {props.cardList.map((card) => {
        return (
          <Card
            key={`${card.value}-${card.variant}`}
            matched={card.matched}
            value={card.value}
            visible={card.visible}
            position={card.position}
            selectCard={selectCard}
          />
        )
      })}
    </div>
  )
}

export default Gameboard
