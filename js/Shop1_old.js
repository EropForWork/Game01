var SHOP1_COLOR = {

}

function Go_To_Shop(e) {
  // let New_Shop = new createjs.Container();
  // New_Shop.name = 'SHOP_' + e;
  // New_Shop.addChild(Make_Shop(e));
  LaunchCanvas.addChild(Make_Shop(e));
  // LaunchCanvas.update();
}

function Make_Shop1() {
  let Korsina = new createjs.Shape();
  Korsina.graphics.setStrokeStyle(1).beginStroke(DISH_COLOR.puresha_b)
    .moveTo(-3, 267.1).lineTo(84.75, 209.5)
    .lineTo(209.2, 209.5)
    .lineTo(210.05, 291.75)
    .lineTo(166.1, 418.85)
    .lineTo(-3, 418.85).closePath();
  Korsina.graphics.moveTo(148.5, 209.5).lineTo(55.5, 278).lineTo(55.5, 418.85);
  Korsina.graphics.moveTo(209.2, 209.5).lineTo(166.1, 278).lineTo(-3, 278);
  Korsina.graphics.moveTo(209.2, 233.15).lineTo(166.1, 314.7).lineTo(-3, 314.7);
  Korsina.graphics.moveTo(209.2, 253.8).lineTo(166.1, 351.45).lineTo(-3, 351.45);
  Korsina.graphics.moveTo(209.2, 272.1).lineTo(166.1, 390.95).lineTo(-3, 390.95);
  Korsina.graphics.moveTo(166.1, 278).lineTo(166.1, 418.85);
  Korsina.setTransform(0, 130, 1.5, 1.5);

  let Korsina2 = Korsina.clone(true);
  Korsina2.setTransform(WIN_W, 130, -1.5, 1.5, 0, 0);

  let Con = new createjs.Container();
  Con.addChild(Korsina, Korsina2)
  return Con;
}

function Make_Shop(e) {
  // let Plate = new createjs.Bitmap("images/Tableware/Plate.png");
  // let Becon = new createjs.Bitmap("images/Meal/Omelette/Becon.png");
  // let Eggs = new createjs.Bitmap("images/Meal/Omelette/Eggs.png");
  // let Green1 = new createjs.Bitmap("images/Meal/Omelette/Green1.png");
  // let Tomato = new createjs.Bitmap("images/Meal/Omelette/Tomato.png");
  let NewShop = new createjs.Container();
  // new createjs.Tween.get().to({}, 0).call(Load_Meal_Pics, [
  //   [Plate, Becon, Eggs, Green1, Tomato], 'Omlette', NewMeal
  // ]);
  return NewShop;
}
