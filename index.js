let hats = document.getElementById("top");
let beards = document.getElementById("middle");
let bellies = document.getElementById("bottom");

const backgroundPosition1 = { x: 0 };
const backgroundPosition2 = { x: 0 };
const backgroundPosition3 = { x: 0 };

const WIDTH = 643;

let counter = 0;

function calculateTarget(obj, WIDTH) {
  if (obj.x > WIDTH * (2 / 3)) {
    console.log("zone 1");
    return WIDTH * 2;
  } else if (obj.x > WIDTH / 3) {
    console.log("zone 2");
    return WIDTH * (1 + 2 / 3);
  } else {
    console.log("zone 3");
    return WIDTH * (1 + 1 / 3);
  }
}

let results = {
  hat: null,
  beard: null,
  belly: null
};

let topTween = new TWEEN.Tween(backgroundPosition1, false)
  .to({ x: WIDTH }, 1900)
  .onUpdate(() => {
    hats.style.setProperty(
      "background-position-x",
      backgroundPosition1.x + "px"
    );
  })
  .onStop((obj) => {
    let target = calculateTarget(obj, WIDTH);

    topTween
      .to({ x: target }, 4000)
      .repeat(0)
      .easing(TWEEN.Easing.Quadratic.Out);

    results.hat = target;
  })
  .repeat(Infinity)
  .start();

let middleTween = new TWEEN.Tween(backgroundPosition2, false)
  .to({ x: -WIDTH }, 1200)
  .onUpdate(() => {
    beards.style.setProperty(
      "background-position-x",
      backgroundPosition2.x + "px"
    );
  })
  .onStop((obj) => {
    let target = calculateTarget(obj, WIDTH);

    middleTween
      .to({ x: -target }, 2300)
      .repeat(0)
      .easing(TWEEN.Easing.Quadratic.Out);

    results.beard = target;
  })
  .repeat(Infinity)
  .start();

let bottomTween = new TWEEN.Tween(backgroundPosition3, false)
  .to({ x: WIDTH }, 800)
  .onUpdate(() => {
    bellies.style.setProperty(
      "background-position-x",
      backgroundPosition3.x + "px"
    );
  })
  .onStop((obj) => {
    let target = calculateTarget(obj, WIDTH);

    bottomTween
      .to({ x: target }, 1650)
      .repeat(0)
      .easing(TWEEN.Easing.Quadratic.Out);

    results.belly = target;
    console.log(results);
  })
  .repeat(Infinity)
  .start();

// Setup the animation loop.
function animate(time) {
  requestAnimationFrame(animate);
  topTween.update(time);
  middleTween.update(time);
  bottomTween.update(time);
}

requestAnimationFrame(animate);

function stopHat(e) {
  topTween.stop();
  document.getElementById("hat-button").disabled = true;
  document.getElementById("hat-button").style.setProperty("display", "none");
  document
    .getElementById("beard-button")
    .style.setProperty("display", "inline-block");
}

function stopBeard() {
  middleTween.stop();
  document.getElementById("beard-button").style.setProperty("display", "none");
  document
    .getElementById("belly-button")
    .style.setProperty("display", "inline-block");
}

function stopBelly() {
  bottomTween.stop();
  document.getElementById("belly-button").disabled = true;
  document.getElementById("result").textContent = "Done";
}

function again() {
  console.log("play again");
}