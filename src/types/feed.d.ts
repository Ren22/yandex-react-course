
export type SelectedOrderInFeed = {
  ingredients: IngredientDetailsType[];
  number: number;
  createdAt: string;
  status: string;
  name: string;
};

export type InitialStateOrdersFeed = {
  status: WebsocketStatus;
  orders?: OrderDetails[];
  totalOrders?: number;
  totalToday?: number;
  connectionError: string | undefined;
  selectedOrderInFeed?: SelectedOrderInFeed;
};


export type OrderDetailsType = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type wsOrdersResp = {
  orders: OrderDetails[];
  total: number;
  totalToday: number;
};