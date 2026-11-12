import {createContext, useState} from 'react'


export const MembersContext = createContext(null);

export function MembersContextProvider({children})
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
            });
    }
    return( 
        <MembersContext.Provider value={{Members , loadMembers}}>
            {children}
        </MembersContext.Provider>
    )
}
