import axios from 'axios';
import moment from 'moment'
import { route } from 'next/dist/server/router';

const baseUrl  = "api/";
import { toast } from 'react-toastify';


const register = async (data,router)=>{

  try {
    let result = await axios.post(`${baseUrl}register`,data)
    if (result?.data?.status == 10) {
      toast.success(`Thanks for Registring ${result?.data?.name} we have sent a confirmation mail at ${result?.data?.email}`);
      router.push('/login');
    }
    else{
      toast.warning(`User already exists, try again with diffrent Email Id`);
    }
    return result
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}


const login = async (data,router)=>{

  try {
    let result = await axios.post(`${baseUrl}login`,data)
    if (result?.data?.status == 10) {
      console.log(result)
      toast.success(`👋 Hi, ${result?.data?.name} Welcome Back`);
      sessionStorage.setItem('user', JSON.stringify(result?.data));
      sessionStorage.setItem('auth_token', JSON.stringify(result?.data?.token));
      router.push('/');
    }
    else{
      toast.warning(`Incorrect UserId/Password`);
    }
    return result
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}

const generateOtp = async (data,router)=>{

  try {
    let result = await axios.post(`${baseUrl}otp`,data)
    if (result?.data?.status == 10) {
      toast.success(`OTP is sent at ${result?.data?.email}`);
    }
    else if (result?.data?.status == 13) {
      toast.warn(`Invalid User Email`);
    }
    else{
      toast.error(`Could not send OTP, please try again later`);
    }
    
    return result
  } catch (error) {
    toast.error("Netwok Error");
  }
  
}



const addExpense = async (data)=>{

  let postData = {...data,date:moment(data.date).format("DD/MM/YYYY")}
  try {
    let result = await axios.post(`${baseUrl}addExpense`,postData,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      }
    })
    if (result?.data?.status == 10) {
      let total = 0 + parseInt(data['food']) +parseInt(data['entertainment']) +parseInt(data['clothing']) +parseInt(data['transportation']) +parseInt(data['medical']) +parseInt(data['other'])
      toast.success(`Total Expenses : ${total}$ Added for ${moment(data.date).format("LL")}`);
    }
    else if (result?.data?.status == 13) {
      toast.warning(`Expenses for ${moment(data.date).format("LL")} have already been added, please use the modify TAB to edit expenses`,);
    }
    else{
      toast.warning(`Couldnt add expenses, please try again later`);
    }
    return result
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}


const getExpenses = async (data,route)=>{

  try {
    let result = await axios.post(`${baseUrl}getExpenses${route ? route : ""}`,data,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      }
    })
    if (result?.data?.status == 10) {
      if (result?.data?.expenses == "") {
        toast.warning(`No Expense Record Found`);
      }
      return result.data
    }
    
    else{
      toast.warning(`Couldnt get updated expenses, please try again later`);
    }
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}

const getLatestExpenses = async (data,number)=>{

  try {
    let result = await axios.post(`${baseUrl}getLatestExpenses/${number ? number : ""}`,data,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      }
    })
    if (result?.data?.status == 10) {
      return result.data
    }
    else{
    }
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}


const updateUserProfile = async (data,router)=>{

  try {
    let result = await axios.post(`${baseUrl}updateUserProfile`,data,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      }
    })
    if (result?.data?.status == 10) {
      toast.success(`User profile updated sucessfully, please login with the new updated credentials.`);
      sessionStorage.clear()
      router.push('/');
      return result.data
    }
    if (result?.data?.status == 13) {
      toast.error(`Email Exists with other user`);
      return result.data
    }
    else{
      toast.warning(`Couldnt get updated profile, please try again later`);
    }
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}


const getBudget = async ()=>{

  let data={
    'month-year':moment().format("MM/YYYY")
  }
  try {
    let result = await axios.post(`${baseUrl}getMonthlyBudget`,data,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      }
    })
    if (result?.data?.status == 10) {
      return result.data
    }
    else{
      toast.warning(`Couldnt get updated expenses, please try again later`);
    }
    return result.data
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}


const addBudget = async (data)=>{

  try {
    let result = await axios.post(`${baseUrl}addMonthlyBudget`,data,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      }
    })
    if (result?.data?.status == 10) {
      toast.success(`Budget added for this month`);
      return result
    }
    else{
      toast.warning(`Budget already exists`);
    }
    return result
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}

const updateBudget = async (data)=>{

  try {
    let result = await axios.post(`${baseUrl}updateMonthlyBudget`,data,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      }
    })
    if (result?.data?.status == 10) {
      toast.success(`Budget update for this month`);
      return result
    }
    else{
      toast.warning(`Couldn't update budget, please try again later`);
    }
    return result
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}

const updateExpenseFor = async (data)=>{

  try {
    if(data.date){
      let result = await axios.post(`${baseUrl}updateExpenseFor`,data,{
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
        }
      })
     
      if (result?.data?.status == 10) {
        toast.success(`Expenses updated for ${data.date}`);
        return result
      }
      else{
        toast.warning(`Couldn't update expenses, please try again later`);
      }
    }
    else{
      toast.warning(`Couldn't update expenses, please try again later`);
    }
    
    return result
  } catch (error) {
    toast.error("Netwok/Technical Error, Please try again later. If you face this problem repeatedly please raise a support ticket.");
  }
  
}

const updatePass = async (data,router)=>{

  try {
    let result = await axios.post(`${baseUrl}updatePass`,data)
    if (result?.data?.status == 10) {
      toast.success(`Password has been reset, please log in with the new password ${result?.data?.email}`);
      router.push("/login")
      return result
    }
    else if (result?.data?.status == 13) {
      toast.warn(`No user found with this email ID : ${result?.data?.email}`);
    }
    else if (result?.data?.status == 14) {
      toast.error(`Invalid OTP ! Please Retry with correct OTP.`);
    }
    else{
      toast.warning(`Couldn't update budget, please try again later`);
    }

  
    return result
  } catch (error) {
    toast.error("Netwok Error");
  }
  
}


export {register,generateOtp,updatePass,login,addExpense,getExpenses,addBudget,getBudget,updateBudget,updateUserProfile,getLatestExpenses,updateExpenseFor}