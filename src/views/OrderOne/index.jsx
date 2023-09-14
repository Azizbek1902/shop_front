import { useState, useEffect } from "react"
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from "react-router-dom"
export default () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        function Demo() {
            let order = JSON.parse(localStorage.getItem('order'))
            setData([order])
        }
        Demo()
    }, [])

    return (
        <div className="orderOne">
            <div className="wrapOne">
                <h1 className="cursor-pointer display-inline inline-block bg-[red] p-4" onClick={() => navigate("/dashboard")}>
                    <BiArrowBack />
                </h1>
                <div className="ord">
                    {
                        data.map((item) => {
                            return (
                                <div className="polya">
                                    <table>
                                        <tr>
                                            <td>No</td>
                                            <td>Username</td>
                                            <td>Phone</td>
                                            <td>Address</td>
                                            <td>Total</td>
                                        </tr>
                                        <tr>
                                            <td>{item.orderId}</td>
                                            <td>{item.user.username}</td>
                                            <td>{item.user.phone}</td>
                                            <td>{item.user.address}</td>
                                            <td>{item.cartTotal} so'm</td>
                                        </tr>
                                    </table>
                                    <div className="pro">
                                        {
                                            item.items.map((doc)=>{
                                                return(
                                                    <h1 className="flex">
                                                        <img src={doc.media} alt="image" />
                                                        <div className="ol flex flex-col">
                                                            <h3>{doc.title}</h3> 
                                                            <h4>{doc.quantity} X {doc.price} = {doc.itemTotal} </h4>
                                                        </div>
                                                    </h1>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

