const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function addProject({ title, description = "" }) {
    try {
        const res = await fetch(`${API_URL}/project`, {
            method: "POST",
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description })
        })
        const data = await res.json()

        return data
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}

export async function getProjects() {
    try {
        const res = await fetch(`${API_URL}/project`, {
            method: "GET",
            credentials: "include",
        })
        const data = await res.json()

        return data
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}

export async function getProjectById(id, token) {
    try {
        const res = await fetch(`${API_URL}/project/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()

        return data
    } catch (err) {
        console.log(err)
        return {
            success: false
        }
    }
}