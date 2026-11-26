const QUIZ_NAME = "薬学的有害事象等防止加算クイズ";

// 既存クイズと同じ Apps Script のウェブアプリURL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxCGQdVIRdGYjocIAdfrMA_gUYtxovXCQBj41DBKXuUZTP7BKx5z0YVRRHIheU5RTI/exec";

const answerKeys = [["ニ", "901", "なし"], ["ロ", "902", "なし"], ["ハ", "903", "なし"], ["イ", "905", "1004"], ["算定なし", "なし", "なし"], ["ニ", "904", "なし"], ["イ", "902", "1002"], ["イ", "907", "1003"], ["算定なし", "なし", "なし"], ["ニ", "906", "なし"], ["ハ", "902", "なし"], ["イ", "907", "1005"], ["算定なし", "なし", "なし"], ["イ", "901", "1006"], ["ロ", "903", "なし"]];

const questions = [
  {
    "text": "<strong>問題1</strong><div class=\"case-box\">外来患者。アムロジピン錠5mgが処方された。お薬手帳を確認すると、他院からノルバスク錠5mgが処方されていた。かかりつけ薬剤師ではない薬剤師が疑義照会し、今回のアムロジピンが削除された。</div>最も適切な組み合わせは？",
    "explanation": "ノルバスクとアムロジピンは同一成分。重複投薬なので901、外来でかかりつけ薬剤師以外による照会なのでニ（30点）。"
  },
  {
    "text": "<strong>問題2</strong><div class=\"case-box\">在宅患者。ロスバスタチン錠が処方された。処方箋受付後、シクロスポリンを服用中であることが判明した。疑義照会の結果、ロスバスタチンが削除された。</div>最も適切な組み合わせは？",
    "explanation": "ロスバスタチンとシクロスポリンは併用禁忌。相互作用なので902、交付後の照会なのでロ（50点）。"
  },
  {
    "text": "<strong>問題3</strong><div class=\"case-box\">外来患者。ロキソプロフェン錠60mgが処方された。かかりつけ薬剤師が薬歴を確認すると、以前同じ薬剤で蕁麻疹が出ていた。疑義照会の結果、アセトアミノフェン錠へ変更された。</div>最も適切な組み合わせは？",
    "explanation": "過去の副作用歴なので903。かかりつけ薬剤師による照会なのでハ（50点）。"
  },
  {
    "text": "<strong>問題4</strong><div class=\"case-box\">在宅患者。レボフロキサシン錠を服用予定であった。次回処方箋交付前に薬剤師が腎機能低下を確認し、維持用量の減量を提案した。提案が反映された処方箋を受け付けた。</div>最も適切な組み合わせは？",
    "explanation": "腎機能を考慮した減量なので905と1004。交付前の提案なのでイ（50点）。"
  },
  {
    "text": "<strong>問題5</strong><div class=\"case-box\">外来患者。アムロジピン錠5mgが28日分処方された。自宅に14日分の残薬があったため、疑義照会して14日分へ変更された。</div>最も適切な組み合わせは？",
    "explanation": "残薬調整のみは本加算の対象外。調剤時残薬調整加算の対象となり得ます。"
  },
  {
    "text": "<strong>問題6</strong><div class=\"case-box\">外来患者。体重15kgの小児に解熱目的でアセトアミノフェンが1回300mgで処方された。かかりつけ薬剤師ではない薬剤師が体重に対して過量と判断し、疑義照会の結果、1回150mgへ変更された。</div>最も適切な組み合わせは？",
    "explanation": "通常の小児1回量は10～15mg/kg。15kgでは150～225mgが目安。体重による変更なので904、ニ（30点）。"
  },
  {
    "text": "<strong>問題7</strong><div class=\"case-box\">在宅患者。アゼルニジピン錠を服用中で、毎日グレープフルーツジュースを飲んでいる。飲用の中止が難しいため、次回処方箋交付前に薬剤師が、相互作用の懸念がない患者に適した別の降圧薬への変更を提案し、反映された処方箋を受け付けた。</div>最も適切な組み合わせは？",
    "explanation": "グレープフルーツジュースはアゼルニジピンの血中濃度を上昇させるおそれがあります。飲食物との相互作用なので902、同種同効薬への変更なので1002。イ（50点）。"
  },
  {
    "text": "<strong>問題8</strong><div class=\"case-box\">在宅患者。アムロジピン普通錠を服用中で、嚥下困難により服用しづらいことが判明した。次回処方箋交付前にOD錠への変更を提案し、反映された処方箋を受け付けた。変更理由は年齢・体重等ではなく嚥下状態そのものとする。</div>最も適切な組み合わせは？",
    "explanation": "嚥下状態を考慮した変更なので907、剤形変更なので1003。イ（50点）。"
  },
  {
    "text": "<strong>問題9</strong><div class=\"case-box\">外来患者。かかりつけ薬剤師が処方された薬剤の用量について疑義照会した。処方医から変更不要との回答があり、処方箋どおりに調剤した。</div>最も適切な組み合わせは？",
    "explanation": "照会を行っても処方変更がなければ本加算は算定できません。"
  },
  {
    "text": "<strong>問題10</strong><div class=\"case-box\">外来患者。テルミサルタン錠が処方された。かかりつけ薬剤師ではない薬剤師が妊娠中であることを確認し、疑義照会の結果、別の降圧薬へ変更された。</div>最も適切な組み合わせは？",
    "explanation": "テルミサルタンは妊婦への投与が禁忌。妊婦への影響なので906、ニ（30点）。"
  },
  {
    "text": "<strong>問題11</strong><div class=\"case-box\">外来患者。ワルファリン錠が新規処方された。かかりつけ薬剤師が毎朝納豆を食べていることを確認した。納豆をやめることが難しく、疑義照会の結果、患者の疾患に適した別の抗凝固薬へ変更された。</div>最も適切な組み合わせは？",
    "explanation": "納豆のビタミンKはワルファリンの作用を弱めます。飲食物との相互作用なので902、ハ（50点）。"
  },
  {
    "text": "<strong>問題12</strong><div class=\"case-box\">在宅患者。ゾルピデム錠が朝食後の用法で処方される予定であった。薬剤師が次回処方箋交付前に用法の誤りを指摘し、就寝直前への変更を提案した。反映された処方箋を受け付けた。</div>最も適切な組み合わせは？",
    "explanation": "睡眠薬の服用時刻の誤りを防ぐための変更なので907、用法変更なので1005。イ（50点）。"
  },
  {
    "text": "<strong>問題13</strong><div class=\"case-box\">外来患者。アムロジピン錠5mgが処方されたが、薬局に在庫がなかった。疑義照会し、在庫のある同成分のOD錠へ変更された。変更理由は薬局の在庫不足のみであった。</div>最も適切な組み合わせは？",
    "explanation": "薬学的な問題ではなく、薬局の在庫事情のみを理由とする変更は本加算の対象外です。"
  },
  {
    "text": "<strong>問題14</strong><div class=\"case-box\">在宅患者。訪問時にロキソプロフェン錠とジクロフェナク錠の重複服用が判明した。次回処方箋交付前に一方の中止を提案し、薬剤が削除された処方箋を受け付けた。</div>最も適切な組み合わせは？",
    "explanation": "同効薬の重複投薬なので901。薬剤の中止は同種同効薬への変更・剤形・用量・用法の変更ではないため、その他1006と整理します。イ（50点）。"
  },
  {
    "text": "<strong>問題15</strong><div class=\"case-box\">在宅患者。処方箋受付後、かかりつけ薬剤師が、以前アモキシシリンでアレルギー症状が出た患者に同じ薬剤が処方されていることを確認した。疑義照会の結果、別の抗菌薬へ変更された。</div>最も適切な組み合わせは？",
    "explanation": "過去のアレルギー歴なので903。かかりつけ薬剤師でも在宅患者の交付後の照会はハではなくロ（50点）。"
  }
];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const submitAnswerButton = document.getElementById("submitAnswerButton");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

const resultScore = document.getElementById("resultScore");
const wrongAnswerText = document.getElementById("wrongAnswerText");
const resultForm = document.getElementById("resultForm");
const storeName = document.getElementById("storeName");
const userName = document.getElementById("userName");
const formError = document.getElementById("formError");
const sendButton = document.getElementById("sendButton");
const sendStatus = document.getElementById("sendStatus");
const retryButton = document.getElementById("retryButton");

let currentQuestionIndex = 0;
let correctCount = 0;
let wrongAnswers = [];
let answered = false;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => {
    item.classList.toggle("active", item === screen);
  });

  // 早見表はクイズ画面（2ページ目以降）だけ表示
  document.body.classList.toggle("quiz-mode", screen === quizScreen);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetQuizState() {
  currentQuestionIndex = 0;
  correctCount = 0;
  wrongAnswers = [];
  answered = false;

  feedback.className = "feedback hidden";
  feedback.innerHTML = "";
  nextButton.classList.add("hidden");
  retryButton.disabled = true;

  sendStatus.className = "send-status hidden";
  sendStatus.textContent = "";
  formError.className = "form-error hidden";
  formError.textContent = "";

  sendButton.disabled = false;
  sendButton.textContent = "結果を送信する";

  resultForm.reset();
}

function startQuiz() {
  resetQuizState();
  showScreen(quizScreen);
  renderQuestion();
}

const selectedAnswers = { category: null, reason: null, change: null };

function renderQuestion() {
  answered = false;
  selectedAnswers.category = null;
  selectedAnswers.reason = null;
  selectedAnswers.change = null;
  const q = questions[currentQuestionIndex];
  progressText.textContent = `問題${currentQuestionIndex + 1} / ${questions.length}`;
  scoreText.textContent = `正解 ${correctCount}`;
  progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  questionText.innerHTML = q.text;
  answerButtons.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "selection-grid";
  const groups = [
    { key: "category", title: "加算区分", options: ["イ", "ロ", "ハ", "ニ", "算定なし"] },
    { key: "reason", title: "内容の要点", options: ["901", "902", "903", "904", "905", "906", "907", "なし"] },
    { key: "change", title: "変更内容", options: ["1002", "1003", "1004", "1005", "1006", "なし"] }
  ];
  groups.forEach(group => {
    const column = document.createElement("div");
    column.className = "selection-column";
    const heading = document.createElement("div");
    heading.className = "selection-heading";
    heading.textContent = group.title;
    column.appendChild(heading);
    group.options.forEach(value => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "selection-button";
      button.textContent = value;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        if (answered) return;
        selectedAnswers[group.key] = value;
        column.querySelectorAll(".selection-button").forEach(b => {
          const active = b === button;
          b.classList.toggle("selected", active);
          b.setAttribute("aria-pressed", String(active));
        });
        submitAnswerButton.disabled = !Object.values(selectedAnswers).every(Boolean);
      });
      column.appendChild(button);
    });
    grid.appendChild(column);
  });
  answerButtons.appendChild(grid);
  submitAnswerButton.disabled = true;
  submitAnswerButton.classList.remove("hidden");
  feedback.className = "feedback hidden";
  feedback.innerHTML = "";
  nextButton.classList.add("hidden");
}

function answerQuestion() {
  if (answered || !Object.values(selectedAnswers).every(Boolean)) return;
  answered = true;
  const q = questions[currentQuestionIndex];
  const correct = answerKeys[currentQuestionIndex];
  const picked = [selectedAnswers.category, selectedAnswers.reason, selectedAnswers.change];
  const isCorrect = picked.every((value, index) => value === correct[index]);
  answerButtons.querySelectorAll(".selection-button").forEach(b => { b.disabled = true; });
  submitAnswerButton.classList.add("hidden");
  if (isCorrect) {
    correctCount += 1;
    feedback.className = "feedback correct";
    feedback.innerHTML = `⭕ 正解！<span class="explanation">${q.explanation}</span>`;
  } else {
    wrongAnswers.push(currentQuestionIndex + 1);
    feedback.className = "feedback wrong";
    feedback.innerHTML = `❌ 不正解<br>あなたの回答：${picked.join(" ＋ ")}<br>正解：${correct.join(" ＋ ")}<span class="explanation">${q.explanation}</span>`;
  }
  scoreText.textContent = `正解 ${correctCount}`;
  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "結果を見る" : "次の問題へ";
  nextButton.classList.remove("hidden");
}

function goNext() {
  if (!answered) return;

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  showResult();
}

function showResult() {
  resultScore.textContent =
    `${questions.length}問中 ${correctCount}問正解！`;

  wrongAnswerText.textContent =
    wrongAnswers.length === 0
      ? "全問正解です🎉"
      : `誤答番号：${wrongAnswers.join("、")}`;

  showScreen(resultScreen);
}

async function submitResult(event) {
  event.preventDefault();

  const difficultyInput =
    resultForm.querySelector('input[name="difficulty"]:checked');

  const payload = {
    storeName: storeName.value.trim(),
    userName: userName.value.trim(),
    difficulty: difficultyInput ? difficultyInput.value : "",
    scoreDisplay: `${correctCount}/${questions.length}`,
    wrongAnswers:
      wrongAnswers.length === 0 ? "なし" : wrongAnswers.join(",")
  };

  if (!payload.storeName || !payload.userName || !payload.difficulty) {
    formError.textContent =
      "店舗名・名前・難易度をすべて入力してください。";
    formError.classList.remove("hidden");
    return;
  }

  formError.classList.add("hidden");
  sendStatus.classList.remove("hidden");
  sendStatus.textContent = "送信中です…";
  sendButton.disabled = true;
  sendButton.textContent = "送信中…";

  const sendData = {
    quiz: QUIZ_NAME,
    store: payload.storeName,
    name: payload.userName,
    difficulty: payload.difficulty,
    score: payload.scoreDisplay,
    answers: payload.wrongAnswers
  };

  try {
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(sendData)
    });

    sendStatus.textContent = "✅ 結果を送信しました！";
    sendButton.textContent = "送信済み";
    retryButton.disabled = false;
  } catch (error) {
    console.error(error);
    sendStatus.textContent =
      "送信できませんでした。通信状況とApps ScriptのURLを確認してください。";
    sendButton.disabled = false;
    sendButton.textContent = "結果を送信する";
    retryButton.disabled = true;
  }
}

startButton.addEventListener("click", startQuiz);
submitAnswerButton.addEventListener("click", answerQuestion);
nextButton.addEventListener("click", goNext);
resultForm.addEventListener("submit", submitResult);
retryButton.addEventListener("click", startQuiz);
