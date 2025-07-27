import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from "./Pages/Login"
import Signup from './Pages/Signup'
import Navbar from "./Components/Navbar"
import SubjectPage from './Pages/SubjectPage';
import BookDetails from './Pages/BookDetails';
import Landing from './Pages/Landing';
import AddReview from './Pages/AddReview';
import SearchResults from './Pages/SearchResults';
import AddBook from './Pages/AddBooks';
import UserBooks from './Pages/UserBooks';
import UserReviews from './Pages/UserReviews';

const App = () => {
    const location = useLocation();
    const hideNavbarOn = ['/login', '/signup'];

    const shouldHideNavbar = hideNavbarOn.includes(location.pathname);
  return (
    <div>
        {!shouldHideNavbar && <Navbar />}
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path="/subject/:subject" element={<SubjectPage />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path='/add-review' element={<AddReview />}/>
            <Route path="/search" element={<SearchResults />} />
            <Route path='/add-book' element={<AddBook />}/>
            <Route path="/my-books" element={<UserBooks />} />
            <Route path="/my-reviews" element={<UserReviews />} />
        </Routes>
    </div>
  )
}

export default App