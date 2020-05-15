import React, { useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setInviteRoomId } from "../../redux/reducers/user";

const Invite = ({ match }) => {
  const dispatch = useDispatch();

  // Если попадаем в этот компонет, диспатчим айди комнаты, в которую пригласили, по нему потом
  // перебросит сразу в комнату
  useEffect(() => {
    dispatch(setInviteRoomId(match.params.roomId));
  }, []);

  return <Redirect to="/login" />;
};

export default withRouter(Invite);
