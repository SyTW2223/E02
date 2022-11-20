import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import Main from './components/Main'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from './components/Navbar'
import Breadcrumb from './components/Breadcrumb'
import Carrousel from './components/Carrousel'

function App() {
  const value = useSelector((state: any) => state.auth)
  console.log(value);

  return (
    <div className="App">
      <Navbar />
      <Breadcrumb/>
      <Carrousel/>
      <Main />
      <Footer />
    </div>
  )
}

export default App
