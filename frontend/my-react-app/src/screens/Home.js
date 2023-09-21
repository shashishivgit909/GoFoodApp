import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Crousel from '../components/Crousel'
export default function Homepage() {
  return (
    <div>
      <div> <Navbar /> </div>
      <div> <Crousel /></div>

      <div className="m-3">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div> <Footer /> </div>
    </div>
  )
}
