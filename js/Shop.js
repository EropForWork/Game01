function goToShop(e) {
  MainCanvas.addChild(makeShop(e));
}

function makeShop(e) {
  let NewShop = new createjs.Container();
  NewShop.alpha = 0;
  NewShop.name = 'NewShop';
  MealGoodsArr.length = 0;
  for (let i = 0; i < TempImgCon.children.length; i++) {
    if (TempImgCon.children[i].image.src.indexOf(e) != -1) {
      let MaxDishGoodname = TempImgCon.children[i].name;
      let DishGoodname = MaxDishGoodname.replace(/[0-9]/g, '');
      if (TempImgCon.getChildByName(DishGoodname)) {
        MealGoodsArr.push(DishGoodname);
      } else {
        console.log('Продукта', DishGoodname, 'нет в магазине!');
      }
    }
  }
  let Shop = TempImgCon.getChildByName('Shop_main').clone();
  let Basket = TempImgCon.getChildByName('Basket').clone();
  let NewBasCon = new createjs.Container();
  NewBasCon.addChild(Basket);
  NewBasCon.name = 'Basket';
  let Plane1 = TempImgCon.getChildByName('Plane1').clone();
  let Plane2 = TempImgCon.getChildByName('Plane2').clone();
  Shop.alpha = Basket.alpha = Plane1.alpha = 1;
  NewShop.addChild(Shop, NewBasCon, Plane1, Plane2);
  Basket.setTransform(1950, 915, 0.68, 0.68);
  Plane1.setTransform(1838, 1515);
  Plane2.setTransform(1838, 1015);

  for (var i = 0; i < 2; i++) {
    let RectH = 200 - 100 * i
    let ShadowRect = new createjs.Shape();
    ShadowRect.graphics.beginFill('black')
      .drawRect(10, -10, 1060, RectH);
    ShadowRect.name = 'ShadowRect' + i;
    ShadowRect.alpha = 0.4;
    if (i == 0) {
      ShadowRect.setTransform(Plane1.x, Plane1.y + Plane1.image.naturalHeight)
    } else {
      ShadowRect.alpha = 0;
      ShadowRect.setTransform(Plane2.x, Plane2.y + Plane2.image.naturalHeight)
    }
    NewShop.addChild(ShadowRect);
  }

  let AllGoods = [];
  for (let i = 0; i < ImgArr.length; i++) {
    if (ImgArr[i].place.indexOf('Shop') != -1 && ImgArr[i].img.indexOf('Shop') == -1) {
      if (ImgArr[i].img != 'Рамка_Ящик_2.png' &&
        ImgArr[i].img != 'Перед_Ящик_2.png' &&
        ImgArr[i].img != 'Дно_Ящик_2.png' &&
        ImgArr[i].img != 'Рамка_Ящик_1.png' &&
        ImgArr[i].img != 'Перед_Ящик_1.png' &&
        ImgArr[i].img != 'Дно_Ящик_1.png' &&
        ImgArr[i].img != 'Plane2.png' &&
        ImgArr[i].img != 'Plane1.png' &&
        ImgArr[i].img != 'Shop_main.png' &&
        ImgArr[i].img != 'Basket.png') {
        let DishGoodname = ImgArr[i].img.substring(0, ImgArr[i].img.indexOf('.')).replace(/[0-9]/g, '');
        if (MealGoodsArr.indexOf(DishGoodname) == -1) {
          AllGoods.push(DishGoodname);
        }
      }
    }
  }
  let ShopGoods = MealGoodsArr.slice();
  while (ShopGoods.length < 7) {
    let RandomNum = Math.floor(Math.random() * AllGoods.length);
    let FalseGood = AllGoods[RandomNum];
    if (ShopGoods.indexOf(FalseGood) == -1) {
      AllGoods.splice(RandomNum, 1);
      ShopGoods.push(FalseGood);
    }
  }

  let Q;
  let Temp;
  for (let i = 0; i < ShopGoods.length; i++) {
    Q = Math.floor(Math.random() * (i + 1));
    Temp = ShopGoods[Q];
    ShopGoods[Q] = ShopGoods[i];
    ShopGoods[i] = Temp;
  }
  for (let i = 0; i < ShopGoods.length; i++) {
    let Re = false;
    for (let ii = 0; ii < ImgArr.length; ii++) {
      if (ImgArr[ii].place == 'Shop') {

        if (Re == false && ShopGoods[i] == ImgArr[ii].img.substring(0, ImgArr[ii].img.indexOf('.'))) {
          makeBasketGood(NewShop, ShopGoods[i], i);
          break;
        }
        if (ImgArr[ii].img.indexOf(ShopGoods[i]) != -1) {
          makeBasketGood(NewShop, ShopGoods[i], i);
          break;
        }
        if (i == ImgArr.length - 1) {
          i = 0;
          re = true;
        }
      }
    }
  }
  scaleShop(NewShop);
  MainCanvas.addChild(NewShop);
}

function makeBasketGood(con, e, num) {
  let Basket = new createjs.Container();
  Basket.name = 'Basket' + e;
  let DiffMaskH = 170;
  let DiffMaskY = -30;
  if (num < 3 || num >= 7) {
    con.addChild(Basket);
    DiffMaskH = 70;
    DiffMaskY = -130;
  } else if (num >= 5 && num < 7) {
    for (var i = 0; i < con.children.length; i++) {
      if (con.children[i].name == 'Plane1') {
        con.addChild(Basket);
        // con.children.splice(i + 1, 0, Basket);
        break;
      }
    }
  } else if (num >= 3 && num < 5) {
    for (var i = 0; i < con.children.length; i++) {
      if (con.children[i].name == 'ShadowRect1') {
        con.addChild(Basket);
        break;
      }
    }
  }

  let MaskCoords = [{
    x: 260,
    y: 1950
  }, {
    x: 800,
    y: 1950
  }, {
    x: 1330,
    y: 1950
  }, {
    x: 1862,
    y: 1950
  }, {
    x: 2400,
    y: 1950
  }, {
    x: 1878,
    y: 1360
  }, {
    x: 2390,
    y: 1360
  }, {
    x: 1878,
    y: 860
  }, {
    x: 2390,
    y: 860
  }];


  if (num < 5) {
    let Dno = TempImgCon.getChildByName('Дно_Ящик_1').clone();
    let Ramka = TempImgCon.getChildByName('Рамка_Ящик_1').clone();
    let Lico = TempImgCon.getChildByName('Перед_Ящик_1').clone();
    Dno.alpha = Ramka.alpha = Lico.alpha = 1;
    Basket.addChild(Dno, Ramka, Lico);
    Basket.setTransform(MaskCoords[num].x, MaskCoords[num].y);
  } else {
    let Dno = TempImgCon.getChildByName('Дно_Ящик_2').clone();
    let Ramka = TempImgCon.getChildByName('Рамка_Ящик_2').clone();
    let Lico = TempImgCon.getChildByName('Перед_Ящик_2').clone();
    Dno.alpha = Ramka.alpha = Lico.alpha = 1;
    Basket.addChild(Dno, Ramka, Lico);
    Basket.setTransform(MaskCoords[num].x, MaskCoords[num].y);
  }

  let Goods = [];
  for (let i = 0; i < ImgArr.length; i++) {
    if (ImgArr[i].place == 'Shop') {
      if (ImgArr[i].img.indexOf(e) != -1) {
        Goods.push(ImgArr[i].img.substring(0, ImgArr[i].img.indexOf('.')));
      }
    }
  }

  let MaskW = Basket.children[0].image.naturalWidth;
  let MaskH = Basket.children[0].image.naturalHeight;
  let NewMask = new createjs.Shape();
  NewMask.graphics.beginFill('red').drawRect(-40, DiffMaskY, MaskW + 80, MaskH - DiffMaskH);
  NewMask.name = 'Mask_' + num;

  for (var i = 0; i < TempImgCon.children.length; i++) {
    if (TempImgCon.children[i].name == e || TempImgCon.children[i].name.indexOf(e) != -1) {
      if (TempImgCon.children[i].name.length <= e.length + 2 && TempImgCon.children[i].image.src.indexOf('Shop') != -1) {
        let NewImg = TempImgCon.children[i].clone();

        let ImgW = NewImg.image.naturalWidth * NewImg.scaleX;
        let ImgH = NewImg.image.naturalHeight * NewImg.scaleY;
        let RectW = MaskW;
        let RectH = MaskH - 200;
        let NewScale = NewImg.scaleX;
        if (ImgW > NewMask.graphics._activeInstructions[0].w) {
          NewScale = (NewMask.graphics._activeInstructions[0].w / (ImgW / 100)) / 100;
        }
        if (ImgH > NewMask.graphics._activeInstructions[0].h) {
          let Temp = (NewMask.graphics._activeInstructions[0].h / (ImgH / 100)) / 100;
          Temp > NewScale ? NewScale : Temp;
        }

        let MinImgW = NewImg.image.naturalWidth * NewScale - (NewImg.image.naturalWidth * NewScale / 100) * 30;
        let MinImgH = NewImg.image.naturalHeight * NewScale - (NewImg.image.naturalHeight * NewScale / 100) * 30;
        let CountW = Math.ceil(RectW / MinImgW);
        let CountH = Math.ceil(RectH / MinImgH);
        // отсюда можно придумать заполнение рандомное контейнеров
        // но мне не хватилоу ума придумать как это сделать
        NewImg.alpha = 1;
        Basket.children.splice(2, 0, NewImg);
        let NewX = (RectW - NewImg.image.naturalWidth * NewScale) / 2;
        let NewY = (RectH - NewImg.image.naturalHeight * NewScale) / 2;
        NewImg.x = NewX;
        NewImg.y = NewY;
        NewImg.scaleX = NewImg.scaleY = NewScale;
      }
    }
  }
  // для интернет-странички
  // Для работы на стац компе
  let x1 = -40;
  let y1 = DiffMaskY;
  let maxW = MaskW + 80;
  let maxH = MaskH - DiffMaskH + 200;

  Basket.addChild(makeDishRect(x1, y1, maxW, maxH));
  Basket.children[Basket.children.length - 1].on('click', clickOnShopGood);
  // console.log(Basket.children[Basket.children.length - 1]);
}

function scaleShop(e) {
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;
  let maxW = e.children[0].image.naturalWidth;
  let maxH = e.children[0].image.naturalHeight;
  let oldX = e.children[0].x + e.children[0].regX;
  let oldY = e.children[0].y + e.children[0].regY;
  oldX > x1 ? x1 : x1 = oldX;
  oldY > y1 ? y1 : y1 = oldY;
  oldX + maxW < x2 ? x2 : x2 = oldX + maxW;
  oldY + maxH < y2 ? y2 : y2 = oldY + maxH;
  let newW = (WIN_W / 100) * (0.9) * 100;
  let newH = (WIN_H / 100) * (0.9) * 100;
  let newS = 1;
  let maxW2 = x2 - x1;
  let maxH2 = y2 - y1;
  if (maxW2 > newW) {
    newS = (newW / (maxW2 / 100)) / 100;
  }
  if (maxH2 > newH) {
    var temp = (newH / (maxH2 / 100)) / 100;
    temp < newS ? newS = temp : newS;
  }
  // e.addChild(makeDishRect(x1, y1, maxW * 1.4, maxH * 1.4));
  let newX = WIN_W / 2 - (maxW2 * newS) / 2;
  let newY = WIN_H - maxH2 * newS - 100 * newS;
  e.setTransform(newX, newY, newS, newS);
  let FaryFace = MainCanvas.getChildByName('FARY_FACE');
  let FFY = MainCanvas.getChildByName('FARY_FACE').y;
  let diffX = FFY - newY;
  FFY = diffX + newY
  new createjs.Tween.get().to({}, 1500).call(Stay_Idle, [FaryFace]);

  Jump(FaryFace);
  new createjs.Tween.get(FaryFace).to({
    x: newX + 50 * newS,
    y: FFY - 1000 * newS + 120 * FaryFace.scaleY
  }, 750);
  new createjs.Tween.get(e).to({
    alpha: 1
  }, 150);
}

function clickOnShopGood(e) {
  let GoodName = e.currentTarget.parent.name.substring(6)
  for (let i = 0; i < MealGoodsArr.length; i++) {
    if (GoodName == MealGoodsArr[i]) {
      e.currentTarget.removeAllEventListeners('click');
      rightChoiceGood(e.currentTarget.parent);
      break;
    }
    if (i == MealGoodsArr.length - 1) {
      wrongChoiceGood();
    }
  }
}

function rightChoiceGood(e) {
  let SucGood = e.children[2]
  e.removeChild(SucGood);
  let BasCon = e.parent.getChildByName('Basket');
  let Bas = e.parent.getChildByName('Basket').getChildByName('Basket');
  BasCon.children.splice(BasCon.children.length - 1, 0, SucGood)
  let BaskW = Bas.image.naturalWidth * Bas.scaleX;
  let BaskH = Bas.image.naturalHeight * Bas.scaleY;
  let GoodW = SucGood.image.naturalWidth * SucGood.scaleX;
  let GoodH = SucGood.image.naturalHeight * SucGood.scaleY;
  let MinX = Bas.x + 200;
  let MaxX = Bas.x + BaskW - 200 - GoodW;
  let MinY = Bas.y;
  let MaxY = Bas.y + BaskH - GoodH;
  let NewX = Math.floor(MinX + Math.random() * (MaxX + 1 - MinX));
  let NewY = Math.floor(MinY + Math.random() * (MaxY + 1 - MinY));

  SucGood.setTransform(NewX, NewY, SucGood.scaleX, SucGood.scaleY);
  if (BasCon.children.length == MealGoodsArr.length + 1) {
    let FaryFace = MainCanvas.getChildByName('FARY_FACE');
    goToKitchen(BasCon, FaryFace);
  }
}

function wrongChoiceGood() {
  console.log('нет такого продукта1');
}
