import './Gameboard.css'
import Card from './Card'

function Gameboard(props) {
  return (
    <div className="game-board" name="shuffle-card">
      {props.cardList.map((card) => {
        return (
          <Card
            key={JSON.stringify(card)}
            matched={card.matched}
            value={card.value}
            visible={card.visible}
            position={card.position}
          />
        )
      })}
    </div>
  )
}

export default Gameboard
