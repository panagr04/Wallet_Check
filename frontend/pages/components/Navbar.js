import React from 'react'
import Link from 'next/link'
export default function Header() {
	return (
		<header>
			<div className='mx-auto space-x-1 navbar max-w-none'>
				<div
					className='flex items-center flex-none'
					style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 'bold' }}>
					<Link href='/' passHref className='px-2 flex-0 btn btn-ghost md:px-4 active'>
						<div className='inline-block text-3xl text-primary'>

							<span className='lowercase'>ABC</span>
							<span className='uppercase text-base-content'>UI</span>
						</div>
					</Link>
				</div>{' '}
				<div data-tip='Changelog' className='tooltip tooltip-bottom'>
					<span className='hidden lg:inline xl:ml-2'>v</span>
					&nbsp;1.0.0
				</div>
				<div className='flex-1' />{' '}
				<div className='items-center flex-none hidden lg:block'>
					<a
						href='/components/button'
						className='normal-case btn btn-ghost drawer-button'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							className='inline-block w-6 h-6 fill-current md:mr-2'>
							<path d='M6.5,22 C4.01471863,22 2,19.9852814 2,17.5 C2,15.0147186 4.01471863,13 6.5,13 C8.98528137,13 11,15.0147186 11,17.5 C11,19.9852814 8.98528137,22 6.5,22 Z M17.5,22 C15.0147186,22 13,19.9852814 13,17.5 C13,15.0147186 15.0147186,13 17.5,13 C19.9852814,13 22,15.0147186 22,17.5 C22,19.9852814 19.9852814,22 17.5,22 Z M6.5,11 C4.01471863,11 2,8.98528137 2,6.5 C2,4.01471863 4.01471863,2 6.5,2 C8.98528137,2 11,4.01471863 11,6.5 C11,8.98528137 8.98528137,11 6.5,11 Z M17.5,11 C15.0147186,11 13,8.98528137 13,6.5 C13,4.01471863 15.0147186,2 17.5,2 C19.9852814,2 22,4.01471863 22,6.5 C22,8.98528137 19.9852814,11 17.5,11 Z M17.5,9 C18.8807119,9 20,7.88071187 20,6.5 C20,5.11928813 18.8807119,4 17.5,4 C16.1192881,4 15,5.11928813 15,6.5 C15,7.88071187 16.1192881,9 17.5,9 Z M6.5,9 C7.88071187,9 9,7.88071187 9,6.5 C9,5.11928813 7.88071187,4 6.5,4 C5.11928813,4 4,5.11928813 4,6.5 C4,7.88071187 5.11928813,9 6.5,9 Z M17.5,20 C18.8807119,20 20,18.8807119 20,17.5 C20,16.1192881 18.8807119,15 17.5,15 C16.1192881,15 15,16.1192881 15,17.5 C15,18.8807119 16.1192881,20 17.5,20 Z M6.5,20 C7.88071187,20 9,18.8807119 9,17.5 C9,16.1192881 7.88071187,15 6.5,15 C5.11928813,15 4,16.1192881 4,17.5 C4,18.8807119 5.11928813,20 6.5,20 Z' />
						</svg>
						Components
					</a>
				</div>{' '}
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
									tabIndex={0}
									data-set-theme='protecting'
									data-act-class='active'
									className='active'>
									Protecting
								</a>
							</li>
							<li>
								<a
									tabIndex={0}
									data-set-theme='investing'
									data-act-class='active'>
									Investing
								</a>
							</li>
							<li>
								<a
									tabIndex={0}
									data-set-theme='financing'
									data-act-class='active'>
									Financing
								</a>
							</li>
							<li>
								<a
									tabIndex={0}
									data-set-theme='advicing'
									data-act-class='active'>
									Advising
								</a>
							</li>
						</ul>
					</div>
				</div>{' '}
			</div>
		</header>
	)
}
