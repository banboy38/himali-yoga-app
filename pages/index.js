import UserCard from '@/components/userCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useForm} from "react-hook-form"

export default function Home() {

  const [data, setData] = useState()

  const [toggleAdd, settoggleAdd] = useState(0)
  const {handleSubmit, register} = useForm()

  useEffect(() => {
    axios.get("https://yoga-bacend.vercel.app/getUsers")
    .then((res)=>{
      setData(res.data)
    })
  }, [])

  function addMember(data){
    data = {...data, nextMonthTimings:data.currMonthTimings}
    axios.post("https://yoga-bacend.vercel.app/enrollUser", data)
    
    setTimeout(() => {
      window.location.reload()      
    }, 700);
    
  }


  return (

    
    <div className=' flex flex-col justify-center items-center'>

      <div className='text-5xl flex items-center justify-center m-10 font-bold'>Yoga Classes</div>
      <div>
          {/* <div className='flex items-center justify-center'><input type='text' onChange={(e)=>{setsearchtext(e.target.value)}} placeholder='Search members by name' className='bg-light-grey outline-none focus:border-black border-light-grey  border-y-[1px] w-[50%] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input></div> */}
          <div className='flex items-center gap-3 justify-center mt-5'>
              {/* <button onClick={loadMemberData} className='bg-black text-white py-1 flex items-center hover:scale-105 justify-center w-[17rem] h-[2.5rem] rounded-lg ease-in-out duration-300'>Search</button>  */}
              <button onClick={()=>{settoggleAdd(1-toggleAdd)}} className='py-1 border-black border-[1px] flex items-center hover:scale-105 justify-center w-[17rem] h-[2.5rem] rounded-lg ease-in-out duration-300'>Add member</button>
          </div>
          {
              toggleAdd===1&&
              <form onSubmit={handleSubmit(addMember)} className=' flex items-center gap-3 mt-7 justify-center'>
                  <input required {...register('name')} type='text' placeholder='Enter name' className='bg-light-grey outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[10rem] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input> 
                  <input required {...register('age')} type='text' placeholder='Enter age' className='bg-light-grey outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[10rem] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input>
                  <select {...register('currMonthTimings')} placeholder='Enter batch' className='bg-light-grey outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[10rem] text-center text-lg h-[3rem] ease-in-out duration-300'>
                  <option className='w-[10rem] h-[3rem]' value="6-7AM"></option>
                    <option className='w-[10rem] h-[3rem]' value="6-7AM">6-7AM</option>
                    <option className='w-[10rem] h-[3rem]' value="7-8AM">7-8AM</option>
                    <option className='w-[10rem] h-[3rem]' value="8-9AM">8-9AM</option>
                    <option className='w-[10rem] h-[3rem]' value="5-6PM">5-6PM</option>
                  </select>

                  <button className="py-1 flexitems-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Add</button>
              </form>
          }
      </div>

      <div className='mt-10'>
        <div className='flex items-center justify-around w-full gap-3'>
          <div className='w-[17rem] font-bold h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>ID</div>
          <div className='w-[17rem] font-bold h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>Name</div>
          <div className='w-[17rem] font-bold h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>Age</div>
          <div className='w-[17rem] font-bold h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>Fees Paid On</div>
          <div className='w-[17rem] font-bold h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>Status</div>
        </div>

        <div className='flex justify-center items-center mb-10'>
          <div className='w-full bg-black h-[0.5px] m-1'></div>
        </div>
      

        { 
          data
          ?
          data.map((user)=>{
            return(
              <UserCard id={user.id} name={user.name} age={user.age} feesPaidOn={user.feesPaidOn} toPay={user.toPay} currMonthTimings={user.currMonthTimings} nextMonthTimings={user.nextMonthTimings}/>
            )
          })
          :
          <div className='font-bold text-lg flex justify-center items-center mt-10'>Loading...</div>
        }
      </div>
      
    </div>
  )
}
