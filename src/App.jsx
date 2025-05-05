
import List_event from './pages/List_event'
import { Routes, Route } from 'react-router-dom'
import ContactForm from './components/ContactForm'

function App() {
  return (
    <div className="app">
      <h1 className='text-center font-bold text-3xl'>Application avec PHP + React</h1>
      <p className='text-center'><i>Recuperation des donnees de la database a l 'aide de l API</i></p>
      <Routes>
        <Route path='/contact' element={<ContactForm/> }></Route>
      </Routes>
      <List_event />
    </div>
  )
}

export default App