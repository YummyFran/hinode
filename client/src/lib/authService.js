

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function signUp({ name, email, password }) {
    try {
        const res = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role: 'user' })
        })
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || "Signup failed")

        console.log(data)
        return [data, null]
    } catch(err) {
        console.err(err)
        return [null, err]
    }
}

export async function login({ email, password }) {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()

        return [data, null]
    } catch(err) {
        console.err(err)
        return [null, err]
    }
}

export async function getAuthUser(jwt) {
    try {
        const res = await fetch(`${API_URL}/user`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${jwt}` }
        })
        const data = await res.json()
        
        return data
    } catch(err) {
        console.log(err)
        return {
            success: false
        }
    }
}

export async function logout(jwt) {
    try {
        console.log("logging out..")
        const res = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${jwt}` }
        })

        if(!res.ok) {
            throw new Error("Logout failed")
        }

        const data = res.json()
        console.log(data)
        return data
    } catch(err) {
        console.error("Logout error: ", err)
        return false
    }
}