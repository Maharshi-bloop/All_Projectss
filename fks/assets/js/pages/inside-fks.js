function circularText(txt, radius, classIndex) {
  txt = txt.split("");
  classIndex = document.getElementsByClassName("circTxt")[classIndex];

  var deg = 180 / txt.length;
  var origin = 270; // ← Start from LEFT side of bottom arc

  txt.forEach((ea) => {
    ea = `<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%;margin:0;padding:0'>${ea}</p>`;
    classIndex.innerHTML += ea;
    origin -= deg; // ← Decrement toward 90° (sweeps through bottom)
  });
}

circularText("From production floors to store shelves across regions. ", 320, 0);