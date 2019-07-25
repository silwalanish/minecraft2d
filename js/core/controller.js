
const KEY_A = 65;
const KEY_B = 66;
const KEY_C = 67;
const KEY_D = 68;
const KEY_E = 69;
const KEY_F = 70;
const KEY_G = 71;
const KEY_H = 72;
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;
const KEY_M = 77;
const KEY_N = 78;
const KEY_O = 79;
const KEY_P = 80;
const KEY_Q = 81;
const KEY_R = 82;
const KEY_S = 83;
const KEY_T = 84;
const KEY_U = 85;
const KEY_V = 86;
const KEY_W = 87;
const KEY_X = 88;
const KEY_Y = 89;
const KEY_Z = 90;

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const KEYBOARD = {
  keysPressed: {},
  isKeyPressed: (keyCode) => {
    return KEYBOARD.keysPressed.hasOwnProperty(keyCode);
  }
};


document.addEventListener("keydown", function (e) {
  if(!KEYBOARD.keysPressed.hasOwnProperty(e.keyCode)){
    KEYBOARD.keysPressed[e.keyCode] = e;
  }
});

document.addEventListener("keyup", function (e) {
  if(KEYBOARD.keysPressed.hasOwnProperty(e.keyCode)){
    delete KEYBOARD.keysPressed[e.keyCode];
  }
});