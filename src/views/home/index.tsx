import NotificationValues from "@typings/NotificationValues";

import { useRef, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { setNotification } from "@actions/notification";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import MapNavigation from "@components/mapNavigation";

import s from "./styles.module.css";

// To be in constants folder.
const treasureMapNavContent = [
  {
    img: require("@static/welcome.png"),
    alt: "Welcome",
    txt: "Welcome aboard!",
    to: "",
  },
  {
    img: require("@static/free_dublons.png"),
    alt: "Free Raffle",
    txt: "3 free dubl-u-nes already!",
    to: "",
  },
  {
    img: require("@static/profile_page.png"),
    alt: "Profile",
    txt: "Profile page",
    to: "/profile",
  },
  {
    img: require("@static/see_businesses.png"),
    alt: "Businesses",
    txt: "See businesses",
    to: "/businesses",
  },
  {
    img: require("@static/sponsors.png"),
    alt: "Sponsors",
    txt: "Sponsors",
    to: "/sponsors",
  },
  {
    img: require("@static/raffle_page.png"),
    alt: "Raffle",
    txt: "Raffle page",
    to: "/raffle",
  },
  {
    img: require("@static/event_results.png"),
    alt: "Results",
    txt: "Event Results",
    to: "/results",
    disabled: true, // Locked during the game time.
  },
];

interface Props {
  setNotification: (data: NotificationValues) => void;
}

const Home: React.FC<Props> = ({ setNotification }) => {
  const blockBtnRef = useRef<HTMLButtonElement>(null),
    [viewed, setViewed] = useState(
      localStorage.getItem("block-instructions") ? true : false
    );

  return (
    <Layout addCoins={!viewed ? "coins1" : "coins2"}>
      <Header title={!viewed ? "Instructions" : "Treasure Map"} />
      {/* <img
        src={!viewed ? coins1 : coins2}
        alt="Doblons"
        className={
          !viewed ? `${s.coins} ${s.notViewed}` : `${s.coins} ${s.viewed}`
        }
      /> */}
      <Content
        {...(!viewed && {
          style: { padding: "30px 30px 14px 30px" },
        })}
      >
        {!viewed ? (
          <>
            <div className={s.notViewed}>
              <ul>
                <li>
                  <p>Visit each island to answer the questions</p>
                </li>
                <li>
                  <p>
                    Click on raffle page, to use your free registration
                    dubl-u-nes
                  </p>
                </li>
              </ul>

              <div>
                <button
                  className={`${s.blockBtn} fade move`}
                  ref={blockBtnRef}
                  onClick={() => {
                    const blockBtn = blockBtnRef.current!;

                    localStorage.setItem("block-instructions", "true");
                    setNotification({
                      display: true,
                      error: false,
                      content: "Instructions are now blocked. ✔",
                      close: false,
                      duration: 4000,
                    });
                    blockBtn.disabled = true;
                    blockBtn.setAttribute("aria-disabled", "true");
                  }}
                >
                  Don't show this again
                </button>
                <button className={s.nextBtn} onClick={() => setViewed(true)} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={s.viewed}>
              {treasureMapNavContent.map((content) => (
                <MapNavigation
                  key={content.alt}
                  img={content.img}
                  alt={content.alt}
                  txt={content.txt}
                  to={content.to}
                  disabled={content.disabled}
                />
              ))}
            </div>
          </>
        )}
      </Content>
      {viewed && <Status />}
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setNotification: (data: NotificationValues) =>
    dispatch(setNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
