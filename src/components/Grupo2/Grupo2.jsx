import './styles.css'
export default function Grupo2() {
  const handleClick = () => {
    console.log('Casillas: ')
  }
  return (
    <div className="grupo2">
      <div className="carta" onClick={handleClick}></div>
      <div className="carta"></div>
      <div className="carta"></div>
      <div className="carta"></div>
    </div>
  )
}
