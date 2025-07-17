import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { UserView } from "./UserView";
import { FC } from "react";

interface FetchUserViewProps {
  userId: string;
}
const FetchUserView: FC<FetchUserViewProps> = ({ userId }) => {
  const userQuery = useQuery(
    {
      queryFn: () => fetchUser(userId),
      queryKey: ["users", userId],
    },
    queryClient
  );

  switch (userQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <UserView user={userQuery.data} />;
      case "error":
        return <div>
            <span>Произошла ошибка :(</span>
            <button onClick={() => userQuery.refetch()}>Попробовать заново</button>
        </div>
  }
  return <div></div>;
};

export default FetchUserView;
