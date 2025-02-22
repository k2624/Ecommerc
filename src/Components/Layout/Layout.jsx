import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {

	return <>

		<Navbar />

		<div className=" mt-4 py-12 backGround-light " >

			<Outlet></Outlet>
		</div>

		<Footer />

	</>
}
