import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {deleteData, getData} from "../../../api/APIMethods";
import {GetAllResI, GetOneResI} from "../../../shared/types/APITypes";
import Session from "../../../shared/types/entities/Session";

const useSessionsAPIs = () => {
  const navigate = useNavigate();
  // GET_ALL_SESSIONS
  async function getAllSessions(pageParam: number, limit: number) {
    const res = await getData<GetAllResI<Session>>("/game-sessions", {
      params: {
        page: pageParam,
        limit,
      },
    });
    return res;
  }

  // GET_SESSION
  async function getSession(id: string) {
    const res = await getData<GetOneResI<Session>>(`/game-sessions/${id}`);
    return res;
  }

  // DELETE_SESSION
  async function deleteSession(id: string) {
    const res = await deleteData(`/game-sessions/${id}`);
    if (res.status === 204) {
      enqueueSnackbar("Successfully deleted", {variant: "success"});
      navigate("/sessions");
    }
  }

  // DELETE_ALL_SESSIONS
  async function deleteAllSessions() {
    const res = await deleteData(`/game-sessions`);
    if (res.status === 204)
      enqueueSnackbar("Successfully deleted all sessions", {
        variant: "success",
      });
  }

  return {
    getAllSessions,
    getSession,
    deleteSession,
    deleteAllSessions,
  };
};

export default useSessionsAPIs;
