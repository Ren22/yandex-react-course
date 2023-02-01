import { OrderInFeed } from "../../components/order-in-feed/order-in-feed";
import feedPageStyle from "./feed.module.css";

export const FeedPage = () => {
  return (
    <>
      <main className={feedPageStyle.main}>
        <section className={feedPageStyle.leftColumn}>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Лента заказов
          </h1>
          <div className={`${feedPageStyle.ordersContainer} mr-2 `}>
            <OrderInFeed />
            <OrderInFeed />
            <OrderInFeed />
            <OrderInFeed />
            <OrderInFeed />
          </div>
        </section>
        <section className={`${feedPageStyle.rightColumn} mt-25 ml-10`}>
          <div className={`${feedPageStyle.ordersStatusWrapper}`}>
            <div>
              <p className="text text_type_main-medium mb-5">Готовы:</p>
              <p
                className={`${feedPageStyle.readyOrders__number} text text_type_digits-default`}
              >
                034544
              </p>
              <p
                className={`${feedPageStyle.readyOrders__number} text text_type_digits-default`}
              >
                034544
              </p>
              <p
                className={`${feedPageStyle.readyOrders__number} text text_type_digits-default`}
              >
                034544
              </p>
              <p
                className={`${feedPageStyle.readyOrders__number} text text_type_digits-default`}
              >
                034544
              </p>
              <p
                className={`${feedPageStyle.readyOrders__number} text text_type_digits-default`}
              >
                034544
              </p>
            </div>
            <div className="ml-30">
              <p className="text text_type_main-medium mb-5">В работе:</p>
              <p className={`text text_type_digits-default`}>034544</p>
              <p className={`text text_type_digits-default`}>034544</p>
              <p className={`text text_type_digits-default`}>034544</p>
            </div>
          </div>
          <div className={`${feedPageStyle.doneOverall}`}>
            <p className="text text_type_main-medium mt-20">
              Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">28752</p>
          </div>
          <div className={`${feedPageStyle.doneToday}`}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">138</p>
          </div>
        </section>
      </main>
    </>
  );
};
