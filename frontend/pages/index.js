import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Layout from './components/Layout'
import { useRouter } from 'next/router'

import moment from 'moment'
import Lottie from 'react-lottie'
import login from '../public/lottie/login.json'
import { isEmpty } from 'lodash'

import ChartsSection from './components/chartsSection'
import BudgetChart from './components/chats/BudgetChart'
import {
	addExpense,
	getExpenses,
	addBudget,
	getBudget,
	updateBudget,
	updateUserProfile,
	getLatestExpenses,
	updateExpenseFor,
} from '../api/services'
import { useForm } from 'react-hook-form'

export default function Home() {
	const router = useRouter()

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: login,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}

	useEffect(() => {
		getExpenseRecords()
		getBudgetRecords()
		getNLatestExpenses(3)
	}, [])

	const [expenseRecords, setExpenseRecords] = useState([])
	const [budgetRecords, setBudgetRecords] = useState([])
	const [latestExpenses, setLatestExpenses] = useState([])

	const [expenseRecord, setExpenseRecord] = useState(null)
	const [chartMenu, setChartMenu] = useState('Monthly')

	const inputRef = useRef()

	const getExpenseRecords = async () => {
		let data = await getExpenses(
			{ monthYear: moment().format('MM/YYYY') },
			'/month'
		)
		let total = 0

		if (!isEmpty(data?.expenses)) {
			let expenses = data['expenses']
			total = expenses.reduce((prev, curr) => (prev += parseInt(curr.value)), 0)
		} else {
			total = 0
		}

		setExpenseRecords(data?.expenses)
		setExpenses(total)
	}

	const getBudgetRecords = async () => {
		let data = await getBudget()
		let total = 0

		if (!isEmpty(data?.budget)) {
			let budget = data['budget']
			total = budget.reduce((prev, curr) => (prev += parseInt(curr.value)), 0)
		} else {
			total = 0
		}

		setBudgetRecords(data?.budget)
		setBudget(total)
	}

	const getNLatestExpenses = async (n) => {
		let data = await getLatestExpenses({ dummy: 'data' }, n)
		setLatestExpenses(data?.expenses)
	}

	const getExpensesFor = async (n) => {
		let data = await getExpenses(
			{ dayMonthYear: moment(inputRef?.current?.value).format('DD/MM/YYYY') },
			'/day'
		)
		console.log(data)
		setExpenseRecord(data?.expenses)
	}

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const {
		register: register2,
		formState: { errors: errors2 },
		handleSubmit: handleSubmit2,
	} = useForm()

	const {
		register: register3,
		formState: { errors: errors3 },
		handleSubmit: handleSubmit3,
	} = useForm()

	const {
		register: register4,
		formState: { errors: errors4 },
		handleSubmit: handleSubmit4,
	} = useForm()

	const expenseSubmit = (data) => {
		addExpense(data)
		setExpensesForm(false)
		getExpenseRecords()
	}

	const budgetSubmit = (data) => {
		addBudget(data)
		getBudgetRecords()
		setBudgetForm(false)
	}

	const updateBudgetModification = (data) => {
		updateBudget(data)
		getBudgetRecords()
	}

	const updateExpense = (data) => {
		updateExpenseFor({
			...data,
			date: moment(
				inputRef?.current?.value ? inputRef?.current?.value : ''
			).format('DD/MM/YYYY'),
		})
		getExpenseRecords()
		setExpenseRecord(null)
	}

	const updateProfileDetails = (data) => {
		updateUserProfile(data, router)
	}

	const [menu, setMenu] = useState('Expenses')

	const [budget, setBudget] = useState(0)
	const [expenses, setExpenses] = useState(0)
	const [expensesForm, setExpensesForm] = useState(false)
	const [budgetForm, setBudgetForm] = useState(false)
	const [addingExpense, setaddingExpense] = useState(false)
	return (
		<>
			<Head>
				<title>Wallet Check - Single Source for your budget needs</title>
				<meta name='description' content='Developed by <Name>' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<section className='overflow-hidden '>
					<div className='absolute -z-10  w-60 h-60 rounded-xl bg-accent opacity-30 top-52 -left-16 transform rotate-45 hidden md:block'></div>
					<div className='absolute -z-10  w-48 h-48 rounded-xl bg-accent opacity-30 -bottom-6 right-10 transform rotate-12 hidden md:block'></div>

					<div className='w-40 h-40 absolute -z-10  bg-accent opacity-30 rounded-full top-32 right-12 hidden md:block' />
					<div className='w-20 h-40 absolute -z-10  bg-accent opacity-30 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block'></div>

					<div className='min-h-screen max-w-screen-2xl z-0 m-auto'>
						<div className='w-full flex justify-center mt-5 '>
							<ul className='menu items-stretch px-3 shadow-lg bg-base-100 horizontal rounded-box overflow-x-auto whitespace-nowrap"'>
								<li
									className={menu === 'Expenses' ? 'bordered' : ''}
									onClick={() => {
										setMenu('Expenses')
									}}>
									<a>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6 mr-2'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
											/>
										</svg>{' '}
										Expenses
									</a>
								</li>
								<li
									className={menu === 'Charts' ? 'bordered' : ''}
									onClick={() => {
										getExpenseRecords()
										setMenu('Charts')
									}}>
									<a>
										{' '}
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6 mr-2'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
											/>
										</svg>{' '}
										Charts
									</a>
								</li>
								<li
									className={menu === 'Modification' ? 'bordered' : ''}
									onClick={() => {
										setMenu('Modification')
									}}>
									<a>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6 mr-2'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
											/>
										</svg>{' '}
										Modification
									</a>
								</li>
								<li
									className={menu === 'Notifications' ? 'bordered' : ''}
									onClick={() => {
										setMenu('Notifications')
									}}>
									<a>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6 mr-2'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
											/>
										</svg>{' '}
										Notifications
									</a>
								</li>
							</ul>
						</div>

						<div className='card  mt-8 flex-shrink-0 w-full shadow-2xl bg-base-100'>
							{menu === 'Expenses' && (
								<div className='card-body'>
									<div className='border stats border-base-300 flex flex-wrap md:flex-nowrap  '>
										<div className='stat'>
											<div className='stat-title'>Budget (Monthly)</div>
											<div className='stat-value'>${budget}</div>
											{!budget && (
												<div className='stat-actions'>
													<button
														className='btn btn-sm btn-secondary'
														onClick={() => {
															setBudgetForm(true)
														}}>
														Update Budget
													</button>
												</div>
											)}
										</div>

										<div className='stat'>
											<div className='stat-title'>Expenses (Monthly)</div>
											<div className='stat-value'>${expenses}</div>
											<div className='stat-actions flex justify-between items-center'>
												<button
													className='btn btn-sm btn-success'
													onClick={() => {
														setExpensesForm(true)
													}}>
													Add Expenses
												</button>
												<div className='flex'>
													<input
														type='date'
														{...register('date', { required: true })}
														className='input input-bordered'
														defaultValue={moment().format('YYYY-MM-DD')}
													/>
													{errors.date?.type === 'required' && (
														<span className='badge badge-error'>Required</span>
													)}
												</div>
											</div>
										</div>
									</div>
									{expensesForm && (
										<>
											<div className='divider'></div>
											<div className='card shadow-2xl lg:card-side '>
												<div className='card-body'>
													<form
														id='expensesForm'
														onSubmit={handleSubmit(expenseSubmit)}>
														<div className='flex flex-wrap gap-5 justify-center items-center'>
															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>Food </span>
																	{errors.food?.type === 'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register('food', { required: true })}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>
															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>
																		Entertainment{' '}
																	</span>
																	{errors.entertainment?.type ===
																		'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register('entertainment', {
																		required: true,
																	})}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>

															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>
																		Transportation{' '}
																	</span>
																	{errors.transportation?.type ===
																		'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register('transportation', {
																		required: true,
																	})}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>

															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>Clothing </span>
																	{errors.clothing?.type === 'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register('clothing', { required: true })}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>

															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>Medical </span>
																	{errors.medical?.type === 'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register('medical', { required: true })}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>

															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>Other </span>
																	{errors.other?.type === 'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register('other', { required: true })}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>
														</div>
														<div className='form-control mt-6'>
															<button
																type='submit'
																className={`btn btn-sm  btn-primary ${
																	addingExpense ? 'loading' : ''
																}`}>
																Update Expenses
															</button>
														</div>
													</form>
												</div>
											</div>
										</>
									)}

									{budgetForm && (
										<>
											<div className='divider'></div>
											<div className='card shadow-2xl lg:card-side '>
												<div className='card-body'>
													<form
														id='budgetForm'
														onSubmit={handleSubmit3(budgetSubmit)}>
														<div className='flex flex-wrap gap-5 justify-center items-center'>
															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>Food </span>
																	{errors.food3?.type === 'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register3('food', { required: true })}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>
															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>
																		Entertainment{' '}
																	</span>
																	{errors3.entertainment?.type ===
																		'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register3('entertainment', {
																		required: true,
																	})}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>

															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>
																		Transportation{' '}
																	</span>
																	{errors3.transportation?.type ===
																		'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register3('transportation', {
																		required: true,
																	})}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>

															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>Clothing </span>
																	{errors3.clothing?.type === 'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register3('clothing', { required: true })}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>

															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>Medical </span>
																	{errors3.medical?.type === 'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register3('medical', { required: true })}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>

															<div className='form-control'>
																<label className='label flex justify-between items-center flex-wrap'>
																	<span className='label-text'>Other </span>
																	{errors3.other?.type === 'required' && (
																		<div className='badge badge-error'>
																			Required
																		</div>
																	)}
																</label>
																<input
																	type='number'
																	min='0'
																	{...register3('other', { required: true })}
																	placeholder='Amount ($)'
																	className='input input-bordered'
																/>
															</div>
														</div>
														<div className='form-control mt-6'>
															<button
																type='submit'
																className={`btn btn-sm  btn-secondary ${
																	addingExpense ? 'loading' : ''
																}`}>
																Update BUdget
															</button>
														</div>
													</form>
												</div>
											</div>
										</>
									)}
								</div>
							)}

							{menu === 'Charts' && (
								<div className='card-body'>
									<div className='w-full flex justify-center mt-5'>
										<ul className='menu items-stretch px-3 shadow-lg bg-base-100 horizontal rounded-box'>
											<li
												className={chartMenu === 'Monthly' ? 'bordered' : ''}
												onClick={() => {
													setChartMenu('Monthly')
												}}>
												<a>Monthly Budget Tracking</a>
											</li>
											<li
												className={chartMenu === 'Historic' ? 'bordered' : ''}
												onClick={() => {
													setChartMenu('Historic')
												}}>
												<a> Historic Data</a>
											</li>
										</ul>
									</div>

									{chartMenu === 'Historic' && (
										<ChartsSection monthlyData={expenseRecords} />
									)}
									{chartMenu === 'Monthly' && (
										<BudgetChart
											budgetRecords={budgetRecords}
											expenseRecords={expenseRecords}
										/>
									)}
								</div>
							)}

							{menu === 'Modification' && (
								<>
									<div className='card-body gap-2'>
										<div className='collapse collapse-arrow glass w-full border rounded-box '>
											<input type='checkbox' />
											<div className='collapse-title text-xl font-medium'>
												<div className='stat-value flex flex-wrap gap-2 justify-between items-center'>
													Profile Update{' '}
													<div className='badge badge-success mr-10'>
														{' '}
														<label className='label font-medium flex justify-between items-center flex-wrap'>
															<span className='label-text'>
																* You will be logged out of the application
																after successfull profile update
															</span>
														</label>
													</div>
												</div>
											</div>
											<div className='collapse-content'>
												<div className='stat-actions'>
													<form
														id='profileUpdate'
														onSubmit={handleSubmit2(updateProfileDetails)}>
														<div className='form-control'>
															<label className='label flex justify-between items-center flex-wrap'>
																<span className='label-text'>Email</span>
																{errors2.email?.type === 'required' && (
																	<div className='badge badge-error'>
																		Required
																	</div>
																)}
															</label>
															<input
																type='email'
																{...register2('email')}
																placeholder={
																	JSON.parse(sessionStorage.getItem('user'))
																		.email
																}
																className='input input-bordered'
															/>
														</div>

														<div className='form-control'>
															<label className='label flex justify-between items-center flex-wrap'>
																<span className='label-text'>Contact</span>
																{errors2.contact?.type === 'required' && (
																	<div className='badge badge-error'>
																		Required
																	</div>
																)}
																{errors2.contact?.message && (
																	<div className='badge badge-error'>
																		{errors2.contact.message}
																	</div>
																)}
															</label>
															<input
																type='number'
																min='0'
																{...register2('contact', {
																	maxLength: {
																		value: 10,
																		message:
																			'contact should be a 10 Digit Number',
																	},
																})}
																placeholder={
																	JSON.parse(sessionStorage.getItem('user'))
																		.contact
																}
																className='input input-bordered'
															/>
														</div>

														<div className='form-control'>
															<label className='label flex justify-between items-center flex-wrap'>
																<span className='label-text'>New Password</span>
																{errors2.password?.type === 'required' && (
																	<div className='badge badge-error'>
																		Required
																	</div>
																)}
															</label>
															<input
																type='password'
																{...register2('password')}
																placeholder='Enter new password'
																className='input input-bordered'
															/>
														</div>

														<div className='form-control mt-6'>
															<button
																type='submit'
																className={`btn w-1/2 btn-primary`}>
																Update Profile
															</button>
														</div>
													</form>
												</div>
											</div>
										</div>
										<div className='collapse collapse-arrow glass w-full border rounded-box '>
											<input type='checkbox' />
											<div className='collapse-title text-xl font-medium'>
												<div className='stat-value flex flex-wrap gap-2 justify-between items-center'>
													Update Budget{' '}
													<div className='badge badge-success mr-10'>
														{' '}
														<label className='label font-medium flex justify-between items-center flex-wrap'>
															<span className='label-text'>
																* Budget Update can only be done for the current
																month
															</span>
														</label>
													</div>
												</div>
											</div>
											<div className='collapse-content'>
												<div className='stat-actions'>
													{budgetRecords.length > 0 ? (
														<form
															id='updateBudget'
															onSubmit={handleSubmit(updateBudgetModification)}>
															<div className='flex flex-wrap gap-2 justify-center items-center'>
																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>Food </span>
																		{errors.food?.type === 'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			budgetRecords ? budgetRecords[0].value : 0
																		}
																		{...register('food', { required: true })}
																		className='input input-bordered'
																	/>
																</div>
																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>
																			Entertainment{' '}
																		</span>
																		{errors.entertainment?.type ===
																			'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			budgetRecords?.[1]
																				? budgetRecords[1].value
																				: 0
																		}
																		{...register('entertainment', {
																			required: true,
																		})}
																		className='input input-bordered'
																	/>
																</div>

																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>
																			Transportation{' '}
																		</span>
																		{errors.transportation?.type ===
																			'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			budgetRecords?.[3]
																				? budgetRecords[3].value
																				: 0
																		}
																		{...register('transportation', {
																			required: true,
																		})}
																		className='input input-bordered'
																	/>
																</div>

																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>
																			Clothing{' '}
																		</span>
																		{errors.clothing?.type === 'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			budgetRecords?.[2]
																				? budgetRecords[2].value
																				: 0
																		}
																		{...register('clothing', {
																			required: true,
																		})}
																		className='input input-bordered'
																	/>
																</div>

																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>Medical </span>
																		{errors.medical?.type === 'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			budgetRecords?.[4]
																				? budgetRecords[4].value
																				: 0
																		}
																		{...register('medical', { required: true })}
																		className='input input-bordered'
																	/>
																</div>

																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>Other </span>
																		{errors.other?.type === 'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			budgetRecords?.[5]
																				? budgetRecords[5].value
																				: 0
																		}
																		{...register('other', { required: true })}
																		className='input input-bordered'
																	/>
																</div>
															</div>
															<div className='form-control mt-6'>
																<button
																	type='submit'
																	className={`btn  w-1/2 btn-secondary ${
																		addingExpense ? 'loading' : ''
																	}`}>
																	Update Budget
																</button>
															</div>
														</form>
													) : (
														<h5 className='my-5 text-large text-center font-bold'>
															! ⚠ Please add a Budget First{' '}
														</h5>
													)}
												</div>
											</div>
										</div>

										<div className='collapse collapse-arrow glass w-full border rounded-box '>
											<input type='checkbox' />
											<div className='collapse-title text-xl font-medium'>
												<div className='stat-value flex flex-wrap gap-2 justify-between items-center'>
													Update Expenses{' '}
													<div className='badge badge-success mr-10'>
														{' '}
														<label className='label font-medium flex justify-between items-center flex-wrap'>
															<span className='label-text'>
																* Please select a date and fetch expenses to
																update
															</span>
														</label>
													</div>
												</div>
											</div>
											<div className='collapse-content'>
												<div className='stat-actions flex justify-between items-center'>
													<div className='flex'>
														<input
															type='date'
															ref={inputRef}
															className='input input-bordered'
															defaultValue={moment().format('YYYY-MM-DD')}
														/>
														{errors.date?.type === 'required' && (
															<span className='badge badge-error'>
																Required
															</span>
														)}
													</div>
													<button
														className='btn ml-2 btn-outline btn-primary btn-square'
														onClick={async () => {
															setExpenseRecord(null)
															getExpensesFor()
														}}>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															className='inline-block w-6 h-6 stroke-current'
															fill='none'
															viewBox='0 0 24 24'
															stroke='currentColor'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
															/>
														</svg>
													</button>
												</div>
												{expenseRecord ? (
													<div className='stat-actions'>
														<form
															id='updateBudget'
															onSubmit={handleSubmit4(updateExpense)}>
															<div className='flex flex-wrap gap-2 justify-center items-center'>
																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>Food </span>
																		{errors4.food?.type === 'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			expenseRecord ? expenseRecord['food'] : 0
																		}
																		{...register4('food', { required: true })}
																		className='input input-bordered'
																	/>
																</div>
																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>
																			Entertainment{' '}
																		</span>
																		{errors4.entertainment?.type ===
																			'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			expenseRecord
																				? expenseRecord['entertainment']
																				: 0
																		}
																		{...register4('entertainment', {
																			required: true,
																		})}
																		className='input input-bordered'
																	/>
																</div>

																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>
																			Transportation{' '}
																		</span>
																		{errors4.transportation?.type ===
																			'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			expenseRecord
																				? expenseRecord['transportation']
																				: 0
																		}
																		{...register4('transportation', {
																			required: true,
																		})}
																		className='input input-bordered'
																	/>
																</div>

																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>
																			Clothing{' '}
																		</span>
																		{errors4.clothing?.type === 'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			expenseRecord
																				? expenseRecord['clothing']
																				: 0
																		}
																		{...register4('clothing', {
																			required: true,
																		})}
																		className='input input-bordered'
																	/>
																</div>

																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>Medical </span>
																		{errors4.medical?.type === 'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			expenseRecord
																				? expenseRecord['medical']
																				: 0
																		}
																		{...register4('medical', {
																			required: true,
																		})}
																		className='input input-bordered'
																	/>
																</div>

																<div className='form-control flex-grow'>
																	<label className='label flex justify-between items-center flex-wrap'>
																		<span className='label-text'>Other </span>
																		{errors4.other?.type === 'required' && (
																			<div className='badge badge-error'>
																				Required
																			</div>
																		)}
																	</label>
																	<input
																		type='number'
																		min='0'
																		placeholder={
																			expenseRecord ? expenseRecord['other'] : 0
																		}
																		{...register4('other', { required: true })}
																		className='input input-bordered'
																	/>
																</div>
															</div>
															<div className='form-control flex-grow'>
																<button
																	type='submit'
																	className={`btn h-full btn-accent mt-6 ${
																		addingExpense ? 'loading' : ''
																	}`}>
																	Update
																</button>
															</div>
														</form>
													</div>
												) : null}
											</div>
										</div>
									</div>
								</>
							)}

{menu === 'Notifications' && (
								<div className='card-body'>
									<div className='border stats border-base-300 flex flex-wrap md:flex-nowrap  '>
										<div className='stat'>
											<div className='stat-title'>Notifications</div>
											<div className='stat-value'>⚠ This section is currently being worked upon</div>
											
										</div>
									</div>

								</div>
							)}

						</div>

						<div className='card  mt-8 flex-shrink-0 w-full shadow-2xl bg-base-100'>
							<div className='card-body'>
								<h5 className='my-5 text-large text-center font-bold'>
									Recent Expenses ($)
								</h5>
								<div className='overflow-x-auto'>
									<table className='table w-full'>
										<thead>
											<tr>
												<th>Date</th>
												<th>Food</th>
												<th>Entertainment</th>
												<th>Travel</th>
												<th>Clothing</th>
												<th>Medical</th>
												<th>Other</th>
											</tr>
										</thead>
										<tbody>
											{latestExpenses.map((k, i) => {
												return (
													<tr key={i}>
														<th>{k.date}</th>
														<td>{k.food}</td>
														<td>{k.entertainment}</td>
														<td>{k.transportation}</td>
														<td>{k.clothing}</td>
														<td>{k.medical}</td>
														<td>{k.other}</td>
													</tr>
												)
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}
