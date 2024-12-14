import { useEffect, useState } from "react"

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    website: string,
    company: {
        name: string
    }
}
export default function useUsers() {

    const API = 'https://jsonplaceholder.typicode.com/users'

    const [user, setUser] = useState<User[]>([])
    const [error, setError] = useState(false)




    useEffect(() => {
        if (user.length == 0) {
            getUsers()
        }
        console.log(user)
        localStorage.setItem("ListOfUsers", JSON.stringify(user))
    }, [user])
    function getUsers() {
        fetch(API)
            .then(async (response) => {
                if (!response.ok) {
                    setError(true)
                    throw new Error("response not ok")
                }
                setError(false)
                return response.json()
            })

            .then((data) => {
                setUser(data)
                console.log(data)

            })

            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(true)
            })

    }


    return [user, error]
}