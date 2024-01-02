import { useEffect, useState } from "react"
import RequestDetails from '../components/RequestDetails'

const Requests =() =>{
    const [requests,setRequests] = useState(null)


    useEffect(() => {
        const fetchRequests = async() => {
            const response = await fetch('/getRequests')
            const json = await response.json()

            if (response.ok){
                setRequests(json)
            }
        }

        fetchRequests()
    }, [])
return(
    <div className="Requests">
        <div className="requests">
            {requests && requests.map((request) => (
                <RequestDetails key={request._id} request={request}/>
))}
        </div>
    </div>
    )
}

export default Requests