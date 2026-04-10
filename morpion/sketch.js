let size = 200;
let bot = "O";

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(30);

  drawGrid();
  drawMarks();
}

function drawGrid() {
  stroke("white");
  strokeWeight(5);

  for (let i = 1; i < 3; i++) {
    line(i * size, 0, i * size, 600);
    line(0, i * size, 600, i * size);
  }
}

function mousePressed() {
  let col = floor(mouseX / size);
  let row = floor(mouseY / size);

  if (col < 0 || col > 2 || row < 0 || row > 2) return;

  if (board[row][col] === "") {
    board[row][col] = "X";

    if (checkWin("X")) {
      setTimeout(() => alert("Tu gagnes 😎"), 50);
      return;
    }

    botPlay();
  }
}

function botPlay() {

  // 🏆 1. essayer de gagner
  let move = findBestMove(bot);
  if (move) {
    board[move.row][move.col] = bot;
    if (checkWin(bot)) setTimeout(() => alert("Le bot gagne 🤖"), 50);
    return;
  }

  // 🛑 2. bloquer le joueur
  move = findBestMove("X");
  if (move) {
    board[move.row][move.col] = bot;
    return;
  }

  // 🎲 3. coup aléatoire
  let empty = [];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === "") {
        empty.push({ row: r, col: c });
      }
    }
  }

  if (empty.length > 0) {
    let choice = random(empty);
    board[choice.row][choice.col] = bot;

    if (checkWin(bot)) setTimeout(() => alert("Le bot gagne 🤖"), 50);
  }
}

function findBestMove(player) {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {

      if (board[r][c] === "") {
        board[r][c] = player;

        if (checkWin(player)) {
          board[r][c] = "";
          return { row: r, col: c };
        }

        board[r][c] = "";
      }
    }
  }
  return null;
}

function drawMarks() {
  stroke(255);
  strokeWeight(6);

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {

      let x = c * size;
      let y = r * size;

      if (board[r][c] === "X") {
        // X
        line(x + 40, y + 40, x + 160, y + 160);
        line(x + 160, y + 40, x + 40, y + 160);
      }

      if (board[r][c] === "O") {
        // O
        noFill();
        circle(x + 100, y + 100, 120);
      }
    }
  }
}

function checkWin(p) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === p && board[i][1] === p && board[i][2] === p) return true;
    if (board[0][i] === p && board[1][i] === p && board[2][i] === p) return true;
  }

  if (board[0][0] === p && board[1][1] === p && board[2][2] === p) return true;
  if (board[0][2] === p && board[1][1] === p && board[2][0] === p) return true;

  return false;
}
function resetGame() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
}
