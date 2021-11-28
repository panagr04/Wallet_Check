import React from "react"
import Header from "./Header"


export default function Layout({ children }) {
	return (
		<>
			<Header />
			<div className="mx-5"> 
			{children}
			</div>
		</>
	)
}
