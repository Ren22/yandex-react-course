import {
  wsClose,
  wsError,
  wsGetMessage,
  wsOpen,
} from "../redux/slices/orders-feed";
import { AnyAction, Dispatch, Middleware } from "redux";

export const socketMiddlwareCreator = (): Middleware<{}> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const { dispatch } = store;

    return (next: Dispatch) => (action: AnyAction) => {
      const { type, payload } = action;

      if (type === "ordersFeed/wsInit") {
        socket = new WebSocket(payload);
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
