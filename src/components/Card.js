import './Card.css'

function Card(props) {
  function selectCard(){
    props.selectCard({
      position: props.position,
      faceValue: props.value,
    })
  }

  return (
    <div className={["card", props.visible ? 'is-flipped' : ''].join(' ')} onClick={selectCard}>
      <div className='card-face is-front'>
        <img src={`/img/${props.value}.png`} alt={props.value} />
      </div>
      <div className='card-face is-back'></div>
    </div>
  )
}

export default Card
