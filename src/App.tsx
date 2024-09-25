import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Compoents/MainPage';
import BookList from './Compoents/BookList';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/books/:category' element={<BookList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
