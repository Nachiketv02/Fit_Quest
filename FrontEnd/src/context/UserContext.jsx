import React , {useState , createContext} from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {

    const [userData , setUserData] = useState({
        fullName : '',
        email : '',
        phone : '',
        gender : ''
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserDataContext.Provider value={{userData , setUserData , isAuthenticated , setIsAuthenticated}}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext