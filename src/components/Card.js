import './Card.css'

function Card(props) {
  return (
    <div className={["card", props.visible ? 'is-flipped' : ''].join(' ')}>
      <div className='card-face is-front'>
        <img src={`/img/${props.value}.png`} alt={props.value} />
      </div>
      <div className='card-face is-back'></div>
    </div>
  )
}

export default Card
