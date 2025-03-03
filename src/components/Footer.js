import './Footer.css'

function Footer({ status }) {
  return (
    <footer>
      <span>Pairs</span>
      <div className='value'>{ status }</div>
    </footer>
  )
}

export default Footer
