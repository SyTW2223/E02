import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  const [count, setCount] = useState(0)
  const value = useSelector((state: any) => state.auth)
  console.log(value);

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  )
}

export default App
