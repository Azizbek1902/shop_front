import { useState, useEffect } from "react"
import {BiArrowBack} from 'react-icons/bi'
import { useNavigate } from "react-router-dom"
export default () =>{
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(()=>{
        function Demo(){
            let order = JSON.parse(localStorage.getItem('order'))
            setData([order])
        }
        Demo()
    },[])

    return(
        <div className="orderOne">
            <div className="wrapOne">
            <h1 className="cursor-pointer" onClick={()=>navigate("/dashboard")}>
                <BiArrowBack />
            </h1>
                {
                    data.map((item)=>{
                        return(
                            <h1>OrderId: {item.orderId}</h1>
                        )
                    })
                }
            </div>
        </div>
    )
}

