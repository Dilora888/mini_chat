import { useQuery } from '@tanstack/react-query'
import { fetchMe } from '../../api/User'
import { Loader } from '../Loader'
import { AuthForm } from '../AuthForm'
import { PostForm } from '../PostForm'
import { queryClient } from '../../api/queryClient'

const Account = () => {
  const meQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["users", "me"] 
    },queryClient)

    switch(meQuery.status){
        case "pending":
            return <Loader/>;
            case "error":
        return <AuthForm/> ;
        case "success":
            return <PostForm/>
    }
 
}

export default Account