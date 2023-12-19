import { useState } from "react"
import axios from "axios"
import {useForm} from 'react-hook-form'

export default function UserCard({id, currMonthTimings, nextMonthTimings, feesPaidOn, toPay, name, age}){
    const [newDetails, setnewDetails] = useState({'id':id,'name':name, 'age':age})
    const {handleSubmit, register} = useForm()
    

    function editUser(){
        // console.log(newDetails)
        axios.post("https://yoga-bacend.vercel.app/editUser", newDetails)
        setTimeout(() => {
        window.location.reload()      
        }, 700);
    }

    function deleteUser(){
        axios.post("https://yoga-bacend.vercel.app/deleteUser", {'id':id})
        setTimeout(() => {
        window.location.reload()      
        }, 700);
    }

    function completePayment(){
        axios.post("https://yoga-bacend.vercel.app/completePayment", {'id':id, 'currMonthTimings':currMonthTimings, 'nextMonthTimings':nextMonthTimings})
        setTimeout(() => {
        window.location.reload()      
        }, 700);
    }

    function changeBatch(data){
        data = {...data, id:id}
        axios.post("https://yoga-bacend.vercel.app/changeBatch", data)
        setTimeout(() => {
        window.location.reload()      
        }, 700);
    }
    
    return(
        <div  key={id} className="my-5">

            
            <div className='flex items-center justify-around w-full'>
                
                {/* id */}
                <div className='w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>{id}</div>

                {/* name */}
                <input onChange={(e)=>{setnewDetails({...newDetails, 'name':e.target.value})}} className='bg-light-grey outline-none w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300' defaultValue={
                    name.length<25
                    ?
                    name
                    :
                    name.slice(0, 24)+"..."
                }/>
                
                {/* age */}
                <input onChange={(e)=>{setnewDetails({...newDetails, 'age':e.target.value})}} className='bg-light-grey outline-none w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300' defaultValue={age}/>
                
                {/* fees paid on */}
                <div className='w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>{feesPaidOn}</div>

                <div className={'w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300 font-bold'}>
                    {
                        toPay===1
                        ?
                        <div className="text-red-600">Fees Pending</div>
                        :
                        <div className="text-green-700">Fees Paid</div>
                    }
                </div>

            </div>
            
            {/* a random line */}
            <div className='flex justify-center items-center'>                            
                <div className='w-full bg-black h-[0.5px] m-1'></div>
            </div>

            <div className="flex items-center justify-center gap-3 my-5 ">
                <div className="flex justify-center items-center gap-3 mt-2">
                    <div>Current Batch:</div>
                    <input disabled type='text' value={currMonthTimings} className='bg-light-grey text-slate-500 outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[10rem] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input>
                </div>
                {/* {currMonthTimings} */}
                <div className="flex justify-center items-center gap-3 mt-2">
                    <div>Succeeding Batch:</div>
                    <select required {...register('nextMonthTimings')} defaultValue={nextMonthTimings} placeholder='Enter batch' className='bg-light-grey outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[10rem] text-center text-lg h-[3rem] ease-in-out duration-300'>
                        <option className='w-[10rem] h-[3rem]' value=""></option>
                        <option className='w-[10rem] h-[3rem]' value="6-7AM">6-7AM</option>
                        <option className='w-[10rem] h-[3rem]' value="7-8AM">7-8AM</option>
                        <option className='w-[10rem] h-[3rem]' value="8-9AM">8-9AM</option>
                        <option className='w-[10rem] h-[3rem]' value="5-6PM">5-6PM</option>
                    </select>
                </div>

                <button onClick={handleSubmit(changeBatch)} className="py-1 mt-2 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Change</button>
            </div>

            <div className="flex items-center justify-center gap-3 mt-2 ">
                {/* <button  className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Issue</button>
                <button  className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Return</button> */}
                <button onClick={completePayment} className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Pay Fees</button>
                <button onClick={editUser} className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Modify</button>
                <button onClick={deleteUser} className="py-1 flex items-center hover:scale-105 bg-red-600 text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Delete</button>
            </div>

        

        </div>
    )
}