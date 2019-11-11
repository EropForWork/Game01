var DishHello = [
  ['ru', 'Выбирай блюдо, которое будем готовить!'],
  ['en', "Choose the dish that we will cook!"]
];

var DishesArr = ['Pasta1', 'Omelette'];

let Carousel_Diff_X = 0;

function initFisrtDish() {
  MainCanvas.addChild(textHelloDish(), makeDishCarousel())
  MainCanvas.update();
  new createjs.Tween.get(MainCanvas.getChildByName('DISH_CHOICE')).to({
    alpha: 1
  }, 500);
}

function textHelloDish() {
  let text = 'А что за язык у тебя?';
  for (let i = 0; i < DishHello.length; i++) {
    if (DishHello[i][0] == language) {
      text = DishHello[i][1];
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
  // TopText.name = 'DISH_CHOICE';
  let NewCon = new createjs.Container();
  NewCon.name = 'DISH_CHOICE';
  NewCon.alpha = 0;
  NewCon.addChild(makeCloud(TopText.x - TopText.getMetrics().width / 2 - 5, TopText.y, TopText.getMetrics().width + 10, TopText.getMetrics().height + 10), TopText);
  return NewCon;
}

function makeDishCarousel() {
  let DishCarousel = new createjs.Container();
  DishCarousel.name = 'DISH_CAROUSEL';
  makeDishes(DishCarousel);
  makeDishCarouselCoor(DishCarousel);
  return DishCarousel;
}

function makeDishes(e) {
  for (let i = 0; i < DishesArr.length; i++) {
    let Dish = new createjs.Container();
    Dish.name = DishesArr[i];
    let NewImg = TempImgCon.getChildByName('Plate').clone();
    NewImg.alpha = 1;
    Dish.addChild(NewImg);
    for (let ii = 0; ii < TempImgCon.children.length; ii++) {
      if (TempImgCon.children[ii].image.src.indexOf(Dish.name) != -1) {
        let NewImg = TempImgCon.children[ii].clone();
        Dish.addChild(NewImg);
        NewImg.alpha = 1;
      }
    }
    loadMealPics(Dish);
    e.addChild(Dish);
  }
}

function makeDishCarouselCoor(e) {
  let diff = 50;
  let diffX = (Carousel_Diff_X / e.children.length) * 1.4 + diff;
  for (var i = 0; i < e.children.length; i++) {
    e.children[i].x = i * diffX;
    e.children[i].y = 200;
    e.children[i].children[e.children[i].children.length - 1].on('click', clickDish, null, true);
  }
  e.setTransform((WIN_W / 2 - (Carousel_Diff_X * 1.4) / 2) + (diff * (e.children.length - 1)) / 2);
}

function clickDish(e) {
  new createjs.Tween.get(MainCanvas.getChildByName('DISH_CAROUSEL')).to({
    alpha: 0
  }, 350);
  new createjs.Tween.get(MainCanvas.getChildByName('DISH_CHOICE')).to({
    alpha: 0
  }, 350);
  let FaryFace = MainCanvas.getChildByName('FARY_FACE');
  FaryFace.removeAllEventListeners('click');
  goToShop(e.currentTarget.parent.name);
}

function loadMealPics(e) {
  let newA = e.children;
  let Dish = e.name;

  for (var i = 0; i < newA.length; i++) {
    if (Dish == 'Omelette') {
      let newY = 100;
      if (i == 0) newA[i].setTransform(-150, 0, 1.4, 1.4);
      if (i == 1) newA[i].setTransform(210, -130 + newY);
      if (i == 2) newA[i].setTransform(0, 0 + newY);
      if (i == 3) newA[i].setTransform(0, 70 + newY);
      if (i == 4) newA[i].setTransform(30, 140 + newY);
    }
    if (Dish == 'Pasta1') {
      let newX = 150;
      let newY = 40;
      if (i == 0) newA[i].setTransform(-150, 0, 1.4, 1.4);
      if (i == 1) newA[i].setTransform(0 + newX, 0 + newY, 2, 2);
      if (i == 2) newA[i].setTransform(60 + newX, -30 + newY, 2, 2);
      if (i == 3) newA[i].setTransform(130 + newX, -30 + newY, 2, 2);
      if (i == 4) newA[i].setTransform(40 + newX, -10 + newY, 2, 2);
    }
  }
  findMaxScalePic(e);
}

function findMaxScalePic(e) {
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;
  for (var i = 0; i < 1; i++) {
    let maxW = e.children[i].image.naturalWidth;
    let maxH = e.children[i].image.naturalHeight;
    let oldX = e.children[i].x + e.children[i].regX;
    let oldY = e.children[i].y + e.children[i].regY;
    oldX > x1 ? x1 : x1 = oldX;
    oldY > y1 ? y1 : y1 = oldY;
    oldX + maxW < x2 ? x2 : x2 = oldX + maxW;
    oldY + maxH < y2 ? y2 : y2 = oldY + maxH;
  }
  let newW = (WIN_W / 100) * (MEAL_SCALE - 0.03) * 100;
  let newH = (WIN_H / 100) * (MEAL_SCALE - 0.03) * 100;
  let newS = 1;
  let maxW = x2 - x1;
  let maxH = y2 - y1;
  if (maxW > newW) {
    newS = (newW / (maxW / 100)) / 100;
  }
  if (maxH > newH) {
    var temp = (newH / (maxH / 100)) / 100;
    temp < newS ? newS = temp : newS;
  }
  e.addChild(makeDishRect(x1, y1, maxW*1.4, maxH*1.4));
  e.setTransform(0, 0, newS, newS);
  Carousel_Diff_X += maxW * newS;
}

function makeDishRect(x1, y1, maxW, maxH) {
  let Rect = new createjs.Shape();
  Rect.graphics.beginFill('white').drawRect(0, 0,  maxW, maxH);
  Rect.setTransform(x1, y1);
  Rect.alpha = 0.01;
  return Rect;
}
