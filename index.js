let questionNumber = 0;
let score = 0;

function createQuiz () {
  startQuiz();
  renderQuestion();
  createQuestionForm();
  answerQuestion();
  nextQuestion();
}
  
function startQuiz () {
  $('#startQuestionsContainer').on('click', '#startButton', function (event) {
    $('#startButton').addClass('hidden');
    $('#subheader').addClass('hidden');
    $('.questions').removeClass('hidden');
    document.getElementsByClassName("svg")[0].style.filter = "opacity(1)";
    document.getElementsByClassName("questionMark")[0].classList.add("hidden");
  });
}

function renderQuestion () {
  $('.questions').html(createQuestionForm());
}

function createQuestionForm() {
  if (questionNumber < questionBank.length) {
    return `<form>
    <fieldset>
    <legend>${questionBank[questionNumber].question}</legend>
    <label class="answerOption">
    <input type="radio" value="${questionBank[questionNumber].answers[0]}" name="answer" required>
    <span>${questionBank[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questionBank[questionNumber].answers[1]}" name="answer" required>
    <span>${questionBank[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questionBank[questionNumber].answers[2]}" name="answer" required>
    <span>${questionBank[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questionBank[questionNumber].answers[3]}" name="answer" required>
    <span>${questionBank[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>`;
}
  else {
    finalScore();
  }
}

function answerQuestion() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${questionBank[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      score++;
      rightAnswer();
    }
    else {
      wrongAnswer();
    }
  });
}

function rightAnswer () {
  let correctAnswer = `${questionBank[questionNumber].correctAnswer}`;
  $('.questions').html(`<div class="feedback">
  <svg version="1" style="height: 135px; width: 135px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><polygon fill="#00ff00" points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"/>
  </svg>
  <p>You got it right!</p>
  </div>
  <button type=button class="nextButton">Next</button>`);
  document.getElementsByClassName("svg")[questionNumber].style.filter = "sepia(100%) saturate(10000%) hue-rotate(65deg)";
}

function wrongAnswer () {
  let correctAnswer = `${questionBank[questionNumber].correctAnswer}`;
  $('.questions').html(`<div class="feedback">
  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg"></img>
  <p><br>The right answer is: <span>"${correctAnswer}"</span></p>
  </div>
  <button type=button class="nextButton">Next</button>`);
  document.getElementsByClassName("svg")[questionNumber].style.filter = "sepia(100%) saturate(10000%) hue-rotate(-45deg)";
}

function nextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    if (questionNumber < 9) {
      questionNumber++;
      document.getElementsByClassName("svg")[questionNumber].style.filter = "opacity(1)";
      document.getElementsByClassName("questionMark")[questionNumber].classList.add("hidden");
      renderQuestion();
      answerQuestion();
    }
    else {
      finalScore();
    }
  });
}

function finalScore () {
  if (score > 6) {
    $('.questions').html(`<div class="final-score">Final Score: ${score}/10</div>
    <div class="feedback">Nicely done!</div>`);
    $('.restartButton').removeClass('hidden');
  }
  else {
    $('.questions').html(`<div class="final-score">Final Score: ${score}/10</div>
    <div class="feedback">Keep trying!</div>`);
    $('.restartButton').removeClass('hidden');
  }
}

function restartQuiz() {
  $('#restartButtonContainer').on('click', '.restartButton', function (event) {
    location = location;
  });
}

$(createQuiz);