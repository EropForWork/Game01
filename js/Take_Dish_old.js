var DishHello = [
  ['ru', 'Выбирай блюдо, которое будем готовить!'],
  ['en', "Choose the dish that we will cook!"]
];

var DISH_COLOR = {
  plate_white: '#F6F3EC',
  plate_grey: '#CAC0B6',
  plate_bottom: '#E9E6E0',
  kotletka: '#78130A',
  puresha_w: '#F6EF90',
  puresha_b: '#E7AD00'
}

function Init_Fisrt_Dish() {
  LaunchCanvas.addChild(Text_Hello_Dish(), Make_Dish_Carousel())
  LaunchCanvas.update();
  new createjs.Tween.get(LaunchCanvas.getChildByName('DISH_CHOICE')).to({
    alpha: 1
  }, 500);
}

function Text_Hello_Dish() {
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
  TopText.alpha = 0;
  TopText.name = 'DISH_CHOICE';
  return TopText;
}

function Make_Dish_Carousel() {
  let DishCarousel = new createjs.Container();
  DishCarousel.name = 'DISH_CAROUSEL';
  // DishCarousel.addChild(Make_Dish_Kartoshka_Kotletka());
  DishCarousel.addChild(Make_Finish_Omlette(), Make_Finish_Pasta1());
  for (var i = 0; i < DishCarousel.children.length; i++) {
    DishCarousel.children[i].on('click', Click_Dish)
  }
  return DishCarousel;
}

function Make_Plate() {
  let Plate = new createjs.Container();
  let Plate1 = new createjs.Shape();
  Plate1.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.plate_grey).beginFill(DISH_COLOR.plate_white)
    .drawEllipse(0, 0, 630, 285).closePath();
  Plate1.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.plate_grey)
    .moveTo(2, 160).quadraticCurveTo(100, 270, 315, 270).quadraticCurveTo(528, 270, 628, 160);

  let Plate2 = new createjs.Shape();
  Plate2.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.plate_grey).beginFill(DISH_COLOR.plate_bottom)
    .drawEllipse(55, 15, 520, 235).closePath();

  Plate.addChild(Plate1, Plate2);
  Plate.setTransform(280, 180);
  return Plate;
}

function Make_Dish_Kartoshka_Kotletka() {
  let Dish = new createjs.Container();

  let Kotletka1 = new createjs.Shape();
  Kotletka1.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.plate_grey).beginFill(DISH_COLOR.kotletka)
    .moveTo(21.75, 98.25)
    .quadraticCurveTo(82.8, 34.55, 126.85, 54.8)
    .quadraticCurveTo(207, 89, 205.25, 145)
    .lineTo(87.8, 212.9)
    .quadraticCurveTo(0, 150, 21.75, 98.25);
  Kotletka1.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.plate_grey)
    .moveTo(21.75, 98.25)
    .quadraticCurveTo(65, 230, 205.25, 145);

  let Kotletka2 = new createjs.Shape();
  Kotletka2.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.plate_grey).beginFill(DISH_COLOR.kotletka)
    .moveTo(85.6, 185.95)
    .quadraticCurveTo(195, 105, 298.2, 165.85)
    .quadraticCurveTo(311, 184, 314.25, 204.1)
    .quadraticCurveTo(270, 300, 90.6, 243.4)
    .quadraticCurveTo(75.4, 214.8, 85.6, 185.95);
  Kotletka2.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.plate_grey)
    .moveTo(85.6, 185.95)
    .quadraticCurveTo(270, 245, 298.2, 165.85);

  Kotletka1.setTransform(291.85, 167.75);
  Kotletka2.setTransform(291.85, 167.75);

  Dish.addChild(Make_Plate(), Make_Pureshka(), Kotletka1, Kotletka2);
  return Dish;
}

function Make_Pureshka() {
  let Pureshka = new createjs.Shape();
  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(195.8, 109.75)
    .quadraticCurveTo(200, 107, 206.85, 102.4)
    .quadraticCurveTo(223.35, 70, 260.1, 63.45)
    .quadraticCurveTo(291.2, 49, 321.95, 55.3)
    .quadraticCurveTo(319.45, 35.25, 356.35, 35.25)
    .quadraticCurveTo(370.35, 22.1, 394.05, 24.6)
    .quadraticCurveTo(405.9, 26.4, 405.9, 54.05)
    .quadraticCurveTo(436.95, 51.55, 428.05, 65.05)
    .quadraticCurveTo(489.45, 83.5, 492.7, 104.75)
    .quadraticCurveTo(536.15, 109.75, 527, 126.15)
    .quadraticCurveTo(519.6, 152.25, 494.45, 167.55)
    .quadraticCurveTo(478.2, 208.55, 441.95, 203.55)
    .quadraticCurveTo(415.25, 230.25, 342.45, 227.75)
    .quadraticCurveTo(313.8, 242.55, 301.4, 237.55)
    .quadraticCurveTo(282.2, 232.75, 260.1, 197.45)
    .quadraticCurveTo(233.55, 187.45, 231.05, 173.85)
    .quadraticCurveTo(203.45, 162.55, 201.85, 152.25)
    .quadraticCurveTo(189.15, 117.5, 195.8, 109.75);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(260.1, 63.45)
    .quadraticCurveTo(252.2, 70.4, 253.3, 77.7)
    .quadraticCurveTo(228.55, 101.3, 231.05, 173.85);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(253.3, 77.7)
    .lineTo(252.3, 83.5)
    .quadraticCurveTo(233.55, 101.3, 270.6, 140.4)
    .quadraticCurveTo(258, 139.2, 260.1, 149.75)
    .quadraticCurveTo(242.2, 173.85, 231.05, 173.85);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(252.3, 83.5)
    .quadraticCurveTo(249.8, 96.3, 273.1, 117.5)
    .quadraticCurveTo(288.7, 139.2, 367.85, 172.2)
    .quadraticCurveTo(410.9, 173.85, 423.05, 162.55)
    .quadraticCurveTo(454.55, 173.85, 494.45, 167.55);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(260.1, 149.75)
    .quadraticCurveTo(296.4, 152.25, 347.45, 192.45)
    .quadraticCurveTo(356.35, 206.3, 441.95, 203.55);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(260.1, 197.45)
    .quadraticCurveTo(298.9, 222.75, 342.45, 227.75);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(303.9, 55.3)
    .quadraticCurveTo(291.2, 56.55, 286.2, 65.05)
    .quadraticCurveTo(278.1, 68.45, 277.2, 79.8)
    .quadraticCurveTo(283.7, 92, 303.9, 101.3)
    .quadraticCurveTo(339.95, 139.2, 421.7, 139.2)
    .quadraticCurveTo(459.7, 149.75, 487.7, 134.2)
    .quadraticCurveTo(504.35, 119.75, 492.7, 104.75);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(303.9, 101.3)
    .quadraticCurveTo(314.45, 110.75, 332.6, 111.35)
    .quadraticCurveTo(361.35, 124, 396.15, 122.5)
    .quadraticCurveTo(412.75, 119.75, 415.25, 107.4)
    .quadraticCurveTo(433.05, 101.3, 463.3, 114.75)
    .quadraticCurveTo(474.1, 121.15, 492.7, 104.75);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(415.25, 107.4)
    .quadraticCurveTo(431.5, 89.6, 428.05, 65.05);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(286.2, 65.05)
    .quadraticCurveTo(331.95, 102.15, 351.35, 93.55)
    .quadraticCurveTo(384.85, 89.6, 405.9, 54.05);

  Pureshka.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b).beginFill(DISH_COLOR.puresha_w)
    .moveTo(321.95, 55.3)
    .quadraticCurveTo(344.95, 65.05, 365.35, 55.3)
    .quadraticCurveTo(367.85, 44.3, 356.35, 35.25);

  Pureshka.setTransform(291.85, 167.75);
  return Pureshka;
}

function Click_Dish(e) {
  Jump(LaunchCanvas.getChildByName('FARY_FACE'));
  new createjs.Tween.get(LaunchCanvas.getChildByName('DISH_CAROUSEL')).to({
    alpha: 0
  }, 350);
  new createjs.Tween.get(LaunchCanvas.getChildByName('DISH_CHOICE')).to({
    alpha: 0
  }, 350);
  new createjs.Tween.get(LaunchCanvas.getChildByName('FARY_FACE')).to({
    x: WIN_W / 2 - 100
  }, 350);
  Go_To_Shop();
}

function Make_Finish_Omlette() {
  let Plate = new createjs.Bitmap("images/Tableware/Plate.png");
  let Becon = new createjs.Bitmap("images/Meal/Omelette/Becon.png");
  let Eggs = new createjs.Bitmap("images/Meal/Omelette/Eggs.png");
  let Green1 = new createjs.Bitmap("images/Meal/Omelette/Green1.png");
  let Tomato = new createjs.Bitmap("images/Meal/Omelette/Tomato.png");
  new createjs.Tween.get().to({}, 0).call(Load_Meal_Pics, [
    [Plate, Becon, Eggs, Green1, Tomato], 'Omlette'
  ]);
}

function Make_Finish_Pasta1() {
  let Plate = new createjs.Bitmap("images/Tableware/Plate.png");
  let Green2 = new createjs.Bitmap("images/Meal/Pasta1/Green2.png");
  let Pasta1 = new createjs.Bitmap("images/Meal/Pasta1/Pasta1.png");
  let Sous1 = new createjs.Bitmap("images/Meal/Pasta1/Sous1.png");
  let Spices1 = new createjs.Bitmap("images/Meal/Pasta1/Spices1.png");
  new createjs.Tween.get().to({}, 0).call(Load_Meal_Pics, [
    [Plate, Pasta1, Sous1, Green2, Spices1], 'Pasta1'
  ]);
}

function Load_Meal_Pics(newA, Dish) {
  let NewMeal = new createjs.Container();
  for (var i = 0; i < newA.length; i++) {
    NewMeal.addChild(newA[i]);
    if (Dish == 'Omlette') {
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
  NewMeal.name = Dish;
  LaunchCanvas.addChild(NewMeal);
  Find_Max_Scale_Pic(NewMeal);
}

function Find_Max_Scale_Pic(e) {
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;
  for (var i = 0; i < e.children.length; i++) {
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
    let temp = (newW / (maxW / 100)) / 100;
    temp < newS ? newS = temp : newS;
  }
  e.setTransform(0, 0, newS, newS)
}
