import React, { FC } from "react";
import { useSelector } from "../../../services/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedItemStyle from "./feedItem.module.css";
import { useLocation, Link } from "react-router-dom";
import { IIngr, IFeedItem } from "../../../services/types/data";

interface IFeedItemImage {
  data: IIngr;
  number?: any;
  lengthArr?: number;
  key: string;
}
export const FeedItemImage: FC<IFeedItemImage> = ({
  data,
  number,
  lengthArr = 0,
}) => {
  let count: number = lengthArr - number;

  return (
    <>
      {number && (
        <div
          className={
            count <= 5 ? feedItemStyle.images : feedItemStyle.imagesTest
          }
        >
          <div
            className={
              count < 5 ? feedItemStyle.image : feedItemStyle.imageTest
            }
          >
            <img
              src={data.image_mobile}
              alt="Фото ингридиента"
              className={feedItemStyle.imageMobile}
            />
          </div>
          {count === 5 && (
            <div className={feedItemStyle.countWrap}>
              <div
                className={`${feedItemStyle.count} text text_type_main-default`}
              >
                <p className="pl-1">{`+${lengthArr - 6}`}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {!number && (
        <div className={feedItemStyle.images}>
          <div className={feedItemStyle.image}>
            <img
              src={data.image_mobile}
              alt="Фото ингридиента"
              className={feedItemStyle.imageMobile}
            />
          </div>
        </div>
      )}
    </>
  );
};
interface IFeedItems {
  item: IFeedItem;
  key: string;
  profile?: string;
}
const FeedItem: FC<IFeedItems> = (item) => {
  const location = useLocation();
  const burgerData = useSelector((store) => store.item.burgerData);
  const ingredients: any[] | undefined = item.item.ingredients;
  const ingrArr: IIngr[] = [];
  const info = {
    itemDay: "",
    time: item.item.createdAt,
    now: new Date(),
    id: item.item._id,
    profileUrl: item.profile,
    url: "",
    acc: [],
  };

  let price: number = 0;
  let countImage: number = 0;
  let test: { [x: string]: number };

  const nowDay = info.now.getDate();
  const findT = info.time.indexOf("T");
  const findDay = info.time.slice(findT - 2, findT);
  const findTime = info.time.slice(findT + 1, findT + 6);

  const sum = burgerData.map((el) => {
    const data = ingredients.find((item) => el._id === item);
    test = ingredients?.reduce(function (acc, data) {
      acc[data] = (acc[data] || 0) + 1;
      return acc;
    }, []);

    if (data) {
      ingrArr.push(el);
    }
  }, 0);

  //console.log(test);
  //console.log(info.ingrArr);
  nowDay.toString() === findDay
    ? (info.itemDay = "Cегодня")
    : Number(nowDay) - Number(findDay) === 1
    ? (info.itemDay = "Вчера")
    : Number(nowDay) - Number(findDay) === 2
    ? (info.itemDay = "2 дня назад")
    : (info.itemDay = "Архивный заказ");

  info.profileUrl === "true"
    ? (info.url = `/profile/order/${info.id}`)
    : (info.url = `/feed/${info.id}`);
  // console.log(location);
  return (
    <Link
      to={{
        pathname: info.url,
        state: { background: location },
      }}
      key={info.id}
      className={feedItemStyle.link}
    >
      <li className={feedItemStyle.listItem} key={info.id}>
        <div className={feedItemStyle.element}>
          <div className={feedItemStyle.wrap}>
            <p className="pt-6 text text_type_digits-default">
              #{item.item.number}
            </p>
            <p
              className={`${feedItemStyle.date} text text_type_main-default text_color_inactive`}
            >
              {info.itemDay + " "}
              {findTime + " i-GMT+3"}
            </p>
          </div>
          <p
            className={`${feedItemStyle.name} pt-6 pb-6 text text_type_main-medium`}
          >
            {item.item.name}
          </p>
          <div className={feedItemStyle.wrapPrice}>
            <div className={feedItemStyle.price}>
              {ingrArr.reverse().map((item) => {
                console.log(item);

                price += test[item._id] * item.price;
                if (ingrArr.length <= 6) {
                  return <FeedItemImage data={item} key={item._id} />;
                } else {
                  return (
                    <FeedItemImage
                      data={item}
                      key={item._id}
                      number={(countImage += 1)}
                      lengthArr={ingrArr.length}
                    />
                  );
                }
              })}
            </div>
            <div className={feedItemStyle.wrapPrice}>
              <p className="text text_type_digits-default pr-2">{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};
// FeedItem.propTypes = {
//   item: PropTypes.object.isRequired,
// };

// FeedItemImage.propTypes = {
//   // data: PropTypes.object.isRequired,
//   number: PropTypes.number,
//   lengthArr: PropTypes.number,
// };
export default FeedItem;
