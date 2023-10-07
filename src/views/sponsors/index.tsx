import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import More from "./More";
import Congrats from "./Congrats";
import s from "./styles.module.css";

interface Props {}

const Sponsors: React.FC<Props> = ({}) => {
  const [clicked, setClicked] = useState({ more: false, quizDone: false });
  const navigate = useNavigate();

  const sponsors = [];
  for (let i = 0; i < 6; i++) {
    sponsors.push(
      <span key={i}>
        <p>Logo</p>
      </span>
    );
  }

  return (
    <Layout addCoins="coins3">
      <Header />
      <Content>
        {clicked.more ? (
          <More setClicked={setClicked} />
        ) : clicked.quizDone ? (
          <Congrats />
        ) : (
          <>
            <div className={s.sponsors}>{sponsors}</div>
            <div className={s.options}>
              <a className={s.backBtn} onClick={() => navigate(-1)} />
              <button
                className={s.moreBtn}
                onClick={() => setClicked({ ...clicked, more: true })}
              />
            </div>
          </>
        )}
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Sponsors);
