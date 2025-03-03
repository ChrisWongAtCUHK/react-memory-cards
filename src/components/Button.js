import confetti from 'canvas-confetti'
import './Button.css'

function Button(props) {
  function startNewGame() {
    props.startNewGame()

    setTimeout(()=>{
      confetti.reset()
    }, 1000)
  }

  return (
    <>
      <button onClick={startNewGame} className='button'>{props.newPlayer ? 'Start Game' : 'Restart Game'}</button>
    </>
  )
}

export default Button
