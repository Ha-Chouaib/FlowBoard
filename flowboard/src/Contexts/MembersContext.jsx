import {createContext} from 'react'

export let Members =[];

export const MembersContext = createContext(null);

export function MembersContextProvider({childern})
{
    
    function loadMembers()
    {
        fetch('https://flowboard-api-virid.vercel.app/members', {
        headers: {
          'X-Workspace': 'public'
        }
        }).then(response => response.json())
            .then((data)=>{
                Members = data;
            });
    }

    <MembersContext.Provider value={{Members , loadMembers}}>
        {childern}
    </MembersContext.Provider>
}
