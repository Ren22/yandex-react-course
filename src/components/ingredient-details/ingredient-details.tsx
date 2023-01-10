import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import {
  closeIngredientDetails,
  selectIngredientsState,
  loadAllIngredients,
  pickIngredient,
} from "../../redux/slices/ingredients";
import { useAppDispatch } from "../../redux/store";
import { IngredientDetailsType } from "../../utils/types";
import Header from "../header/header";
import Modal from "../modal/modal";
import ingredientDetailsStyle from "./ingredient-details.module.css";

interface MatchParams {
  id: string;
}

const IngredientDetails = () => {
  const { params } = useRouteMatch<MatchParams>();
  const { allIngredients } = useSelector(selectIngredientsState);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const [pickedIngredient, setPickedIngredient] =
    useState<IngredientDetailsType | null>(null);

  useEffect(() => {
    dispatch(loadAllIngredients());
  }, [dispatch]);

  useEffect(() => {
    const ingredient = allIngredients.find((ing) => ing._id === params.id);
    if (ingredient) {
      setPickedIngredient(ingredient);
      dispatch(pickIngredient(ingredient));
    }
  }, [params, allIngredients, dispatch]);

  const handleCloseModal = () => {
    dispatch(closeIngredientDetails());
    history.goBack();
  };
  const footerDetails = [
    {
      name: "Калории, ккал",
      value: pickedIngredient?.calories,
    },
    {
      name: "Белки, г",
      value: pickedIngredient?.proteins,
    },
    {
      name: "Жиры, г",
      value: pickedIngredient?.fat,
    },
    {
      name: "Углеводы, г",
      value: pickedIngredient?.carbohydrates,
    },
  ];

  const commonPart = () => (
    <div className={ingredientDetailsStyle.main}>
      <img
        className={ingredientDetailsStyle.main__image}
        alt={pickedIngredient?.name}
        src={pickedIngredient?.image}
      />
      <span className="text text_type_main-medium mt-4 mb-8">
        {pickedIngredient?.name}
      </span>
      <section
        className={`${ingredientDetailsStyle.footer} text text_type_main-default text_color_inactive mb-15`}
      >
        {footerDetails.map((it, key) => {
          return (
            <div
              key={key}
              className={ingredientDetailsStyle.footer__subsection}
            >
              <span>{it.name}</span>
              {it.value}
            </div>
          );
        })}
      </section>
    </div>
  );

  return (location.state as { prevPath: string })?.prevPath === "/" ? (
    // user came from internal link
    <Modal header="Детали ингредиента" closeModal={handleCloseModal}>
      {commonPart()}
    </Modal>
  ) : (
    <>
      <Header />
      {commonPart()}
    </>
  );
};

export default IngredientDetails;
