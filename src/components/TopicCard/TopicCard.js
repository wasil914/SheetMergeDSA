import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";

import "./topicCard.css";

export default function TopicCard({ questionData }) {
  const dark = useContext(ThemeContext);

  const findPercentage = (doneQuestions, totalQuestions) => {
    return Math.round((doneQuestions / totalQuestions) * 100);
  };

  let totalSolved = 0;
  let totalQuestions = 0;

  const topicCard = questionData.map((topic, index) => {
    const { topicName, doneQuestions, questions, started } = topic;
    const percentDone = findPercentage(doneQuestions, questions.length);
    const questionsRemaining = questions.length - doneQuestions;

    totalSolved += doneQuestions;
    totalQuestions += questions.length;

    if (started) {
      return (
        <Fade duration={500 + index * 40} key={index}>
          <div className="col mb-4">
            <Link
              to={`/${topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                className={`mb-3 inprogress-card hvr-grow ${
                  dark ? "darkCard" : ""
                }`}
              >
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title className="topicName">
                        {topicName}
                      </Card.Title>
                    </Col>
                    <Col>
                      <h4>
                        <Badge
                          pill
                          variant="success"
                          className="float-right"
                          style={{ fontWeight: 500, cursor: "pointer" }}
                        >
                          {questionsRemaining === 0
                            ? "Done 👏🏻"
                            : "Solve Now 🙇🏻‍♂️"}
                        </Badge>
                      </h4>
                    </Col>
                  </Row>

                  <Card.Text className="totalQuestion">
                    Total Questions {questions.length} <br />
                    {questionsRemaining} More to go
                  </Card.Text>

                  <p className="percentDone mb-1">
                    <b>{percentDone}% Done</b>
                  </p>

                  <ProgressBar
                    animated={percentDone !== 100}
                    variant="success"
                    now={percentDone}
                  />
                </Card.Body>
              </Card>
            </Link>
          </div>
        </Fade>
      );
    }

    return (
      <Fade duration={500 + index * 50} key={index}>
        <div className="col mb-4">
          <Link
            to={`/${topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              className={`mb-3 notstarted-card hvr-grow ${
                dark ? "darkCard" : ""
              }`}
            >
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title className="topicName">
                      {topicName}
                    </Card.Title>
                  </Col>
                  <Col>
                    <h4>
                      <Badge
                        pill
                        variant="primary"
                        className="float-right"
                        style={{ fontWeight: 500, cursor: "pointer" }}
                      >
                        Start Now
                      </Badge>
                    </h4>
                  </Col>
                </Row>

                <Card.Text className="totalQuestion">
                  Total Questions {questions.length}
                </Card.Text>

                <p className="percentDone mb-1">
                  <b>
                    <i>Not yet started</i>
                  </b>
                </p>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </Fade>
    );
  });

  const promotionTile = () => (
    <Fade duration={550} key="promo">
      <div>
        <Link
          to={{ pathname: "https://bit.ly/419XxW9" }}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <Card
            className={`mb-3 promotional-card ${
              dark ? "darkCard" : ""
            }`}
          >
            <Card.Body style={{ padding: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <h4 className="promotional-heading">
                  This website is under upgradation to add more features and
                  improve user experience.
                </h4>

                <h4 className="promotional-cta hvr-grow">
                  <Badge
                    pill
                    variant="primary"
                    style={{
                      fontWeight: 700,
                      cursor: "pointer",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    Start Now
                  </Badge>
                </h4>
              </div>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </Fade>
  );

  return (
    <>
      <h3 className="app-heading2 text-center mb-3">
        Your Gateway to crack DSA 🔥
      </h3>

      <h4 className="text-center mb-4">
        {totalSolved
          ? `Total Questions Solved : ${totalSolved} (${(
              (totalSolved / totalQuestions) *
              100
            ).toFixed(2)}% Done)`
          : "Start Solving"}

        {totalSolved ? (
          <ProgressBar
            animated={
              ((totalSolved / totalQuestions) * 100).toFixed(2) !== "100"
            }
            variant="success"
            now={((totalSolved / totalQuestions) * 100).toFixed(2)}
            style={{ margin: "0.2em 5em" }}
          />
        ) : null}
      </h4>

      <div className="container container-custom">
        {promotionTile()}
        <div className="row row-cols-1 row-cols-md-3 mt-3 grids">
          {topicCard}
        </div>
      </div>
    </>
  );
}
