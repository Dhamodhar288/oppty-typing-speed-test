emailjs.init({
  publicKey: "i4x9b-4goBz5Aysjo",
});

const typing_ground = document.querySelector("#textarea");
const btn = document.querySelector("#btn");
const score = document.querySelector("#score");
const show_sentence = document.querySelector("#showSentence");
const sendEmailBtn = document.querySelector("#sendEmail");
const show_time = document.querySelector("#show-time");

// ---------------- Email Function FIRST ----------------
const sendEmail = () => {
  const params = {
    from_name: "Typing Test App",
    show_time: show_time.innerText,
    score: score.innerText,
  };
  emailjs
    .send("service_19idayn", "template_krok998", params)
    .then((response) => {
      alert("Email sent successfully!");
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch((error) => {
      alert("Email failed to send!");
      console.log("FAILED...", error);
    });
};

// Attach event listener AFTER function exists
sendEmailBtn.addEventListener("click", sendEmail);
// ------------------------------------------------------

let startTime, endTime, totalTimeTaken, sentence_to_write;

const sentences = [
  "The quick brown fox jumps over the lazy dog 1",
  "The quick brown fox jumps over the lazy dog 2",
  "The quick brown fox jumps over the lazy dog 3 ",
];

const errorChecking = (words) => {
  let num = 0;
  sentence_to_write = show_sentence.innerText.trim().split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i] === sentence_to_write[i]) num++;
  }
  return num;
};

const calculateTypingSpeed = (time_taken) => {
  let totalWords = typing_ground.value.trim();
  let actualWords = totalWords === "" ? 0 : totalWords.split(" ");
  actualWords = errorChecking(actualWords);

  if (actualWords !== 0) {
    let typing_speed = Math.round((actualWords / time_taken) * 60);
    score.innerHTML = `Your typing speed is ${typing_speed} WPM & you wrote ${actualWords} correct words out of ${sentence_to_write.length} & time taken ${time_taken} sec`;
  } else {
    score.innerHTML = `Your typing speed is 0 WPM & time taken ${time_taken} sec`;
  }
};

const endTypingTest = () => {
  btn.innerText = "Start";
  showTimer();

  endTime = new Date().getTime();
  totalTimeTaken = (endTime - startTime) / 1000;

  calculateTypingSpeed(totalTimeTaken);

  show_sentence.innerHTML = "";
  typing_ground.value = "";
};

let intervalID,
  elapsedTime = 0;

const showTimer = () => {
  if (btn.innerText === "Done") {
    intervalID = setInterval(() => {
      elapsedTime++;
      show_time.innerText = elapsedTime;
    }, 1000);
  } else {
    clearInterval(intervalID);
    elapsedTime = 0;
    show_time.innerText = "0";
  }
};

const startTyping = () => {
  let randomNumber = Math.floor(Math.random() * sentences.length);
  show_sentence.innerHTML = sentences[randomNumber];

  startTime = new Date().getTime();

  btn.innerText = "Done";
  showTimer();
};

btn.addEventListener("click", () => {
  if (btn.innerText.toLowerCase() === "start") {
    typing_ground.removeAttribute("disabled");
    startTyping();
  } else {
    typing_ground.setAttribute("disabled", "true");
    endTypingTest();
  }
});
