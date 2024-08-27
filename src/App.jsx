import { useState } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { theme } from '@chakra-ui/react'

import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage'
import SitePage from './pages/SitePage'
import AdventurePage from './pages/AdventurePage';
import UserPage from './pages/UserPage';

import Navbar from './components/pageComponents/NavBar'
import NoNavBar from './components/pageComponents/NoNavBar'
import { getUser, signOutUser } from './service/users'


function App() {
  // const [user, setUser] = useState(getUser);
  //dummy user
  const [user, setUser] = useState({ name: "Dummy User", email: "dummy@example.com" });

  async function handleSignOut() {
    await signOutUser(); 
    setUser(null);
    window.location.reload(true)
  }

  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/signin"; 

  return (
    <>
      <ChakraProvider theme={theme}>
        <main className='App'>
        <>
        {!isSignInPage && !isSignUpPage && 
        (user ? <Navbar handleSignOut={handleSignOut} /> : <NoNavBar />)}
          <Routes>
            {/* Non-protected Routes */}
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/signin" element={<SignInPage />}/>

            {/* Protected Routes */}
            {user && (
            <>
            {/* <Navbar /> */}
            <Route path="/home" element={<HomePage />}/>
            <Route path="/map" element={<MapPage/>}/>
            <Route path="/site" element={<SitePage/>}/>
            <Route path="/site/:id" element={<SitePage/>}/> 
            <Route path="/adventure" element={<AdventurePage/>}/> 
            <Route path="/user" element={<UserPage/>}/> 
            </>)}

            {/* Redirect to signup
            {!user && (
              <>
              <Route path="/home" element={<Navigate to="/signin"/>} />
              <Route path="/map" element={<Navigate to="/signin"/>} />
              <Route path="/site" element={<Navigate to="/signin"/>} /> 
              <Route path="/adventure" element={<Navigate to="/signin"/>} /> 
              <Route path="/user" element={<Navigate to="/signin"/>} /> 
              </>)} */}

          </Routes>
        </>
        </main>
      </ChakraProvider>
    </>
  )
}

export default App
