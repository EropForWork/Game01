function goToKitchen(BasCon, FaryFace) {
  let KitchenCon = new createjs.Container;
  KitchenCon.name = 'Kitchen';
  MainCanvas.addChild(KitchenCon);

  let KitchenMain = TempImgCon.getChildByName('KitchenMain').clone();
  let Board1 = TempImgCon.getChildByName('Board1').clone();
  let Knife1 = TempImgCon.getChildByName('Knife1').clone();
  let Stove = TempImgCon.getChildByName('Stove').clone();
  KitchenMain.alpha = Board1.alpha = Knife1.alpha = Stove.alpha = 1;
  KitchenCon.addChild(KitchenMain, Board1, Knife1, Stove, FaryFace, BasCon);

  Board1.setTransform(2700, 3700, 6, 6);
  Knife1.setTransform(2400, 3900, 0.8, 0.8, 325);
  Stove.setTransform(5500, 3800, 1.1, 1);

  let Shop = MainCanvas.getChildByName('NewShop');
  MainCanvas.removeChild(Shop);
  BasCon.setTransform(6300, 2000, 1.3, 1.3);
  // Работаем с Фейри
  let NewS = KitchenCon.scaleX * 7.65;
  let NewY = KitchenCon.y + 1250 * KitchenCon.scaleY;
  FaryFace.setTransform(KitchenMain.image.naturalWidth / 2 - (150 * NewS) * 2, NewY, NewS, NewS);
  let maxW = KitchenCon.getChildByName('KitchenMain').image.naturalWidth * KitchenCon.scaleX;
  let maxH = KitchenCon.getChildByName('KitchenMain').image.naturalHeight * KitchenCon.scaleY;
  let NewMask = new createjs.Shape();
  NewMask.graphics.beginFill('red').drawRect(0, 0, maxW, maxH - 1120 * KitchenCon.scaleY);
  NewMask.setTransform(KitchenCon.x, KitchenCon.y);
  FaryFace.mask = NewMask;
  let Hat = TempImgCon.getChildByName('Hat').clone();
  Hat.alpha = 1;
  Hat.setTransform(60, 20, 0.6, 0.7);
  let Apron = TempImgCon.getChildByName('Apron').clone();
  Apron.alpha = 1;
  Apron.setTransform(75, 190, 0.8, 1, -7);
  FaryFace.addChild(Hat, Apron);

  for (let i = 0; i < BasCon.children.length; i++) {
    BasCon.children[i].regX = BasCon.children[BasCon.children.length - 1].x - BasCon.children[i].x;
    BasCon.children[i].regY = BasCon.children[BasCon.children.length - 1].y - BasCon.children[i].y;
    BasCon.children[i].x = 0;
    BasCon.children[i].y = 0;
  }

  for (let i = 0; i < MainCanvas.children.length; i++) {
    if (MainCanvas.children[i].name == 'FARY_FACE') {
      let Fary = MainCanvas.children.splice(i, 1);
      MainCanvas.addChild(Fary[0]);
      break;
    }
  }

  makeActiveZones(KitchenCon);

  scaleKitchen(KitchenCon);
  BasCon.addChild(makeDishRect(0, 0, BasCon.children[BasCon.children.length - 1].image.naturalWidth * BasCon.children[BasCon.children.length - 1].scaleX, BasCon.children[BasCon.children.length - 1].image.naturalHeight * BasCon.children[BasCon.children.length - 1].scaleY));
  BasCon.children[BasCon.children.length - 1].on('click', startCook, null, true);
}

function scaleKitchen(e) {
  let x1 = e.getChildByName('KitchenMain').x + e.getChildByName('KitchenMain').regX;
  let y1 = e.getChildByName('KitchenMain').y + e.getChildByName('KitchenMain').regY;
  let maxW = e.getChildByName('KitchenMain').image.naturalWidth;
  let maxH = e.getChildByName('KitchenMain').image.naturalHeight;
  let newS = (WIN_H / (maxH / 100)) / 100;
  let DiffX = maxW * newS - WIN_W;
  e.setTransform(-DiffX / 2, 0, newS, newS);
}

function makeActiveZones(e) {
  let ZCon = [{
    name: 'Sink',
    x: 5100,
    y: 2200,
    w: 1350,
    h: 800
  }, {
    name: 'Board1',
    x: 2400,
    y: 3400,
    w: 2200,
    h: 800
  }, {
    name: 'Stove',
    x: 5400,
    y: 3700,
    w: 1900,
    h: 700
  }]
  let ActiveZoneCon = new createjs.Container();
  ActiveZoneCon.name = 'ActiveZoneCon';
  for (var i = 0; i < ZCon.length; i++) {
    let NewZone = new createjs.Shape();
    NewZone.graphics.beginFill('white').drawRect(0, 0, ZCon[i].w, ZCon[i].h);
    NewZone.setTransform(ZCon[i].x, ZCon[i].y);
    NewZone.name = ZCon[i].name;
    NewZone.alpha = 0.01;
    ActiveZoneCon.addChild(NewZone);
  }
  e.addChild(ActiveZoneCon);
}

function startCook() {
  let KitchenCon = MainCanvas.getChildByName('Kitchen');
  let BasketCon = KitchenCon.getChildByName('Basket');

  // нужно найти максимальную ширину облака выбора товаров
  let CloudW = (WIN_W / 100) * 80;
  let CloudH = (WIN_H / 100) * 20;
  let CloudS = ((CloudW / KitchenCon.scaleX) / (CloudW / 100)) / 100;
  let CloudX = (WIN_W / 100) * 10 * CloudS;
  let CloudY = (WIN_H / 100) * 5 * CloudS;
  KitchenCon.addChild(makeCloud(CloudX - KitchenCon.x * CloudS, CloudY - KitchenCon.y * CloudS, CloudW, CloudH, 0.8));
  let Cloud = KitchenCon.getChildByName('Cloud');
  Cloud.scaleX = Cloud.scaleY = CloudS;

  let GoodsCon = new createjs.Container();
  GoodsCon.name = 'GoodsCon';
  let GoodMaxH = 0;
  for (let i = 0; i < BasketCon.children.length - 2; i++) {
    BasketCon.children[i].setTransform(Cloud.x, Cloud.y, BasketCon.children[i].scaleX, BasketCon.children[i].scaleY, 0, 0, 0, 0, 0)
    GoodMaxH < BasketCon.children[i].image.naturalHeight * BasketCon.children[i].scaleY ? GoodMaxH = BasketCon.children[i].image.naturalHeight * BasketCon.children[i].scaleY : GoodMaxH;
    GoodsCon.addChild(BasketCon.children[i]);
  }
  KitchenCon.addChild(GoodsCon);
  KitchenCon.removeChild(BasketCon);

  // Найти макимально высокий товар и сделать его высоту на 20% меньше высоты облака
  let GoodsScale = (((Cloud.children[0].graphics._activeInstructions[0].h * Cloud.scaleY) / 100) * 80) / GoodMaxH;
  let GoodsMinW = 0;
  for (var i = 0; i < GoodsCon.children.length; i++) {
    GoodsCon.children[i].scaleX *= GoodsScale;
    GoodsCon.children[i].scaleY *= GoodsScale;
    GoodsMinW += GoodsCon.children[i].image.naturalWidth * GoodsCon.children[i].scaleX;
  }
  // Если общая ширина товаров меньше чем ширина облака, то всё хорошо, продолжаем
  if (GoodsMinW < Cloud.children[0].graphics._activeInstructions[0].w * Cloud.scaleY) {
    // нужно найти расстояние между всеми товарами
    let DiffX = (Cloud.children[0].graphics._activeInstructions[0].w * Cloud.scaleY - GoodsMinW) / (GoodsCon.children.length + 1);
    let NextW = 0;
    let CountGoods = GoodsCon.children.length;
    for (var i = 0; i < CountGoods; i++) {
      let NewX = NextW + DiffX * (i + 1);
      GoodsCon.children[i].x += NewX;
      NextW += GoodsCon.children[i].image.naturalWidth * GoodsCon.children[i].scaleX;
      let DiffY = Cloud.children[0].graphics._activeInstructions[0].h * Cloud.scaleY - GoodsCon.children[i].image.naturalWidth * GoodsCon.children[i].scaleX;
      GoodsCon.children[i].y += DiffY / 2;
      GoodsCon.addChild(makeDishRect(GoodsCon.children[i].x, GoodsCon.children[i].y, GoodsCon.children[i].image.naturalWidth * GoodsCon.children[i].scaleX, GoodsCon.children[i].image.naturalHeight * GoodsCon.children[i].scaleY));
      GoodsCon.children[GoodsCon.children.length - 1].name = 'Rect' + GoodsCon.children[i].name;
      GoodsCon.children[GoodsCon.children.length - 1].on('mousedown', takeDishFisrtCoor);
      GoodsCon.children[GoodsCon.children.length - 1].on('pressup', setDishLastCoor);
      GoodsCon.children[i].startCoor = {
        x: GoodsCon.children[i].x,
        y: GoodsCon.children[i].y
      };
      // нужно дать цикличную анимацию товарам
      makeRandomGoodAnim(GoodsCon.children[i]);
    }
  }

  // Нужно дать евент перемещения при зажатии кнопки
  // Сделать зоны активаторы для товаров
  //РАСХОЖДЕНИЕ!//
  //1// не разрешать товарам проходить неверный путь
  //2// Разрешать и тогда итоговое блюдо будет разным
  // Сделать для каждого товара переменную с данными, что нужно сделать с товаром и в какой очереди
}

function makeRandomGoodAnim(e) {
  let Dish = e;
  let DishRect = e.parent.getChildByName('Rect' + Dish.name);
  let DiffX = Math.floor(-100 + Math.random() * (100 + 1 - (-100)))
  let newX = Dish.startCoor.x + DiffX;
  let DiffY = Math.floor(-100 + Math.random() * (100 + 1 - (-100)))
  let newY = Dish.startCoor.y + DiffY;
  let RandomTime = Math.floor(600 + Math.random() * (1000 + 1 - (600)))
  new createjs.Tween.get(DishRect).to({x:newX, y:newY}, RandomTime);
  new createjs.Tween.get(Dish).to({x:newX, y:newY}, RandomTime).call(makeRandomGoodAnim, [e]);
}

function takeDishFisrtCoor(e) {
  let Pic = this.parent.getChildByName(this.name.substring(4));
  let PosGlobPic = Pic.globalToLocal(e.stageX, e.stageY);
  if (!this.hasEventListener('pressmove'))
    this.on('pressmove', moveGood, null, false, [PosGlobPic]);
  createjs.Tween.removeTweens(Pic);
  createjs.Tween.removeTweens(this);
}

function moveGood(e, data) {
  let Pic = this.parent.getChildByName(this.name.substring(4));
  let PosGlobPic = Pic.globalToLocal(e.stageX, e.stageY);
  console.log(data[0]);
  this.x = Pic.x += PosGlobPic.x - data[0].x;
  this.y = Pic.y += PosGlobPic.y - data[0].y;
}

function setDishLastCoor(e) {
  this.removeAllEventListeners('pressmove');
  let Pic = this.parent.getChildByName(this.name.substring(4));
  let KitchenCon = MainCanvas.getChildByName('Kitchen');
  let Act;
  for (let i = 0; i < KitchenCon.getChildByName('ActiveZoneCon').children.length; i++) {
    if (compareRectRect(this, KitchenCon.getChildByName('ActiveZoneCon').children[i])) {
      Act = KitchenCon.getChildByName('ActiveZoneCon').children[i];
    }
  }
  if (Act != null) {
    makeCookingAction({
      pic: Pic,
      rect: this
    }, Act);
  } else {
    this.x = Pic.x = Pic.startCoor.x;
    this.y = Pic.y = Pic.startCoor.y;
    makeRandomGoodAnim(Pic);
  }
}

function makeCookingAction(Good, Act) {
  console.log(Good, Act);
}

function compareRectRect(rect1, rect2) {
  var Rect1C = {
    x: rect1.x,
    y: rect1.y,
    w: rect1.graphics._activeInstructions[0].w,
    h: rect1.graphics._activeInstructions[0].h
  };
  var Rect2C = {
    x: rect2.x,
    y: rect2.y,
    w: rect2.graphics._activeInstructions[0].w,
    h: rect2.graphics._activeInstructions[0].h
  };

  if (Rect1C.x >= Rect2C.x - Rect1C.w && Rect1C.x <= Rect2C.x + Rect2C.w &&
    Rect1C.y >= Rect2C.y - Rect1C.h && Rect1C.y <= Rect2C.y + Rect2C.h) {
    return true;
  } else {
    return false;
  }
}
