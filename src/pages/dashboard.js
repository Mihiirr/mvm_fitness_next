import { Context } from '@/context/authContext'
import React, { useContext } from 'react'

const dashboard = () => {
    const { state } = useContext(Context)
    console.log({ state })
    return (
        <div>dashboard</div>
    )
}

export default dashboard