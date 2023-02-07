import {
  wsClose,
  wsError,
  wsGetMessage,
  wsOpen,
} from "../redux/slices/orders-feed";
import { AnyAction, Dispatch, Middleware } from "redux";
import { getCookie, shearBearerInToken } from "../utils/cookieHandler";

const ALL_ORDERS_URL = "norma.nomoreparties.space/orders/all";

export const socketMiddlwareCreator = (): Middleware<{}> => {
  return (store) => {
    let socket: WebSocket | null = null;
    // let socket = new WebSocket(
    //   `wss://${ALL_ORDERS_URL}?token=${shearBearerInToken(
    //     getCookie("accessToken")
    //   )}`
    // );
    const { dispatch, getState } = store;

    return (next: Dispatch) => (action: AnyAction) => {
      const { type } = action;

      const { user } = getState().user;
      if (type === "ordersFeed/wsInit") {
        socket = new WebSocket(
          `wss://${ALL_ORDERS_URL}?
          )}`
        );
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };
        socket.onerror = (event) => {
          dispatch(wsError(event));
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(wsGetMessage(restParsedData));
        };
        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(wsError(event.code.toString()));
          }
          dispatch(wsClose());
        };
      }
      return next(action);
    };
  };
};
