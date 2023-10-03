
import FormSearch from './../../components/forms/formSearch/FormSearch'
import { Navigate } from 'react-router-dom'

const Search = () => {
    if(!localStorage.getItem("token")){
        return <Navigate to="/authorization" />;
      } else
    return ( 
        <FormSearch />
     ); 
}
 
export default Search;