import {useState,useEffect} from 'react'

import moment from 'moment'
import HistoricChart from "./chats/HistoricChart"
import {getExpenses} from "../../api/services"

export default function HistoricCharts({monthlyData}) {


  const getWeeklyData = async (date)=>{
    let datFormat = moment(date).format("DD/MM/YYYY")
    let data = await getExpenses({'dayMonthYear':datFormat},"/week")
    setWeeknlyRecords(data.expenses)
    setDay(datFormat)
  }
  const getMonthlyData = async (date)=>{
    let datFormat = moment(date).format("MM/YYYY")
    let data = await getExpenses({'monthYear':datFormat},"/month")
    setMonthRecords(data.expenses)
    setMonth(datFormat)
  }
  const getYearlyData = async (date)=>{
    let datFormat = moment(date).format("YYYY")
    let data = await getExpenses({'year':datFormat},"/year")
    setYearRecords(data.expenses)
    setYear(datFormat)
  }

  const [menu, setMenu] = useState('Weekly')

  const [year, setYear] = useState(moment().format("YYYY"))
  const [month, setMonth] = useState(moment().format("MM"))
  const [day, setDay] = useState(moment().format("DD/MM/YYYY"))

  const [yearRecords, setYearRecords] = useState([])
  const [monthRecords, setMonthRecords] = useState([])
  const [weeklyRecords, setWeeknlyRecords] = useState([])

  
  const [title, setTitle] = useState("")
  
  useEffect(() => {
    getWeeklyData()
    monthlyData ? setMonthRecords(monthlyData) : getMonthlyData()
    getYearlyData()

  }, [])


	return (<>
    <div className='w-full flex justify-center mt-5'>
    <ul className='menu items-stretch px-3 shadow-lg bg-base-100 horizontal rounded-box'>
      <li
        className={menu === 'Weekly' ? 'bordered' : ''}
        onClick={() => {
          setMenu('Weekly')
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
          Weekly
        </a>
      </li>
      <li
        className={menu === 'Monthly' ? 'bordered' : ''}
        onClick={() => {
          setMenu('Monthly')
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
          Monthly
        </a>
      </li>
      <li
        className={menu === 'Yearly' ? 'bordered' : ''}
        onClick={() => {
          setMenu('Yearly')
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
          Yearly
        </a>
      </li>
    </ul>
  </div>

  {
    menu === "Weekly" && (weeklyRecords ?<> <h5 className="my-5 text-large text-center font-bold">Expense Analysis for Week {moment(day,'DD/MM/YYYY').format("W of Y")} </h5> <HistoricChart data={weeklyRecords}/> </>: <h1 className="mb-5 text-3xl font-bold">⚠ Oops!<br/> You have no expense records for this Week.</h1>)
  }
  {
    menu === "Monthly" && (weeklyRecords ?<> <h5 className="my-5 text-large text-center font-bold">Expense Analysis for Month {moment(month,'MM/YYYY').format("MMMM, YYYY")}</h5> <HistoricChart data={monthRecords}/> </>: <h1 className="mb-5 text-3xl font-bold">⚠ Oops!<br/> You have no expense records for this Month.</h1>)
  }
  {
    menu === "Yearly" && (yearRecords ?<> <h5 className="my-5 text-large text-center font-bold">Expense Analysis for Year {moment(year,'YYYY').format('YYYY')}</h5> <HistoricChart data={yearRecords}/> </>: <h1 className="mb-5 text-3xl font-bold">⚠ Oops!<br/> You have no expense records for this Yonth.</h1>)
  }

    	<div className='flex w-full justify-between items-center flex-wrap'>
															<button
																type='submit'
																className={`btn btn-sm  btn-primary`}
                                onClick={()=>{
                                  menu === 'Weekly' && getWeeklyData(moment(day,'DD/MM/YYYY').subtract(1,'w'))
                                  menu === 'Monthly' && getMonthlyData(moment(month,'MM/YYYY').subtract(1,'m'))
                                  menu === 'Yearly' && getYearlyData(moment(year,'YYYY').subtract(1, 'y'))
                                }}
                                >
																Previous {menu.slice(0,-2)}
															</button>
														
                            
															<button
																type='submit'
																className={`btn btn-sm  btn-primary`}
                                onClick={()=>{
                                  menu === 'Weekly' && getWeeklyData(moment(day,'DD/MM/YYYY').add(1,'w'))
                                  menu === 'Monthly' && getMonthlyData(moment(month,'MM/YYYY').add(1,'m'))
                                  menu === 'Yearly' && getYearlyData(moment(year,'YYYY').add(1, 'y'))
                                }}
                                >
																Next {menu.slice(0,-2)}
															</button>
														
  </div>
  </>
	)
}
