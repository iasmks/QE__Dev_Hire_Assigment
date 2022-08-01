import React, { useEffect, useState } from "react";

export default function QuizCard() {
  const [getAnswer, setGetAnswer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [giveAnswer, setGiveAnswer] = useState("");
  const [number, setNumber] = useState(1);
  const [resultAnswer,setResultAnswer] = useState("")
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    console.log(number);
    const api = `https://opentdb.com/api.php?amount=${number}`;
    await fetch(api)
      .then((data) => data.json())
      .then((res) => {
        setGetAnswer(res.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  console.log(getAnswer);
  const handleInput = (e) => {
    setGiveAnswer(e.target.value);
  };
  const handleSubmit = (result) => {
    console.log(result.correct_answer);
    if (result.correct_answer === giveAnswer) {
      console.log("Correct!!");
      setResultAnswer("Correct!!")
    } else {
      console.log("Wrong!!");
      setResultAnswer("Wrong!!")
    }
  };
  const handleNext = () => {
    const nextQuestion = number + 1;
    console(nextQuestion)
    setNumber(nextQuestion);
  };

  return (
    <div className="quizcard">
      <div className="card text-center">
        <div className="card-header">
          <h1>Quiz</h1>
        </div>

        {loading ? (
          <p>Loading ...</p>
        ) : (
          getAnswer.map((item, index) => (
            <div className="card-body" key={index}>
              <h5
                className="card-title"
                key={index}
                dangerouslySetInnerHTML={{ __html: item.question }}
              ></h5>
              <br></br>
              <input
                type="text"
                placeholder="Answer"
                value={giveAnswer}
                onChange={(e) => handleInput(e)}
              />
              <br></br>
              <br></br>
              {/* <button
                className="btn btn-outline-secondary"
                onClick={() => handleSubmit(item)}
              >
                Submit
              </button> */}
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleSubmit(item)}
              >
                Submit
              </button>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Result
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                    CorrectAnswer Is: <b>{item.correct_answer}</b>
                    <br/>
                    Your Answer: <b>{giveAnswer}</b>
                    <br/>
                    <h1 style={item.correct_answer === giveAnswer? {color:"green"} : {color:"red"}}>{resultAnswer}</h1>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Next Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="card-footer text-muted">
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
