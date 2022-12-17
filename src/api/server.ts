
/* need to reference API key here somehow 

create a function to pull all recipes down for browsing,

create a function to pull recipes by whats entered into the Search

create a function to show recipes saved by that specific user  */
/*my_url = deadpan-bow-hole.glitch.me/recipes*/


let api_key='b1066b15dd1249baa4090d25032a25b3'

let token = '2da43eeffd76c072aa9c1a3fc222c882cea491638a1c9a45'

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://deadpan-bow-hole.glitch.me/api/recipes`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://deadpan-bow-hole.glitch.me/api/recipes`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://deadpan-bow-hole.glitch.me/api/recipes/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async(id:string) => {
        const response = await fetch(`https://deadpan-bow-hole.glitch.me/api/recipes/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    },

    recipeSearch: async() => {
        const result = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${api_key}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );

        if (!result.ok){
            throw new Error('Failed to fetch data from server')
        }

        let Data = await result.json()
        return Data
    }

}









