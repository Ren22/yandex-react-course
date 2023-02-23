import { InitialStateIngredients } from "../../types/ingredients";
import ingredientsReducer, {
  ingredientsSlice,
  loadAllIngredients,
  selectIngredientsState,
  selectIsIngredientDragged,
  selectSelectedIngredients,
} from "./ingredients";
import fetchMock from "fetch-mock";
import { BASE_URL } from "../../api";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { RootState, AppDispatch } from "../store";

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares);

export const initialIngredientsState: InitialStateIngredients = {
  allIngredients: [],
  selectedIngredients: { others: [] },
  currentIngredient: null,
  isIngredientDragged: false,
  ingredientsAreLoaded: false,
};

const mockStoreInitialState = {
  ingredients: { ...initialIngredientsState },
  auth: { userForgotPswrdEmailSent: false, userIsPasswordReset: false },
  user: { userIsLoading: false, user: null },
  ordersFeed: { status: null, connectionError: "" },
  order: { orderIsLoading: false },
};

describe("ingredients reducer", () => {
  let store: MockStoreEnhanced;
  beforeEach(() => {
    store = mockStore({ ...mockStoreInitialState });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("should fetch ingredients", async () => {
    const mockResp = {
      success: true,
      data: [
        {
          _id: "60d3b41abdacab0026a733c6",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          __v: 0,
        },
        {
          _id: "60d3b41abdacab0026a733c7",
          name: "Флюоресцентная булка R2-D3",
          type: "bun",
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          __v: 0,
        },
      ],
    };
    fetchMock.getOnce(`${BASE_URL}/ingredients`, {
      headers: { "content-type": "application/json" },
      body: mockResp,
    });
    const expectedActions = [
      { type: "loadAllIngredients/pending", payload: undefined },
      {
        type: "loadAllIngredients/fulfilled",
        payload: { allIngredients: mockResp.data },
      },
    ];
    await store.dispatch(loadAllIngredients() as any);
    expect(store.getActions().map(({ meta, ...rest }) => rest)).toEqual(
      expectedActions
    );
  });

  it("should return the inital state", () => {
    expect(ingredientsReducer(undefined, { type: "" })).toEqual(
      initialIngredientsState
    );
  });

  it("should handle pickIngredient", () => {
    const mockedIngredient = {
      _id: "60d3b41abdacab0026a733c6",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    };
    const action = {
      type: "ingredients/pickIngredient",
      payload: mockedIngredient,
    };
    const newState = ingredientsSlice.reducer(initialIngredientsState, action);
    expect(newState.currentIngredient).toEqual(mockedIngredient);
  });

  it("should handle addIngredient (bun)", () => {
    const mockedIngredient = {
      _id: "60d3b41abdacab0026a733c6",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    };
    const action = {
      type: "ingredients/addIngredient",
      payload: mockedIngredient,
    };
    const newState = ingredientsSlice.reducer(initialIngredientsState, action);
    expect(newState.selectedIngredients.bun).toEqual(mockedIngredient);
  });

  it("should handle addIngredient (others)", () => {
    const mockedIngredientBun = {
      _id: "60d3b41abdacab0026a733c7",
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      __v: 0,
    };
    const mockedIngredientMain = {
      _id: "60d3b41abdacab0026a733c8",
      name: "Филе Люминесцентного тетраодонтимформа",
      type: "main",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
      __v: 0,
    };
    const action = {
      type: "ingredients/addIngredient",
      payload: mockedIngredientMain,
    };
    const newState = ingredientsSlice.reducer(
      {
        ...initialIngredientsState,
        selectedIngredients: { others: [mockedIngredientBun] },
      },
      action
    );
    expect(newState.selectedIngredients.others).toEqual([
      mockedIngredientBun,
      mockedIngredientMain,
    ]);
  });

  it("should handle removeIngredient", () => {
    const mockedIngredients = [
      {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733c8",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
      },
    ];
    const action = {
      type: "ingredients/removeIngredient",
      payload: 0,
    };
    const newState = ingredientsSlice.reducer(
      {
        ...initialIngredientsState,
        selectedIngredients: { others: [...mockedIngredients] },
      },
      action
    );
    expect(newState.selectedIngredients.others).toEqual([mockedIngredients[1]]);
  });

  it("should not remove ingredient for action removeIngredients when index is -1", () => {
    const mockedIngredients = [
      {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733c8",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
      },
    ];
    const action = {
      type: "ingredients/removeIngredient",
      payload: -1,
    };
    const newState = ingredientsSlice.reducer(
      {
        ...initialIngredientsState,
        selectedIngredients: { others: [...mockedIngredients] },
      },
      action
    );
    expect(newState.selectedIngredients.others).toEqual([...mockedIngredients]);
  });

  it("should closeIngredientDetails", () => {
    const action = {
      type: "ingredients/closeIngredientDetails",
    };
    const newState = ingredientsSlice.reducer(initialIngredientsState, action);
    expect(newState.currentIngredient).toEqual(null);
  });

  it("should moveIngredients", () => {
    const mockedIngredients = [
      {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733c8",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
      },
    ];

    const action = {
      type: "ingredients/moveIngredients",
      payload: { dragIndex: 0, hoverIndex: 1 },
    };
    const newState = ingredientsSlice.reducer(
      {
        ...initialIngredientsState,
        selectedIngredients: { others: mockedIngredients },
      },
      action
    );
    expect(newState.selectedIngredients.others).toEqual([
      mockedIngredients[1],
      mockedIngredients[0],
    ]);
  });

  it("should changeDraggingIngredientState", () => {
    const action = {
      type: "ingredients/changeDraggingIngredientState",
      payload: 1,
    };
    const newState = ingredientsSlice.reducer(initialIngredientsState, action);
    expect(newState.isIngredientDragged).toBe(1);
  });

  it("should loadAllIngredients fullfilled", () => {
    const newState = ingredientsSlice.reducer(initialIngredientsState, {
      type: "loadAllIngredients/fulfilled",
      payload: {
        allIngredients: [
          {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
          },
        ],
      },
    });

    expect(newState.ingredientsAreLoaded).toBe(true);
  });

  it("should loadAllIngredients pending", () => {
    const newState = ingredientsSlice.reducer(initialIngredientsState, {
      type: "loadAllIngredients/pending",
    });

    expect(newState.ingredientsAreLoaded).toBe(false);
  });

  it("should loadAllIngredients rejected", () => {
    const newState = ingredientsSlice.reducer(initialIngredientsState, {
      type: "loadAllIngredients/rejected",
    });

    expect(newState.ingredientsAreLoaded).toBe(false);
    expect(newState.error).toBe(
      "Error, something went wrong. Contact support if problem persis"
    );
  });

  it("should selectIngredientsState", () => {
    const ingredients = selectIngredientsState(store.getState() as RootState);
    expect(ingredients).toEqual({ ...initialIngredientsState });
  });

  it("should selectSelectedIngredients", () => {
    const mockedIngredientBun = {
      _id: "60d3b41abdacab0026a733c7",
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      __v: 0,
    };
    store = mockStore({
      ...mockStoreInitialState,
      ingredients: {
        ...initialIngredientsState,
        selectedIngredients: { bun: mockedIngredientBun, others: [] },
      },
    });
    const selectedIngredients = selectSelectedIngredients(
      store.getState() as RootState
    );
    expect(selectedIngredients.bun).toEqual(mockedIngredientBun);
    expect(selectedIngredients.others).toEqual([]);
  });

  it("should selectIsIngredientDragged", () => {
    store = mockStore({
      ...mockStoreInitialState,
      ingredients: {
        ...initialIngredientsState,
        isIngredientDragged: true,
      },
    });
    const isDragged = selectIsIngredientDragged(store.getState() as RootState);
    expect(isDragged).toEqual(true);
  });
});
