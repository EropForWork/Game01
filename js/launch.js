var MainCanvasHTML5;
var MainCanvas;
var FaryCanvasHTML5;
var FaryCanvas;
const WIN_W = window.visualViewport.width;
const WIN_H = window.visualViewport.height;
const MEAL_SCALE = 0.2;
var MealGoodsArr = [];

var GameName = [
  ['ru', 'Привет! Давай готовить с Тоби и Фари!'],
  ['en', "Hello! Let's cook with Toby and Fary!"]
];

var language = window.navigator ? (window.navigator.language ||
  window.navigator.systemLanguage ||
  window.navigator.userLsanguage) : "ru";
language = language.substr(0, 2).toLowerCase();

function initLogin() {
  MainCanvasHTML5 = document.getElementById('mainCanvas'); // Для HTML5
  MainCanvasHTML5.width = WIN_W;
  MainCanvasHTML5.height = WIN_H;
  MainCanvas = new createjs.Stage(MainCanvasHTML5);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", MainCanvas);
  MainCanvas.enableMouseOver(60);
  createjs.Touch.enable(MainCanvas);
  addFaceFary();
  makeHelloText();
  loadImage();
  makeCloud(100, 100, 200, 100);
}

function makeHelloText() {
  let text = 'А что за язык у тебя?';
  for (let i = 0; i < GameName.length; i++) {
    if (GameName[i][0] == language) {
      text = GameName[i][1];
      break;
    }
  }
  let TopText = new createjs.Text(text);
  TopText.font = "50px Consolas";
  TopText.textAlign = "center";
  TopText.lineWidth = WIN_W - 50;
  TopText.lineHeight = 50;
  TopText.x = WIN_W / 2;
  TopText.y = 20;
  let NewCon = new createjs.Container();
  NewCon.name = 'LoginText';
  NewCon.addChild(makeCloud(TopText.x - TopText.getMetrics().width / 2 - 5, TopText.y, TopText.getMetrics().width + 10, TopText.getMetrics().height + 10), TopText);
  MainCanvas.addChild(NewCon);
  MainCanvas.update();
}

function textLoginDis() {
  new createjs.Tween.get(MainCanvas.getChildByName('LoginText')).to({
    alpha: 0
  }, 1500).call(initFisrtDish);
}

function makeCloud(x1 = 0, y1 = 0, w = 50, h = 50, a = 1) {
  x1 = Math.floor(x1);
  y1 = Math.floor(y1);
  w = Math.floor(w);
  h = Math.floor(h);
  let NewR = new createjs.Shape();
  NewR.graphics.beginFill('#dddddd').drawRect(-0.5, -0.5, w + 1, h + 1);

  let CurveCount = (w * 2 + h * 2) / 5;
  let NewCloud = new createjs.Shape();
  NewCloud.graphics.setStrokeStyle(2).beginStroke('#5ab2ec').beginFill('#dddddd');

  for (let i = 0; i < CurveCount; i++) {
    let Coor = {
      'StartX': Math.floor(-10 + Math.random() * (10 + 1 - (-10))),
      'StartY': Math.floor(-10 + Math.random() * (10 + 1 - (-10))),
      'CpX': Math.floor(10 + Math.random() * (20 + 1 - 10)),
      'CpY': Math.floor(10 + Math.random() * (20 + 1 - 10)),
      'LastX': Math.floor(10 + Math.random() * (20 + 1 - 10)),
      'LastY': Math.floor(10 + Math.random() * (20 + 1 - 10))
    };
    let LastGraph = NewCloud.graphics._activeInstructions[NewCloud.graphics._activeInstructions.length - 1];

    if (LastGraph == undefined) {
      Coor.StartX = 0;
      Coor.CpX = 0 + Math.abs(Coor.LastX) / 2;
      Coor.LastX = Math.abs(Coor.LastX) + 0;
      Coor.StartY = 0;
      Coor.LastY = 0;
      Coor.CpY = 0 - Coor.CpY;
    } else {
      // 1
      if (LastGraph.x < 0 + w && LastGraph.y == 0) {
        Coor.StartX = LastGraph.x;
        Coor.CpX = LastGraph.x + Coor.LastX / 2;
        if (Coor.LastX + LastGraph.x >= 0 + w)
          Coor.LastX = 0 + w;
        else
          Coor.LastX = Coor.LastX + LastGraph.x;
        Coor.StartY = 0;
        Coor.LastY = 0;
        Coor.CpY = 0 - Coor.CpY;
        if (Coor.LastX > 0 + w - 10)
          Coor.LastX = 0 + w;
        // 2
      } else if (LastGraph.x >= 0 + w && LastGraph.y < 0 + h) {
        if (LastGraph.x > 0 + w)
          Coor.StartX = LastGraph.x;
        else
          Coor.StartX = 0 + w;
        Coor.LastX = 0 + w;
        Coor.CpX += 0 + w;
        Coor.StartY = LastGraph.y;
        Coor.CpY = LastGraph.y + Coor.LastY / 2;
        if (Coor.LastY + LastGraph.y >= 0 + h)
          Coor.LastY = 0 + h;
        else
          Coor.LastY = Coor.LastY + LastGraph.y;
        if (Coor.LastY > 0 + h - 10)
          Coor.LastY = 0 + h;
        // 3
      } else if (LastGraph.x >= 0 && LastGraph.y >= 0 + h) {
        if (LastGraph.y > 0 + h)
          Coor.StartY = LastGraph.y;
        else
          Coor.StartY = 0 + h;
        Coor.LastY = 0 + h;
        Coor.CpY += 0 + h;
        Coor.StartX = LastGraph.x;
        Coor.CpX = LastGraph.x - Coor.LastX / 2;
        if (LastGraph.x - Coor.LastX <= 0)
          Coor.LastX = 0 - 0.01;
        else
          Coor.LastX = LastGraph.x - Coor.LastX;
        if (Coor.LastX < 0 + 10)
          Coor.LastX = 0 - 0.01;
        // 4
      } else {
        if (LastGraph.x < 0)
          Coor.StartX = LastGraph.x;
        else
          Coor.StartX = 0;
        if (LastGraph.y <= 0 + 20) {
          Coor.CpX = 0 - Coor.CpX;
          Coor.LastX = 0;
          Coor.StartY = LastGraph.y;
          Coor.LastY = 0;
          Coor.CpY = 0 + Coor.CpY / 2;
          NewCloud.graphics.moveTo(Coor.StartX, Coor.StartY).quadraticCurveTo(Coor.CpX, Coor.CpY, Coor.LastX, Coor.LastY);
          break;
        }
        Coor.CpX = LastGraph.x - Coor.CpX;
        Coor.LastX = 0;
        Coor.StartY = LastGraph.y;
        Coor.CpY = LastGraph.y - Math.abs(Coor.LastY) / 2;
        Coor.LastY = LastGraph.y - Math.abs(Coor.LastY);
      }
    }

    NewCloud.graphics.moveTo(Coor.StartX, Coor.StartY).quadraticCurveTo(Coor.CpX, Coor.CpY, Coor.LastX, Coor.LastY);
  }
  let CloudCon = new createjs.Container();
  CloudCon.name = 'Cloud';
  CloudCon.addChild(NewR, NewCloud);
  CloudCon.alpha = a;
  CloudCon.setTransform(x1, y1);
  return CloudCon;
}
