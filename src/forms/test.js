import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'

export const Test = () => {

    useEffect(() => {
        const token = Cookies.get('token')
        axios({
            method: "get",
            url: `http://localhost:5001/api/assigned-course/64a983f6ea07003579ec2682/students`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
    })

    // const dataQuery = useQuery({
    //     queryKey: ['myData'],
    //     queryFn: async () => {
    //         try {
    //             const token = cookies.get('token');
    //             const res = await axios({
    //                 method: 'get',
    //                 // url: `${process.env.REACT_APP_SERVERURL}/mycourses`,
    //                 // url: `${process.env.REACT_APP_SERVERURL}/myData`,
    //                 url: 'http://localhost:5001/api/myData',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             })
    //             console.log(res);
    //             return res;
    //             // setData(prev => ({
    //             //     ...prev,
    //             //     firstName: res.data.details.firstName,
    //             //     lastName: res.data.details.lastName,
    //             //     email: res.data.details.email,
    //             //     phoneNumber: res.data.details.phoneNumber,
    //             //     userType: res.data.details.userType,
    //             // }))
    //         } catch (err) {
    //             console.log(err);
    //             if (err && err instanceof Error && !AxiosError) {
    //                 alert(err.response?.data.msg);
    //             } else if (err && err instanceof AxiosError) {
    //                 // err.response?.data ? alert(err.response?.data) : alert(err.message)
    //                 alert(err.message)
    //             } else {
    //                 alert('Error')
    //             }
    //             return err;
    //         }
    
    //     }
    // })
    
    // console.log(dataQuery.data, 'out')
    
    // if (dataQuery.isError) return <pre>{JSON.stringify(dataQuery.error)}</pre>

    return (
        <div>test</div>
    )
}





// import {
//     QueryClient,
//     QueryClientProvider,
//     useQuery,
//   } from '@tanstack/react-query'
  
  
//   export function Example() {
//     const { isLoading, error, data } = useQuery({
//       queryKey: ['repoData'],
//       queryFn: () =>
//         fetch('https://api.github.com/repos/TanStack/query').then(
//           (res) => res.json(),
//         ),
//     })
//     console.log('fds')
  
//     if (isLoading) return 'Loading...'
  
//     if (error) return 'An error has occurred: ' + error.message
  
//     return (
//       <div>
//         <h1>{data.name}</h1>
//         <p>{data.description}</p>
//         <strong>👀 {data.subscribers_count}</strong>{' '}
//         <strong>✨ {data.stargazers_count}</strong>{' '}
//         <strong>🍴 {data.forks_count}</strong>
//       </div>
//     )
//   }