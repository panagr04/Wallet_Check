import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
	const router = useRouter()
	const [theme, setTheme] = useState(localStorage.getItem('theme'))

	return (
		<header>
			<nav className=' mt-6 mb-2 shadow-lg rounded-box mx-5 text-base-content'>
				<div className='mx-auto '>
					<div className='bg-base-200 lg:card-side text-base-content rounded-lg'>
						<div className='flex justify-between items-center p-2 px-8'>
							<div
								style={{
									fontFamily: 'Montserrat,sans-serif',
									fontWeight: 'bold',
								}}>
								<Link href='/' passHref className=' active'>
									<div className='text-xl md:text-3xl flex items-center justify-center gap-6 text-primary'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-12 w-12'
											fill='none'
											viewBox='0 0 24 24'
											stroke='hsla(var(--p))'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
											/>
										</svg>
										<div>
											<span className='lowercase '>Wallet</span>
											<span className='uppercase text-base-content'>Check</span>
										</div>
									</div>
								</Link>
							</div>
							{/* <div data-tip='Changelog' className='tooltip tooltip-bottom'>
									<span className='hidden lg:inline xl:ml-2'>v</span>
									&nbsp;1.0.0
								</div> */}

							<div className='flex items-center'>
								<div title='Change Theme' className='dropdown dropdown-end'>
									<div tabIndex={0} className='m-1 normal-case btn-ghost btn'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											className='inline-block w-6 h-6 stroke-current md:mr-2'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
											/>
										</svg>{' '}
										<span className='hidden md:inline'>Change Theme</span>{' '}
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 1792 1792'
											className='inline-block w-4 h-4 ml-1 fill-current'>
											<path d='M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z' />
										</svg>
									</div>{' '}
									<div className='mt-16 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-52 rounded-b-box bg-base-200 text-base-content'>
										<ul className='p-4 menu compact'>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'light')
														setTheme('light')
														document.documentElement.setAttribute(
															'data-theme',
															'light'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'light'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🌝  light
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'dark')
														setTheme('dark')
														document.documentElement.setAttribute(
															'data-theme',
															'dark'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'dark'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🌚  dark
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'cupcake')
														setTheme('cupcake')
														document.documentElement.setAttribute(
															'data-theme',
															'cupcake'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'cupcake'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🧁  cupcake
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'bumblebee')
														setTheme('bumblebee')
														document.documentElement.setAttribute(
															'data-theme',
															'bumblebee'
														)
													}}
													className={
														theme &&
														localStorage.getItem('theme') === 'bumblebee'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🐝  bumblebee
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'emerald')
														setTheme('emerald')
														document.documentElement.setAttribute(
															'data-theme',
															'emerald'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'emerald'
															? 'active'
															: ''
													}
													tabIndex={0}>
													✳️  Emerald
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'corporate')
														setTheme('corporate')
														document.documentElement.setAttribute(
															'data-theme',
															'corporate'
														)
													}}
													className={
														theme &&
														localStorage.getItem('theme') === 'corporate'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🏢  Corporate
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'synthwave')
														setTheme('synthwave')
														document.documentElement.setAttribute(
															'data-theme',
															'synthwave'
														)
													}}
													className={
														theme &&
														localStorage.getItem('theme') === 'synthwave'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🌃  synthwave
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'retro')
														setTheme('retro')
														document.documentElement.setAttribute(
															'data-theme',
															'retro'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'retro'
															? 'active'
															: ''
													}
													tabIndex={0}>
													👴  retro
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'cyberpunk')
														setTheme('cyberpunk')
														document.documentElement.setAttribute(
															'data-theme',
															'cyberpunk'
														)
													}}
													className={
														theme &&
														localStorage.getItem('theme') === 'cyberpunk'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🤖  cyberpunk
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'valentine')
														setTheme('valentine')
														document.documentElement.setAttribute(
															'data-theme',
															'valentine'
														)
													}}
													className={
														theme &&
														localStorage.getItem('theme') === 'valentine'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🌸  valentine
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'halloween')
														setTheme('halloween')
														document.documentElement.setAttribute(
															'data-theme',
															'halloween'
														)
													}}
													className={
														theme &&
														localStorage.getItem('theme') === 'halloween'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🎃  halloween
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'garden')
														setTheme('garden')
														document.documentElement.setAttribute(
															'data-theme',
															'garden'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'garden'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🌷  garden
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'forest')
														setTheme('forest')
														document.documentElement.setAttribute(
															'data-theme',
															'forest'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'forest'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🌲  forest
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'aqua')
														setTheme('aqua')
														document.documentElement.setAttribute(
															'data-theme',
															'aqua'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'aqua'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🐟  aqua
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'lofi')
														setTheme('lofi')
														document.documentElement.setAttribute(
															'data-theme',
															'lofi'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'lofi'
															? 'active'
															: ''
													}
													tabIndex={0}>
													👓  lofi
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'pastel')
														setTheme('pastel')
														document.documentElement.setAttribute(
															'data-theme',
															'pastel'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'pastel'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🖍  pastel
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'fantasy')
														setTheme('fantasy')
														document.documentElement.setAttribute(
															'data-theme',
															'fantasy'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'fantasy'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🧚‍♀️  fantasy
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'wireframe')
														setTheme('wireframe')
														document.documentElement.setAttribute(
															'data-theme',
															'wireframe'
														)
													}}
													className={
														theme &&
														localStorage.getItem('theme') === 'wireframe'
															? 'active'
															: ''
													}
													tabIndex={0}>
													📝  Wireframe
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'black')
														setTheme('black')
														document.documentElement.setAttribute(
															'data-theme',
															'black'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'black'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🏴  black
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'luxury')
														setTheme('luxury')
														document.documentElement.setAttribute(
															'data-theme',
															'luxury'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'luxury'
															? 'active'
															: ''
													}
													tabIndex={0}>
													💎  luxury
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'dracula')
														setTheme('dracula')
														document.documentElement.setAttribute(
															'data-theme',
															'dracula'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'dracula'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🧛‍♂️  dracula
												</a>
											</li>
											<li>
												<a
													onClick={(e) => {
														e.preventDefault()
														localStorage.setItem('theme', 'cmyk')
														setTheme('cmyk')
														document.documentElement.setAttribute(
															'data-theme',
															'cmyk'
														)
													}}
													className={
														theme && localStorage.getItem('theme') === 'cmyk'
															? 'active'
															: ''
													}
													tabIndex={0}>
													🖨  CMYK
												</a>
											</li>
										</ul>
									</div>
								</div>
								{sessionStorage.getItem('auth_token') && (
									<button
										className='btn btn-accent z-10'
										onClick={() => {
											sessionStorage.clear()
											router.push({
												pathname: '/login',
											})
										}}>
										<span className="hidden sm:inline-flex" >Logout</span>

										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}
