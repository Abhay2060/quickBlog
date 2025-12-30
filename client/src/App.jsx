import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import Comments from './pages/admin/Comments'
import ListBlog from './pages/admin/ListBlog'
import Layout from './pages/admin/Layout'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css' 
import SignUp from './components/admin/singUp'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const {isAdmin} = useAppContext()

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/admin' element={isAdmin ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='listBlog' element={<ListBlog/>}/>
          <Route path='comments' element={<Comments/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App