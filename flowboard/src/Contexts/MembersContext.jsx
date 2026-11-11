import {createContext, useState} from 'react'


export const MembersContext = createContext(null);

export function MembersContextProvider({childern})
{
    const [Members , setMembers] = useState([]);
    
    function loadMembers()
    {
        fetch('https://flowboard-api-virid.vercel.app/members', {
        headers: {
          'X-Workspace': 'public'
        }
        }).then(response => response.json())
            .then((data)=>{
                setMembers(data);
                console.log("///")
            });
    }
    return( 
        <MembersContext.Provider value={{Members , loadMembers}}>
            {childern}
        </MembersContext.Provider>
    )
}
