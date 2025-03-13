import React , {useState , createContext , useEffect} from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {

    const [userData , setUserData] = useState({
        fullName : '',
        email : '',
        phone : '',
        gender : '',
        plan : ''
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }, []);

  return (
    <UserDataContext.Provider value={{userData , setUserData , isAuthenticated , setIsAuthenticated}}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext