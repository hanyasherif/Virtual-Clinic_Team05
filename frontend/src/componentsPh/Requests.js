import { useEffect, useState } from "react"
import RequestDetails from './RequestDetails'
import React from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const Requests = () => {
    const [requests, setRequests] = useState(null)

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch('/getRequests')
            const json = await response.json()

            if (response.ok) {
                setRequests(json)
            }
        }

        fetchRequests()
    }, [])

    return (
        <div className="Requests">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Request ID</TableCell>
                            <TableCell>Request Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests && requests.map((request) => (
                            <TableRow key={request._id}>
                                <TableCell>{request._id}</TableCell>
                                <TableCell>
                                    <RequestDetails request={request} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Requests