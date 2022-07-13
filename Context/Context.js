
import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

export function useInfo() {
    return useContext(AppContext)
}

export default function ContextProvider({ children }) {

    const [familiesArr, setFamiliesArr] = useState([])
    const [contactsArr, setContactsArr] = useState([])
    const [usersArr, setUsersArr] = useState([])

    useEffect(() => {
        fetch("/api/family")
            .then((res) => res.json())
            .then((families) => {
                setFamiliesArr(families)
            });
    }, [])

    useEffect(() => {
        fetch('/api/contact').then((res) => res.json()).then((contacts) => {
            setContactsArr(contacts)
        });
    }, [])

    useEffect(() => {
        fetch('/api/user').then((res) => res.json()).then((users) => {
            setUsersArr(users)
        })
    }, [])

    return (
        <AppContext.Provider value={{
            familiesArr: familiesArr,
            contactsArr: contactsArr,
            usersArr: usersArr,
        }}>
            {children}
        </AppContext.Provider>

    )
}



