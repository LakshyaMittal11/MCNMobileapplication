let user = "";
let score = 0;
let timeLeft = 60;
let timer;

let questions = [];
let qIndex = 0;

/* ================= SCREEN SWITCH ================= */
function showScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ================= LOGIN ================= */
function startApp() {
  user = document.getElementById("username").value.trim();
  if (!user) {
    alert("Please enter your name");
    return;
  }
  document.getElementById("userName").innerText = user;
  showScreen("homeScreen");
}

/* ================= HTML DECODE ================= */
function decodeHTML(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

/* ================= FETCH QUESTIONS (BACKEND SAME SERVER) ================= */
async function loadQuestions() {
  try {
    const category = document.getElementById("category")?.value || "";
    const difficulty = document.getElementById("difficulty")?.value || "";

    const url = `/api/questions?amount=5&category=${category}&difficulty=${difficulty}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Server error");

    const data = await res.json();

    questions = data.results.map(q => {
      const options = [...q.incorrect_answers, q.correct_answer]
        .map(decodeHTML)
        .sort(() => Math.random() - 0.5);

      return {
        question: decodeHTML(q.question),
        options,
        answer: decodeHTML(q.correct_answer)
      };
    });

  } catch (err) {
    alert("Questions load nahi ho paaye. Server check karo.");
    console.error(err);
  }
}

/* ================= START GAME ================= */
async function startGame() {
  score = 0;
  qIndex = 0;
  timeLeft = 60;

  await loadQuestions();

  if (questions.length === 0) {
    alert("No questions available");
    return;
  }

  document.getElementById("timer").innerText = timeLeft;
  showQuestion();
  showScreen("gameScreen");

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

/* ================= SHOW QUESTION ================= */
function showQuestion() {
  const q = questions[qIndex];
  let html = `<p>${q.question}</p>`;

  q.options.forEach(opt => {
    html += `
      <button onclick="checkAnswer('${opt.replace(/'/g, "")}')">
        ${opt}
      </button>
    `;
  });

  document.getElementById("question").innerHTML = html;
}

/* ================= CHECK ANSWER ================= */
function checkAnswer(selected) {
  if (selected === questions[qIndex].answer) {
    score += 10;
  }
  qIndex++;

  if (qIndex < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

/* ================= END GAME ================= */
async function endGame() {
  clearInterval(timer);

  // Save score (same server)
  try {
    await fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: user, score })
    });
  } catch (err) {
    console.warn("Score save nahi hua");
  }

  document.getElementById("resultText").innerText =
    `You scored ${score} points and earned ${score} Sharp Coins 💰`;

  showScreen("resultScreen");
}

/* ================= LEADERBOARD (BACKEND SAME SERVER) ================= */
async function showLeaderboard() {
  try {
    const res = await fetch("/api/leaderboard");
    const data = await res.json();

    const list = document.getElementById("leaderboardList");
    list.innerHTML = "";

    data.forEach(u => {
      const li = document.createElement("li");
      li.innerText = `${u.name} — ${u.score} pts`;
      list.appendChild(li);
    });

    showScreen("leaderboardScreen");
  } catch (err) {
    alert("Leaderboard load nahi ho paayi");
  }
}

/* ================= RESTART ================= */
function restart() {
  showScreen("loginScreen");
}
