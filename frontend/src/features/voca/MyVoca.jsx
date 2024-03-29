import { useState, useEffect } from "react";

import axios from "../../common/api/https";
import LargeButton from "../../common/button/LargeButton";
import WordSmall from "../../common/card/WordSmall";

import "./MyVoca.scss";
import "../study/FadeIn.scss";
import "../../common/card/flip.scss";

import Grid from "@mui/material/Grid";

import StarIcon from "@mui/icons-material/Star";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function MyVoca() {
  const [star, setStar] = useState(false);
  const [wordNumber, setWordNumber] = useState();
  const [startNumber, setStartNumber] = useState();
  const [endNumber, setEndNumber] = useState();
  const [wordList, setWordList] = useState();
  const [blockListMode, setBlockListMode] = useState(false);

  useEffect(() => {
    async function getInfo() {
      const data = await axios.get(`/api/favorites`);
      setWordList(data.data);
      setWordNumber(0);
      setStartNumber(data.data[0].id);
      setEndNumber(data.data.length - 1);
    }
    getInfo();
  }, []);

  const handleListItemClick = (index) => {
    setWordNumber(index);
  };

  const numberPlus = () => {
    const num = wordNumber;
    setWordNumber(num + 1);
  };

  const numberMinus = () => {
    const num = wordNumber;
    setWordNumber(num - 1);
  };

  const up =
    wordNumber === 0 ? (
      <ArrowDropUpRoundedIcon
        color="disabled"
        sx={{ fontSize: 40 }}
        onClick={undefined}
      />
    ) : (
      <div className="top" href={"#section" + wordNumber} onClick={numberMinus}>
        <ArrowDropUpRoundedIcon color="blue" sx={{ fontSize: 40 }} />
      </div>
    );

  const down =
    wordNumber === endNumber ? (
      <ArrowDropDownRoundedIcon
        color="disabled"
        sx={{ fontSize: 40 }}
        onClick={undefined}
      />
    ) : (
      <div
        className="bottom"
        href={"#section" + wordNumber}
        onClick={numberPlus}
      >
        <ArrowDropDownRoundedIcon color="blue" sx={{ fontSize: 40 }} />
      </div>
    );

  const previous =
    wordNumber === 0 ? (
      <div className="arrowBackBox">
        <ArrowBackIosRoundedIcon color="disabled" sx={{ fontSize: 45 }} />
      </div>
    ) : (
      <div
        className="arrowBackBox"
        href={"#section" + wordNumber}
        onClick={numberMinus}
      >
        <ArrowBackIosRoundedIcon color="blue" sx={{ fontSize: 45 }} />
      </div>
    );

  const next =
    wordNumber === endNumber ? (
      <div className="arrowForwardBox">
        <ArrowForwardIosRoundedIcon color="disabled" sx={{ fontSize: 45 }} />
      </div>
    ) : (
      <div
        className="arrowForwardBox"
        href={"#section" + wordNumber}
        onClick={numberPlus}
      >
        <ArrowForwardIosRoundedIcon color="blue" sx={{ fontSize: 45 }} />
      </div>
    );

  const starChange = (event) => {
    setStar(!star);
    // 이곳에 즐겨찾기 하기, 해제하기 코드가 들어갑니다.
  };

  const flip = () => {
    document.getElementById("flip-container").className += " hover";
  };
  const flipAgain = () => {
    document.getElementById("flip-container").className = "flip-container";
  };

  const listMode = () => {
    setBlockListMode(!blockListMode);
  };

  if (wordList && wordList.length > 0) {
    const media =
      wordList[wordNumber].categoryId > 3 ? (
        <video
          src={wordList[wordNumber].contentUrl}
          autoPlay
          poster=""
          loop
        ></video>
      ) : (
        <img
          className="handImage"
          src={wordList[wordNumber].contentUrl}
          referrerPolicy="no-referrer"
        />
      );

    if (blockListMode) {
      return (
        <Grid container justifyContent="center">
          <Grid item xs={8} sx={{ marginTop: 0 }}>
            <div className="myvocaText">나의 단어장</div>
            <div className="marginTop fade-up">
              {wordList.map((word, index) => (
                <WordSmall
                  key={word.id}
                  text={word.name}
                  star={false}
                  isLogin={true}
                  index={index}
                  handleListItemClick={handleListItemClick}
                  listMode={listMode}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container justifyContent="center">
          <Grid item xs={8} sx={{ marginTop: 0 }}>
            <div className="myvocaText">나의 단어장</div>
            <div className="container fade-up">
              <div className="bigWordCard">
                <div id="flip-container" className="flip-container">
                  <div className="flipper">
                    <div className="front">
                      <div className="shuffleBox"></div>
                      <div className="menuBox">
                        <MenuRoundedIcon
                          color="blue"
                          sx={{ fontSize: 45 }}
                          onClick={() => listMode()}
                        />
                      </div>
                      {previous}
                      {next}
                      <div onClick={flip}>
                        <div className="word">{wordList[wordNumber].name}</div>
                      </div>
                    </div>
                    <div className="back">
                      {previous}
                      {next}
                      <div className="wordBackBox" onClick={flipAgain}>
                        <div className="wordVideoBox">{media}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mywordList">
                <div className="mywordListCard">
                  <div className="arrowBox ">{up}</div>
                  <div className="mylistBox scroll-container">
                    <List
                      sx={{ width: "100%", maxWidth: 360 }}
                      style={{ color: "black", padding: 0 }}
                      aria-label="contacts"
                    >
                      {wordList.map((word, index) => (
                        <ListItem
                          disablePadding
                          id={"section" + word.id}
                          key={"id" + word.id}
                        >
                          <ListItemButton
                            selected={wordNumber === index}
                            onClick={(event) => handleListItemClick(index)}
                          >
                            <ListItemText
                              primary={word.name}
                              primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: "medium",
                                letterSpacing: 0,
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                  <div className="arrowBox">{down}</div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      );
    }
  }
}
