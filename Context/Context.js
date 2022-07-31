
import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

export function useInfo() {
    return useContext(AppContext)
}

export default function ContextProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false)
    const [familiesArr, setFamiliesArr] = useState([])
    const [volunteersArr, setVolunteersArr] = useState([])
    const [contactsArr, setContactsArr] = useState([])
    const [usersArr, setUsersArr] = useState([])
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        fetch('api/photo')
            .then((res) => res.json())
            .then((photos) => {
                setPhotos(photos)
            });
    }, [])

    useEffect(() => {
        fetch("/api/family")
            .then((res) => res.json())
            .then((families) => {
                setFamiliesArr(families)
            });
    }, [])

    useEffect(() => {
        fetch("/api/volunteer")
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
            photos: photos,
            setPhotos: setPhotos,
            usersArr: usersArr,
            setUsersArr: setUsersArr,
            volunteersArr: volunteersArr,
            setVolunteersArr: setVolunteersArr,
            familiesArr: familiesArr,
            setFamiliesArr: setFamiliesArr,
            contactsArr: contactsArr,
            usersArr: usersArr,
        }}>
            {children}
        </AppContext.Provider>
    )
}



