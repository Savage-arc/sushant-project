import React from 'react'
import { Link } from 'react-router-dom'
const nav = () => {
  return (
    <div>
      <Link to ="/" className='pt-2 pb-2 p-3 m-2 bg-green-400 text-white rounded-sm capitalize'>home,</Link>
      <Link to="/about" className='pt-2 pb-2 p-3 m-2 bg-green-400 text-white rounded-sm capitalize'>about</Link>
      <Link to="/award" className='pt-2 pb-2 p-3 m-2 bg-green-400 text-white rounded-sm capitalize'>award</Link>
      <Link to="/ragister" className='pt-2 pb-2 p-3 m-2 bg-green-400 text-white rounded-sm capitalize'>ragister</Link>
      {/* <Link to="/display" className='pt-2 pb-2 p-3 m-2 bg-green-400 text-white rounded-sm capitalize'>DisplayBlock</Link> */}
      {/* <Link to="/loginuser" className='pt-2 pb-2 p-3 m-2 bg-green-400 text-white rounded-sm capitalize'>Login</Link>
      <Link to="/signupuser" className='pt-2 pb-2 p-3 m-2 bg-green-400 text-white rounded-sm capitalize'>Signup</Link> */}
    
    </div>
  )
}

export default nav
