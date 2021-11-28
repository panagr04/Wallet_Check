import {useState} from "react"
import Head from 'next/head'
import Layout from './components/Layout'
import Link from "next/link"

import Lottie from 'react-lottie';
import loginAnimation from '../public/lottie/login.json'
import {login} from "../api/services"
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

export default function Home() {

	const router = useRouter()

	const defaultOptions = {
		loop: true,
		autoplay: true, 
		animationData: loginAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
		let result = login(data,router)
	}

	const [passwordToggle, setpasswordToggle] = useState(false)
	return (
		<>
			<Head>
				<title>Wallet Check - Single Source for your budget needs</title>
				<meta name='description' content='Developed by <Name>' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
			<section className="overflow-hidden">
			<div className="absolute -z-10  w-60 h-60 rounded-xl bg-accent opacity-30 top-52 -left-16 transform rotate-45 hidden md:block"></div>
  <div className="absolute -z-10  w-48 h-48 rounded-xl bg-accent opacity-30 -bottom-6 right-10 transform rotate-12 hidden md:block"></div>

  <div className="w-40 h-40 absolute -z-10  bg-accent opacity-30 rounded-full top-32 right-12 hidden md:block" />
  <div className="w-20 h-40 absolute -z-10  bg-accent opacity-30 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>

			<div className="hero min-h-screen bg-base-100">
  <div className="flex-col justify-around hero-content lg:flex-row w-full">

    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
		<div className='relative h-36 bg-primary rounded-bl-4xl'>
		<div className=" absolute top-5 px-5 w-full flex flex-wrap justify-between">
		<h1 className=" mb-5 text-5xl font-bold text-neutral-content">Login</h1>
		<Link passHref href="/register" className="btn btn-secondary  z-10">
			<button className="btn btn-secondary  z-10">
		Signup
			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
</button>
</Link > 

		</div>

									<svg
										className='absolute bottom-0'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 1440 320'>
										<path
											fill='hsla(var(--b1))'
											fillOpacity={1}
											d='M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
										/>
									</svg>
									<svg
										width='100%'
										height={130}
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<g
											clipPath='url(#prefix__a)'
											stroke='#fff'
											strokeWidth={0.5}
											strokeMiterlimit={10}
											style={{
												mixBlendMode: 'overlay',
											}}>
											<path d='M269.428.185c11.813 41.392 45.921 68.306 61.736 106.356 12.766 30.44 4.382 65.336-10.671 99.488-9.908 22.459-20.007 43.062-24.199 62.18-4.192 18.562-5.526 36.937-3.239 56.612 4.573 37.308-2.668 73.502-11.242 109.511-11.242 47.517-31.44 93.92-12.957 142.922' />
											<path d='M254.565.185c11.814 41.206 47.636 67.563 64.594 105.242 13.719 30.441 5.145 65.336-9.908 99.674-9.908 22.459-20.007 43.248-24.58 62.18-4.382 18.561-5.907 37.123-4.001 56.798 3.81 37.308-3.43 73.688-12.005 109.882-11.242 47.702-31.82 94.105-14.862 143.293' />
											<path d='M239.512.186c11.814 41.205 49.16 66.634 67.262 104.128 14.481 30.255 6.097 65.335-9.146 99.674-9.908 22.459-20.198 43.433-24.771 62.365-4.573 18.562-6.288 37.308-4.763 56.798 3.049 37.308-4.192 73.688-12.767 110.068-11.242 47.702-32.392 94.476-16.577 143.664' />
											<path d='M224.65 0c12.004 41.206 50.875 65.707 69.929 103.015 15.434 30.254 6.86 65.521-8.193 99.859-9.908 22.459-20.388 43.433-24.961 62.366-4.573 18.747-6.669 37.308-5.526 56.983 2.287 37.493-4.954 73.873-13.528 110.439-11.242 47.888-32.774 94.848-18.292 144.221' />
											<path d='M209.788 0c12.004 41.02 52.589 64.778 72.787 101.901 16.387 30.069 7.812 65.521-7.431 100.045-9.908 22.645-20.388 43.619-25.342 62.551-4.764 18.747-7.05 37.494-6.288 57.169 1.524 37.493-5.526 74.059-14.291 110.625-11.433 48.073-33.345 95.033-20.198 144.592' />
											<path d='M194.735 0c12.004 41.02 54.305 63.85 75.455 100.787 17.149 30.069 8.574 65.707-6.669 100.231-9.908 22.645-20.579 43.804-25.533 62.551-4.954 18.747-7.431 37.679-7.05 57.354.762 37.494-6.288 74.245-15.053 110.996-11.432 48.26-33.726 95.405-21.912 144.964' />
											<path d='M179.872 0c12.195 41.02 56.02 63.108 78.123 99.674 18.102 29.884 9.337 65.707-5.907 100.416-9.908 22.645-20.769 43.805-25.723 62.737-5.145 18.933-8.003 37.865-7.812 57.354.19 37.494-7.051 74.431-15.815 111.182-11.433 48.445-34.298 95.776-23.628 145.334' />
											<path d='M164.82 0c12.194 40.835 57.734 62.18 80.98 98.746 19.055 29.883 10.29 65.706-4.954 100.601-9.908 22.645-20.769 43.99-25.914 62.737-5.144 18.933-8.193 37.865-8.574 57.54-.762 37.679-7.812 74.616-16.577 111.553-11.433 48.63-34.679 96.147-25.343 145.706' />
											<path d='M149.957 0c12.195 40.835 59.259 61.252 83.649 97.632 19.816 29.698 11.051 65.892-4.192 100.787-9.909 22.645-20.96 44.176-26.295 62.923-5.335 19.118-8.575 38.05-9.337 57.725-1.524 37.68-8.574 74.616-17.339 111.739-11.433 48.816-35.06 96.333-27.248 146.262' />
											<path d='M134.904 0c12.195 40.835 60.974 60.324 86.316 96.518 20.769 29.698 12.004 65.893-3.43 100.973-9.908 22.645-21.15 44.176-26.485 62.923-5.526 19.118-8.955 38.236-10.099 57.725-2.286 37.679-9.336 74.802-18.101 112.11-11.433 49.002-35.632 96.704-28.963 146.634' />
											<path d='M120.042 0c12.385 40.649 62.689 59.396 89.174 95.404 21.722 29.513 12.767 65.893-2.477 101.159-9.908 22.83-21.15 44.361-26.676 63.108-5.716 19.118-9.336 38.236-10.861 57.911-3.048 37.68-10.099 74.988-18.864 112.296-11.432 49.187-36.012 97.075-30.677 147.005' />
											<path d='M105.179 0c12.386 40.649 64.404 58.468 91.842 94.29 22.484 29.328 13.529 66.079-1.715 101.345-9.908 22.83-21.341 44.547-26.866 63.108-5.717 19.304-9.718 38.422-11.623 58.097-3.811 37.865-10.861 75.173-19.626 112.667-11.623 49.372-36.584 97.26-32.583 147.376' />
											<path d='M90.127 0c12.385 40.649 66.118 57.725 94.509 93.177 23.437 29.327 14.481 66.078-.953 101.53-9.908 22.83-21.531 44.547-27.247 63.294-5.907 19.304-10.099 38.607-12.386 58.282-4.573 37.865-11.623 75.359-20.388 112.852-11.623 49.559-36.965 97.632-34.297 147.933' />
											<path d='M75.265 0c12.575 40.464 67.833 56.798 97.367 92.064 24.389 29.141 15.243 66.078-.191 101.53-9.908 22.83-21.531 44.732-27.438 63.294-6.097 19.303-10.48 38.792-13.147 58.282-5.526 37.865-12.195 75.358-21.15 113.223-11.624 49.559-37.537 98.003-36.013 148.304' />
											<path d='M60.402 0c12.576 40.464 69.548 55.87 100.035 90.95 25.152 29.141 16.006 66.264.762 101.716-9.908 22.83-21.722 44.732-27.628 63.479-6.288 19.489-10.861 38.793-13.91 58.468-6.288 37.865-12.957 75.544-21.912 113.409-11.624 49.744-37.919 98.189-37.919 148.675' />
											<path d='M45.35 0c12.575 40.463 71.262 54.941 102.702 90.022 26.104 28.955 16.958 66.263 1.524 101.901-9.908 23.016-21.912 44.918-28.01 63.479-6.478 19.49-11.242 38.979-14.671 58.654-7.05 38.05-13.72 75.729-22.675 113.78-11.623 49.93-38.49 98.56-39.633 149.047' />
											<path d='M30.487 0c12.576 40.278 72.978 54.013 105.561 88.908 27.057 28.77 17.72 66.449 2.286 102.087-9.908 23.016-21.912 45.104-28.2 63.665-6.479 19.489-11.433 39.164-15.434 58.653-7.812 38.051-14.481 75.916-23.437 113.966-11.623 50.115-38.87 98.931-41.348 149.604' />
											<path d='M15.434 0C28.2 40.278 90.127 53.085 123.662 87.795c28.01 28.77 18.674 66.449 3.24 102.272-9.909 23.016-22.103 45.104-28.391 63.851-6.67 19.674-11.814 39.164-16.197 58.839-8.574 38.05-15.243 76.101-24.198 114.337-11.623 50.301-39.443 99.117-43.254 149.974' />
											<path d='M.572 0c12.766 40.278 76.217 52.157 110.896 86.68 47.254 46.961-8.194 118.607-24.58 166.309C66.88 310.9 58.497 368.44 44.968 426.537 33.345 477.023 5.145 526.025 0 576.883' />
										</g>
										<defs>
											<clipPath id='prefix__a'>
												<path
													fill='#fff'
													transform='matrix(0 -1 -1 0 552.032 577.439)'
													d='M0 0h577.44v552.032H0z'
												/>
											</clipPath>
										</defs>
									</svg>
								</div>
      <div className="card-body">
			<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-control">
          <label className="label flex justify-between items-center flex-wrap">
            <span className="label-text">Email </span>
						{errors.email?.type === 'required' && <div className="badge badge-error">Required</div>}
          </label>
          <input
            type="email"
						{...register("email",{ required: true})}
            placeholder="J******e@mail.com"
            className="input input-bordered"
          />
        </div>
				<div className="form-control">
          <label className="label flex justify-between items-center flex-wrap">
            <span className="label-text">Password  </span>
						{errors.password?.type === 'required' && <div className="badge badge-error">Required</div>}
          </label>
					<div className="flex gap-2 justify-between items-center">
          <input
            type={passwordToggle ? "text":"password"}
						{...register("password",{ required: true})}
            placeholder="sa*******ds"
            className="input input-bordered flex-grow"
          />
					<span className="btn btn-circle btn-sm" onClick={()=>{setpasswordToggle(!passwordToggle)}}>
					{passwordToggle ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
</svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>}
</span>
					</div>

						<Link passHref href="/recovery">
					<div className="alert alert-info mt-5 cursor-pointer">
				
  <div className="flex-1" >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 mx-2 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>Forgot Password ?</span>
  </div>
</div>
		</Link>
        </div>
				<div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary"
          >Login 
						</button>
        </div>
      
			</form>
			</div>
    </div>
		<div className="text-center lg:text-right ">
      <h1 className="mb-5 text-3xl font-bold">👋 Hi, Welcome Back</h1>
			<div className="w-full">
      <Lottie options={defaultOptions}
              height={400}
              width={400}/>
			</div>
			</div>
  </div>
</div>

	</section>
			</Layout>
		</>
	)
}
