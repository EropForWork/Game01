var FARY_COLOR = {
  horn: '#8E4A27',
  body: '#D9B722',
  muz: '#9D601D',
  yey: '#282320',
  spot: '#B15F2F',
  white: '#E7DFC5',
  hoof: '#264025',
  floor: '#666666',
  floor_lines: '#333333'
}

function addFaceFary() {
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", MainCanvas);

  let Fary_Face = new createjs.Container();
  let Fary_Top = new createjs.Container();
  Fary_Top.name = 'TOP';
  Fary_Top.setTransform(139.2, 249.5, 1, 1, 0, 0, 0, 139.2, 249.5);
  Fary_Top.addChild(addNeck(), addHead());
  Fary_Top.StartCoord = [Fary_Top.x, Fary_Top.y, Fary_Top.rotation];
  Fary_Face.addChild(addLegs_B(), addTors(), addLegs_F(), Fary_Top);
  Fary_Face.name = 'FARY_FACE';
  let FaryW = 150;
  let FaryH = 294;
  let FaryScale = (WIN_H / 2) / FaryH;
  let TestScene = new createjs.Container();
  TestScene.addChild(addTestScene());
  MainCanvas.addChild(TestScene, Fary_Face);
  TestScene.setTransform(0, WIN_H - (FaryH * FaryScale + 115) - 115 * FaryScale + 115, TestScene.scaleX, FaryScale);
  Fary_Face.setTransform(0, WIN_H - (FaryH * FaryScale + 115) - 115 * FaryScale + 115, FaryScale, FaryScale);
  MainCanvas.update();
  Fary_Face.on('click', Test_Click)
  console.log('тут тест функция1');
  // Fary_Says(Fary_Face, 'test');
}

function Test_Click(e) {
  Stay_Idle(e.currentTarget);
  let MovesArr = [
    Shake_Head, Yes_Head, Shake_Neck, Shake_Tail, Jump, Left_Head, Right_Head
  ];
  let NewNum = Math.floor(Math.random() * Math.floor(MovesArr.length));
  new createjs.Tween.get().to({}, 100).call(MovesArr[NewNum], [e.currentTarget]);
  // e.currentTarget.on('click', MovesArr[NewNum], null, true, [e.currentTarget])
}

function addHead() {
  let Head = new createjs.Container();
  Head.name = 'HEAD';
  Head.setTransform(129.3, 140.3, 1, 1, 0, 0, 0, 129.3, 140.3);
  Head.addChild(addHorns(), addEars(), addFace(), addMuz(), addEyebrows(), addYeys(), addNose(), addMouth());
  Head.StartCoord = [129.3, 140.3, 0];
  return Head;
}

function addHorns() {
  let Horns = new createjs.Container();

  let Horn1 = new createjs.Shape();
  Horn1.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.horn)
    .moveTo(100.4, 81.4).quadraticCurveTo(102, 72, 111.7, 74).lineTo(118.6, 85.3).lineTo(110.3, 91.4)
    .closePath();

  let Horn2 = new createjs.Shape();
  Horn1.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.horn)
    .moveTo(133.5, 68.9).quadraticCurveTo(142, 65, 146.3, 76.6).lineTo(139.9, 88.3).lineTo(129.8, 86.6)
    .closePath();

  Horns.addChild(Horn1, Horn2);
  Horns.StartCoord = [0, 0, 0];
  Horn1.StartCoord = [0, 0, 0];
  Horn2.StartCoord = [0, 0, 0];
  return Horns;
}

function addEars() {
  let Ears = new createjs.Container();
  Ears.name = 'EARS';
  let Ear1c = new createjs.Container();
  let Ear2c = new createjs.Container();
  Ear1c.setTransform(103.85, 100, 1, 1, 0, 0, 0, 103.85, 100);
  Ear2c.setTransform(147.3, 95.55, 1, 1, 0, 0, 0, 147.3, 95.55);

  let Ear1 = new createjs.Shape();
  Ear1.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.body)
    .moveTo(87.3, 90.8).quadraticCurveTo(87, 85, 90.2, 85.7).quadraticCurveTo(100, 85.5, 109, 91.9).lineTo(99.5, 107)
    .quadraticCurveTo(87.3, 95, 87.3, 90.8).closePath();

  let Ear2 = new createjs.Shape();
  Ear2.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.body)
    .moveTo(140.8, 88.8).quadraticCurveTo(155, 75, 161.9, 78.5).quadraticCurveTo(165, 80, 153.5, 102.3)
    .closePath();

  Ear1c.addChild(Ear1);
  Ear2c.addChild(Ear2);
  Ears.addChild(Ear1c, Ear2c);

  Ears.StartCoord = [Ears.x, Ears.y, Ears.rotation];
  Ear1c.StartCoord = [Ear1c.x, Ear1c.y, Ear1c.rotation];
  Ear2c.StartCoord = [Ear2c.x, Ear2c.y, Ear2c.rotation];
  return Ears;
}

function addFace() {
  let Face = new createjs.Shape();
  Face.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.body)
    .moveTo(94.8, 117.9).quadraticCurveTo(100, 90, 122.6, 83.5).quadraticCurveTo(145, 80, 160.2, 111.4)
    .closePath();
  Face.StartCoord = [0, 0, 0];
  return Face;
}

function addMuz() {
  let Muz = new createjs.Shape();
  Muz.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.muz)
    .moveTo(84.8, 117.9).quadraticCurveTo(120, 106, 160.3, 111.3).quadraticCurveTo(175, 120, 177.3, 132.6).quadraticCurveTo(178, 150, 165.6, 158.9)
    .quadraticCurveTo(135, 170, 106.1, 167.9).quadraticCurveTo(85, 165, 79, 144.4)
    .quadraticCurveTo(78, 120, 84.8, 117.9);
  Muz.StartCoord = [0, 0, 0];
  return Muz;
}

function addEyebrows() {
  let Eyebrows = new createjs.Container();

  let Eyebrow1 = new createjs.Shape();
  Eyebrow1.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey)
    .moveTo(105.8, 97.6).quadraticCurveTo(110, 91, 116, 91);

  let Eyebrow2 = new createjs.Shape();
  Eyebrow2.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey)
    .moveTo(135.6, 89.4).quadraticCurveTo(140, 89, 147.2, 95.6);

  Eyebrows.addChild(Eyebrow1, Eyebrow2);
  Eyebrows.StartCoord = [0, 0, 0];
  Eyebrow1.StartCoord = [0, 0, 0];
  Eyebrow2.StartCoord = [0, 0, 0];
  return Eyebrows;
}

function addYeys() {
  let Yeys = new createjs.Container();
  let Yey1 = new createjs.Container();
  let Yey2 = new createjs.Container();
  Yeys.name = 'YEYS';
  Yey1.name = 'YEY1';
  Yey2.name = 'YEY2';

  let Yey1W = new createjs.Shape();
  Yey1W.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.white)
    .drawEllipse(112.7, 102.4, 17, 11.2)
    .closePath();

  let Yey1B = new createjs.Shape();
  Yey1B.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.yey)
    .drawEllipse(112.7, 102.4, 13, 8.2)
    .closePath();

  let Yey1WW = new createjs.Shape();
  Yey1WW.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.white)
    .drawEllipse(114, 99.8, 3.5, 2.7)
    .closePath();

  Yey1W.setTransform(112.7, 102.4, 1, 1, -30, 0, 0, 112.7, 102.4);
  Yey1B.setTransform(114.7, 98.4, 1, 1, -30, 0, 0, 114.7, 98.4);
  Yey1WW.setTransform(118, 85, 1, 1, -30, 0, 0, 118, 85);

  var Yey2W = Yey1W.clone();
  let Yey2B = Yey1B.clone();
  let Yey2WW = Yey1WW.clone();
  Yey2W.setTransform(Yey2W.x + 12, Yey2W.y - 13, 1, 1, 25, 0, 0, Yey2W.regX + 12, Yey2W.regY - 13);
  Yey2B.setTransform(Yey2B.x + 6.5, Yey2B.y - 7, 1, 1, 25, 0, 0, Yey2B.x + 6.5, Yey2B.y - 7);
  Yey2WW.setTransform(Yey2WW.x - 4, Yey2WW.y + 8, 1, 1, 25, 0, 0, Yey2WW.x - 4, Yey2WW.y + 8);
  Yey1.addChild(Yey1W, Yey1B, Yey1WW);
  Yey2.addChild(Yey2W, Yey2B, Yey2WW);
  Yey1.setTransform(-10)
  Yey2.setTransform(25, -3)
  Yeys.addChild(Yey1, Yey2);
  Yeys.y -= 1;

  Yeys.StartCoord = [Yeys.x, Yeys.y, Yeys.rotation];
  Yey1.StartCoord = [Yey1.x, Yey1.y, Yey1.rotation];
  Yey2.StartCoord = [Yey2.x, Yey2.y, Yey2.rotation];
  return Yeys;
}

function addNose() {
  let Nose = new createjs.Container();

  let Nose1 = new createjs.Shape();
  Nose1.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.yey)
    .drawEllipse(92.7, 118.5, 14.2, 6.3)
    .closePath();

  let Nose2 = new createjs.Shape();
  Nose2.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.yey)
    .drawEllipse(146.7, 111.2, 14.2, 6.3)
    .closePath();

  Nose1.setTransform(92.7, 118.5, 1, 1, -20, 0, 0, 92.7, 118.5);
  Nose2.setTransform(146.7, 111.2, 1, 1, 15, 0, 0, 146.7, 111.2);
  Nose.addChild(Nose1, Nose2);
  Nose.y += 2;
  Nose.StartCoord = [Nose.x, Nose.y, Nose.rotation];
  Nose1.StartCoord = [Nose1.x, Nose1.y, Nose1.rotation];
  Nose2.StartCoord = [Nose2.x, Nose2.y, Nose2.rotation];
  return Nose;
}

function addMouth() {
  let Mouth = new createjs.Container();
  Mouth.name = 'Mouth';

  let Mouth1 = new createjs.Shape();
  Mouth1.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey)
    .moveTo(107.3, 146.8).quadraticCurveTo(108, 141, 111.7, 140.5);

  let Mouth2 = new createjs.Shape();
  Mouth2.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey)
    .moveTo(143.8, 134.7).quadraticCurveTo(150, 135, 150, 140);

  let Mouth3 = new createjs.Shape();
  Mouth3.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey)
    .moveTo(109.3, 142.9).quadraticCurveTo(118, 153, 130.7, 152.9).quadraticCurveTo(145, 150, 147.2, 136.7);

  Mouth.addChild(Mouth1, Mouth2, Mouth3);
  Mouth.StartCoord = [Mouth.x, Mouth.y, Mouth.rotation];
  Mouth1.StartCoord = [Mouth1.x, Mouth1.y, Mouth1.rotation];
  Mouth2.StartCoord = [Mouth2.x, Mouth2.y, Mouth2.rotation];
  Mouth3.StartCoord = [Mouth3.x, Mouth3.y, Mouth3.rotation];
  return Mouth;
}

function addNeck() {
  let Neck = new createjs.Container();
  Neck.addChild(addNeck1(), addNeck_Spot());
  Neck.StartCoord = [Neck.x, Neck.y, Neck.rotation];
  return Neck;
}

function addNeck1() {
  let Neck = new createjs.Shape();
  Neck.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.body)
    .moveTo(110, 245.3).quadraticCurveTo(115, 215, 111, 162.8).lineTo(155, 158.5).quadraticCurveTo(158, 215, 168, 243.3)
    .quadraticCurveTo(138, 260, 110, 245.3);
  Neck.StartCoord = [Neck.x, Neck.y, Neck.rotation];
  return Neck;
}

function addNeck_Spot() {
  let Spots = new createjs.Container();

  let Spot1 = new createjs.Shape();
  Spot1.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.yey)
    .moveTo(121, 231.5).quadraticCurveTo(120, 227, 126.3, 228.2)
    .quadraticCurveTo(130, 230, 130.5, 235.3).quadraticCurveTo(127, 234, 123, 236.3)
    .closePath();

  let Spot2 = new createjs.Shape();
  Spot2.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.yey)
    .moveTo(145.9, 210.6).quadraticCurveTo(150, 205, 154, 206.3)
    .quadraticCurveTo(160, 210, 156, 208.3).quadraticCurveTo(160, 210, 152, 213.6)
    .closePath();

  Spots.addChild(Spot1, Spot2);
  Spots.StartCoord = [Spots.x, Spots.y, Spots.rotation];
  Spot1.StartCoord = [Spot1.x, Spot1.y, Spot1.rotation];
  Spot2.StartCoord = [Spot2.x, Spot2.y, Spot2.rotation];
  return Spots;
}

function addLegs_F() {
  let Legs = new createjs.Container();
  Legs.addChild(addLeg_RF(), addLeg_LF());
  Legs.setTransform(139.45, 360.1, 1, 1, 0, 0, 0, 139.45, 360.1);
  Legs.StartCoord = [Legs.x, Legs.y, Legs.rotation];
  return Legs;
}

function addLeg_RF() {
  let Leg = new createjs.Shape();
  Leg.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.hoof)
    .moveTo(98.3, 353.7).quadraticCurveTo(90, 363, 81.5, 359.2).quadraticCurveTo(75, 363, 66.8, 351.7)
    .closePath();
  Leg.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.body)
    .moveTo(88.5, 284.4).quadraticCurveTo(110, 280, 117.6, 298.5)
    .quadraticCurveTo(105, 320, 104.4, 345.1).quadraticCurveTo(105, 350, 98.3, 353.7)
    .quadraticCurveTo(85, 360, 66.8, 351.7).quadraticCurveTo(63, 345, 66.3, 335.1)
    .quadraticCurveTo(76, 300, 88.5, 284.4);
  Leg.StartCoord = [Leg.x, Leg.y, Leg.rotation];
  return Leg;
}

function addLeg_LF() {
  let Leg = new createjs.Shape();
  Leg.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.hoof)
    .moveTo(212.1, 350.8).quadraticCurveTo(204, 363, 195, 358.5).quadraticCurveTo(186, 363, 177.8, 351.7)
    .closePath();
  Leg.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.body)
    .moveTo(156.7, 300.5).quadraticCurveTo(170, 280, 193, 284.4)
    .quadraticCurveTo(210, 310, 212.9, 337.1).quadraticCurveTo(213, 344, 212.1, 350.8)
    .quadraticCurveTo(200, 360, 177.8, 351.7).quadraticCurveTo(170, 320, 156.7, 300.5);
  Leg.StartCoord = [Leg.x, Leg.y, Leg.rotation];
  return Leg;
}

function addLegs_B() {
  let Legs = new createjs.Container();
  Legs.addChild(addLeg_RB(), addLeg_LB());
  Legs.setTransform(141.65, 354.35, 1, 1, 0, 0, 0, 141.65, 354.35);
  Legs.StartCoord = [Legs.x, Legs.y, Legs.rotation];
  return Legs;
}

function addLeg_RB() {
  let Leg = addLeg_RF();
  Leg.setTransform(20, -5, 1, 1, -5, 0, 0, 20, -5)
  Leg.x -= 10;
  Leg.StartCoord = [Leg.x, Leg.y, Leg.rotation];
  return Leg;
}

function addLeg_LB() {
  let Leg = addLeg_LF();
  Leg.setTransform(0, 0, 1, 1, 5, 0, 0, 0, 0)
  Leg.setTransform(-15, -10)
  Leg.StartCoord = [Leg.x, Leg.y, Leg.rotation];
  return Leg;
}

function addTors() {
  let Tors = new createjs.Container();
  Tors.name = 'TORS';
  Tors.addChild(addTail(), addTors1(), addTors_Spot());
  Tors.StartCoord = [Tors.x, Tors.y, Tors.rotation];
  return Tors;
}

function addTail() {
  let Tail = new createjs.Shape();
  Tail.name = 'TAIL';
  Tail.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey)
    // .beginFill(FARY_COLOR.body)
    .beginLinearGradientFill([FARY_COLOR.horn, FARY_COLOR.body], [0.7, 0.3], 174, 235, 185, 230) // исчезающая заливка
    .moveTo(179.8, 229).quadraticCurveTo(185, 225, 185.7, 231.5).lineTo(174.3, 250).lineTo(170.9, 240)
    .closePath();
  Tail.setTransform(172.55, 242.5, 1, 1, 0, 0, 0, 172.55, 242.5);
  Tail.StartCoord = [Tail.x, Tail.y, Tail.rotation];
  return Tail;
}

function addTors1() {
  let Tors = new createjs.Shape();
  Tors.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.body)
    .moveTo(103.2, 246.1).quadraticCurveTo(138, 200, 174.5, 243.3)
    .quadraticCurveTo(190, 260, 194.7, 289.5).quadraticCurveTo(190, 315, 136.9, 313.6)
    .quadraticCurveTo(90, 315, 83.6, 292.3).quadraticCurveTo(90, 260, 103.2, 246.1);
  Tors.StartCoord = [Tors.x, Tors.y, Tors.rotation];
  return Tors;
}

function addTors_Spot() {
  let Spots = new createjs.Container();

  let Spot1 = new createjs.Shape();
  Spot1.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.yey)
    .moveTo(99.2, 273.2).quadraticCurveTo(104, 270, 106, 274.2)
    .quadraticCurveTo(105, 275, 109, 281.6).quadraticCurveTo(105, 283, 101.2, 280.2)
    .closePath();

  let Spot2 = new createjs.Shape();
  Spot2.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.yey)
    .moveTo(156, 277.2).quadraticCurveTo(160, 275, 160.6, 276.2)
    .lineTo(163.4, 283.6).quadraticCurveTo(150, 290, 152.2, 285.6)
    .closePath();

  Spots.addChild(Spot1, Spot2);
  Spots.StartCoord = [Spots.x, Spots.y, Spots.rotation];
  Spot1.StartCoord = [Spot1.x, Spot1.y, Spot1.rotation];
  Spot2.StartCoord = [Spot2.x, Spot2.y, Spot2.rotation];
  return Spots;
}

function addTestScene() {
  let TestScene = new createjs.Shape();
  TestScene.graphics.setStrokeStyle(1).beginStroke(FARY_COLOR.floor_lines).beginFill(FARY_COLOR.floor)
    .drawRect(0, 0, 290, 140);
  TestScene.graphics.moveTo(0, 22).lineTo(18, 0);
  TestScene.graphics.moveTo(0, 50).lineTo(37.4, 0);
  TestScene.graphics.moveTo(0, 92.6).lineTo(57, 0);
  TestScene.graphics.moveTo(5.5, 140.3).lineTo(76.55, 0);
  TestScene.graphics.moveTo(43.55, 140.3).lineTo(95, 0);
  TestScene.graphics.moveTo(80, 140.3).lineTo(113.8, 0);
  TestScene.graphics.moveTo(116.5, 140.3).lineTo(133.4, 0);
  TestScene.graphics.moveTo(153, 140.3).lineTo(153, 0);
  TestScene.graphics.moveTo(189.7, 140.3).lineTo(170.8, 0);
  TestScene.graphics.moveTo(226.6, 140.3).lineTo(190.5, 0);
  TestScene.graphics.moveTo(264, 140.3).lineTo(210.2, 0);
  TestScene.graphics.moveTo(290, 118.2).lineTo(228.6, 0);
  TestScene.graphics.moveTo(290, 63.75).lineTo(248.25, 0);
  TestScene.graphics.moveTo(290, 29.35).lineTo(267.85, 0);

  let MaxScale = WIN_W / 290;
  TestScene.setTransform(-5, 270, MaxScale + 0.1)
  return TestScene;
}

function Stay_Idle(e) {
  let Fary = e;
  console.log('придумать что-то с анимациями только фейри');
  createjs.Tween.removeAllTweens();
  // createjs.Tween.removeTweens(Fary);
  for (let i = 0; i < Fary.children.length; i++) {
    Part_Go_Idle(Fary.children[i]);
    // createjs.Tween.removeTweens(Fary.children[i]);
    if (Fary.children[i].children && Fary.children[i].children.length > 0) {
      for (let ii = 0; ii < Fary.children[i].children.length; ii++) {
        Part_Go_Idle(Fary.children[i].children[ii]);
        // createjs.Tween.removeTweens(Fary.children[i].children[ii]);
        if (Fary.children[i].children[ii].children && Fary.children[i].children[ii].children.length > 0) {
          for (let iii = 0; iii < Fary.children[i].children[ii].children.length; iii++) {
            Part_Go_Idle(Fary.children[i].children[ii].children[iii]);
            // createjs.Tween.removeTweens(Fary.children[i].children[ii].children[iii]);
            let max = Fary.children[i].children[ii].children[iii];
            if (max.children && max.children.length > 0) {
              for (let iiii = 0; iiii < max.children.length; iiii++) {
                Part_Go_Idle(max.children[iiii]);
                // createjs.Tween.removeTweens(max.children[iiii]);
              }
            }
          }
        }
      }
    }
  }
}

function Part_Go_Idle(e) {
  if (e.StartCoord) {
    new createjs.Tween.get(e)
      .to({
        x: e.StartCoord[0],
        y: e.StartCoord[1],
        rotation: e.StartCoord[2],
        scaleX: 1,
        scaleY: 1
      }, 100);
  }
  if (e.name && e.name == 'YEY1')
    e.parent.children.length = 2;
}

function Shake_Head(e, data) {
  let Fary = data ? data[0] : e;
  let Head = Fary.getChildByName('TOP').getChildByName('HEAD');
  new createjs.Tween.get(Head, {
      override: true,
    }).to({
      rotation: 10
    }, 300)
    .to({
      rotation: 0
    }, 300)
    .to({
      rotation: -10
    }, 300)
    .to({
      rotation: 0
    }, 300)
    .to({
      rotation: 10
    }, 300)
    .to({
      rotation: 0
    }, 300)
    .to({
      rotation: -10
    }, 300)
    .to({
      rotation: 0
    }, 300);
}

function Yes_Head(e, data) {
  let Fary = data ? data[0] : e;
  let Head = Fary.getChildByName('TOP').getChildByName('HEAD');
  let OldY = Head.y;
  new createjs.Tween.get(Head, {
      override: true,
    }).to({
      y: OldY + 10
    }, 300).wait(500)
    .to({
      y: OldY
    }, 300);
  data ? Close_Yeys(data[0]) : Close_Yeys(e);
}

function Close_Yeys(e, data) {
  let Fary = data ? data[0] : e;
  let Yeys = Fary.getChildByName('TOP').getChildByName('HEAD').getChildByName('YEYS');
  let Yey1 = Yeys.getChildByName('YEY1');
  let New_Rect = new createjs.Shape();
  New_Rect.graphics.beginStroke(FARY_COLOR.yey).beginFill(FARY_COLOR.body).drawRect(0, 50, 200, 50);
  New_Rect.rotation = -3;
  let NEW_M = Yey1.children[0].clone();
  New_Rect.mask = NEW_M;
  New_Rect.mask.x -= 10;
  Yeys.addChild(New_Rect);

  new createjs.Tween.get(New_Rect, {
      override: true,
    }).to({
      y: 50
    }, 500).wait(500)
    .to({
      y: 0
    }, 500).call(Open_Yey);
}

function Open_Yey() {
  this.parent.removeChild(this);
  delete this;
}

function Shake_Neck(e, data) {
  let Fary = data ? data[0] : e;
  let Top = Fary.getChildByName('TOP');
  let Head = Top.getChildByName('HEAD');
  let Yer1 = Head.getChildByName('EARS').children[0];
  let Yer2 = Head.getChildByName('EARS').children[1];
  new createjs.Tween.get(Top, {
      override: true,
    }).to({
      rotation: 10
    }, 300)
    .to({
      rotation: 0
    }, 300)
    .to({
      rotation: -10
    }, 300)
    .to({
      rotation: 0
    }, 300)
    .to({
      rotation: 10
    }, 300)
    .to({
      rotation: 0
    }, 300)
    .to({
      rotation: -10
    }, 300)
    .to({
      rotation: 0
    }, 300);

  new createjs.Tween.get(Head, {
      override: true,
    }).to({
      rotation: 12
    }, 450)
    .to({
      rotation: -12
    }, 450)
    .to({
      rotation: 12
    }, 450)
    .to({
      rotation: -12
    }, 450)
    .to({
      rotation: 0
    }, 300);

  new createjs.Tween.get(Yer1, {
      override: true,
    }).to({
      rotation: -10
    }, 900)
    .to({
      rotation: 0
    }, 900);

  new createjs.Tween.get(Yer2, {
      override: true,
    }).to({
      rotation: 10
    }, 900)
    .to({
      rotation: 0
    }, 900);
}

function Shake_Tail(e, data) {
  let Fary = data ? data[0] : e;
  let Tail = Fary.getChildByName('TORS').children[0];
  new createjs.Tween.get(Tail, {
      override: true,
    }).to({
      rotation: 20
    }, 150)
    .to({
      rotation: -20
    }, 300)
    .to({
      rotation: 20
    }, 300)
    .to({
      rotation: -20
    }, 300)
    .to({
      rotation: 20
    }, 300)
    .to({
      rotation: -20
    }, 300)
    .to({
      rotation: 20
    }, 300)
    .to({
      rotation: 0
    }, 150);
}

function Jump(e, data) {
  let Fary = data ? data[0] : e;
  let Top = Fary.getChildByName('TOP');
  let Tors = Fary.getChildByName('TORS');
  let Legs_b = Fary.children[0];
  let Legs_f = Fary.children[2];

  let TopY = Top.y;
  let TorsY = Tors.y;
  let Legs_bY = Legs_b.y;
  let Legs_fY = Legs_f.y;

  new createjs.Tween.get(Top, {
      override: true,
    }).to({
      y: TopY + 10
    }, 150, createjs.Ease.backOut)
    .to({
      y: TopY - 50
    }, 700, createjs.Ease.backOut)
    .to({
      y: TopY + 10
    }, 500, createjs.Ease.backOut)
    .to({
      y: TopY
    }, 150, createjs.Ease.backOut);

  new createjs.Tween.get(Tors, {
      override: true,
    }).to({
      y: TorsY + 10
    }, 150, createjs.Ease.backOut)
    .to({
      y: TorsY - 50
    }, 700, createjs.Ease.backOut)
    .to({
      y: TorsY + 10
    }, 500, createjs.Ease.backOut)
    .to({
      y: TorsY
    }, 150, createjs.Ease.backOut)

  new createjs.Tween.get(Legs_f, {
      override: true,
    }).to({
      scaleY: 0.85
    }, 150, createjs.Ease.backOut)
    .to({
      y: Legs_fY - 35,
      scaleY: 1.2
    }, 700, createjs.Ease.backOut)
    .to({
      y: Legs_fY,
      scaleY: 0.85
    }, 500, createjs.Ease.backOut)
    .to({
      scaleY: 1
    }, 150, createjs.Ease.backOut)

  new createjs.Tween.get(Legs_b, {
      override: true,
    }).to({
      scaleY: 0.8
    }, 150, createjs.Ease.backOut)
    .to({
      y: Legs_bY - 35,
      scaleY: 1.2
    }, 700, createjs.Ease.backOut)
    .to({
      y: Legs_bY,
      scaleY: 0.8
    }, 500, createjs.Ease.backOut)
    .to({
      scaleY: 1
    }, 150, createjs.Ease.backOut);
}

function Left_Head(e, data) {
  let Fary = data ? data[0] : e;
  let Head = Fary.getChildByName('TOP').getChildByName('HEAD');
  let OldY = Head.y;
  new createjs.Tween.get(Head, {
    override: true,
  }).to({
    rotation: 25
  }, 1000, createjs.Ease.backOut);
}

function Right_Head(e, data) {
  let Fary = data ? data[0] : e;
  let Head = Fary.getChildByName('TOP').getChildByName('HEAD');
  let OldY = Head.y;
  new createjs.Tween.get(Head, {
    override: true,
  }).to({
    rotation: -25,
    y: OldY + 5
  }, 1000, createjs.Ease.backOut);
}

function Fary_Says(e, t) {
  let NewCon = new createjs.Container();
  let FaryMouth = e.getChildByName('TOP').getChildByName('HEAD').getChildByName('Mouth');

  let NewC1 = new createjs.Shape();
  NewC1.graphics.setStrokeStyle(1).beginStroke('grey')
    .drawCircle(152.5, 62.5, 5);
  let NewC2 = new createjs.Shape();
  NewC2.graphics.setStrokeStyle(1).beginStroke('grey')
    .drawCircle(167.5, 52.5, 10);
  let NewC3 = new createjs.Shape();
  NewC3.graphics.setStrokeStyle(1).beginStroke('grey')
    .drawCircle(187.5, 32.5, 15);
  // придумать функцию для рандомной отрисовки облачков
  let NewT = new createjs.Text(t, '30px Arial', 'green');
  NewT.setTransform(215, 10);

  let NewR1 = new createjs.Shape();
  NewR1.graphics.setStrokeStyle(1).beginStroke('grey')
    .drawRoundRectComplex(207.5, 2.5, NewT.getMeasuredWidth() + 15, 50, 6, 6, 6, 6);
  NewCon.addChild(NewC1, NewC2, NewC3, NewR1, NewT);
  // NewCon.setTransform(e.x + 92, e.y + 37, );
  NewCon.setTransform(e.x, e.y, e.scaleX, e.scaleY);
  // console.log(NewCon);
  MainCanvas.addChild(NewCon);
  new createjs.Tween.get(NewCon).wait(1500).to({
    alpha: 0
  }, 150).call(function() {
    MainCanvas.removeChild(NewCon);
  });
}
