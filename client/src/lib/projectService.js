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

export async function updateProject({ title, description, projectId }) {
    try {
        const res = await fetch(`${API_URL}/project/${projectId}`, {
            method: "PUT",
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

export async function addMember({ email, projectId }) {
    try {
        const res = await fetch(`${API_URL}/project/${projectId}/member`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
        const data = res.json()

        return data
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: err.message
        }
    }
}

export async function removeMember({ userId, projectId}) {
    try {
        const res = await fetch(`${API_URL}/project/${projectId}/member/${userId}`, {
            method: "DELETE",
            credentials: 'include'
        })
        const data = await res.json()
        
        return data
    } catch(err) {
        console.error(err)
        return {
            success: false,
            message: err.message
        }
    }
}

export async function deleteProject({ projectId }) {
    try {
        const res = await fetch(`${API_URL}/project/${projectId}`, {
            method: "DELETE",
            credentials: "include"
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

export async function addList({ title, project_id }) {
    try {
        const res = await fetch(`${API_URL}/project/${project_id}/list`, {
            method: "POST",
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title })
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

export async function updateList({ title, project_id, list_id }) {
    try {
        const res = await fetch(`${API_URL}/project/${project_id}/list/${list_id}`, {
            method: "PUT",
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title })
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

export async function deleteList({ projectId, listId }) {
    try {
        const res = await fetch(`${API_URL}/project/${projectId}/list/${listId}`, {
            method: "DELETE",
            credentials: 'include'
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

export async function addCard({ title, description, list_id }, token) {
    try {
        const res = await fetch(`${API_URL}/list/${list_id}/card`, {
            method: "POST",
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
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

export async function moveCard({ cardId, listId }) {
    try {
        const res = await fetch(`${API_URL}/cards/${cardId}/move`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ listId })
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

export async function updateCard({ title, description, cardId }) {
    try {
        const res = await fetch(`${API_URL}/cards/${cardId}`, {
            method: "PUT",
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

export async function deleteCard({ cardId }) {
    try {
        const res = await fetch(`${API_URL}/cards/${cardId}`, {
            method: "DELETE",
            credentials: 'include'
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