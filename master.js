let boxesContainer = document.querySelector(".container");
let boxes = document.querySelectorAll(".box");
let arrayBoxes = Array.from(boxes);
let counter = 0;


if(localStorage.getItem('Name')) {


  let rank = document.createElement('div');
  rank.classList.add('rank');

  let spanName = document.createElement('div');
  spanName.innerHTML = "Name: ";
  let spanInName = document.createElement('span');
  spanInName.innerHTML = localStorage.getItem('Name');
  spanName.append(spanInName);
  rank.appendChild(spanName);
  
  let spanTime = document.createElement('div');
  spanTime.innerHTML = 'Time Spent: ';
  let spanInTime = document.createElement('span');
  spanInTime.innerHTML = `${localStorage.getItem('Time Spent')} Sec`;
  spanTime.append(spanInTime);
  rank.append(spanTime);
  

  document.querySelector('.leaderBoard').appendChild(rank);

}

document.querySelector(".control-button span").onclick = () => {
  let yourName = prompt("Whats Your Name?");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else document.querySelector(".name span").innerHTML = yourName;

  document.querySelector(".control-button").style.display = 'none';

  timeSpent()
};

let orderRange = Array.from(Array(boxes.length).keys());


shuffle(orderRange);

boxes.forEach((box, index) => {
  box.style.order = orderRange[index];
});

boxes.forEach((box) => {
  box.onclick = () => {
    box.classList.add("backVisible");
    let allFlippedBlock = arrayBoxes.filter((flip) =>
      flip.classList.contains("backVisible")
    );
    if (allFlippedBlock.length == 2) {
      stopClick();
      
      if (allFlippedBlock[0].dataset.tech === allFlippedBlock[1].dataset.tech) {
        counter+= 2;
        allFlippedBlock[0].classList.remove("backVisible");
        allFlippedBlock[1].classList.remove("backVisible");

        allFlippedBlock[0].classList.add("hasMatch");
        allFlippedBlock[1].classList.add("hasMatch");

        document.querySelector("audio#success").play();
      } else {
        document.querySelector(".tries span").innerHTML =
          parseInt(document.querySelector(".tries span").innerHTML) + 1;
        setTimeout(() => {
          allFlippedBlock[0].classList.remove("backVisible");
          allFlippedBlock[1].classList.remove("backVisible");
        }, 1000);
        document.querySelector("audio#error").play();
      }
    }
  };
});


document.querySelector('.reload').onclick = () => {
  window.location.reload();
}

function stopClick() {
  boxesContainer.classList.add("no-clicking");

  setTimeout(() => {
    boxesContainer.classList.remove("no-clicking");
  }, 1000);
}

function shuffle(array) {
  let random, temp;
  let current = array.length;
  console.log(current);
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    
    current--;
    
    temp = array[current]; 
    array[current] = array[random];
    array[random] = temp;
  } 
  return array;
}

function timeSpent () {
  let time = setInterval(() => {
    document.querySelector('.time span').innerHTML++;
    if(counter == boxes.length) {
      clearInterval(time);
      EndGame();
    }
  }, 1000);
}

function EndGame() {
  leaderBoard();
  alert(
    `Name: ${document.querySelector(".name span").innerHTML}\nTime Spent: ${
      document.querySelector(".time span").innerHTML
    }\nWrong Tries: ${document.querySelector(".tries span").innerHTML}`
  );
}
function leaderBoard() {
  if(+document.querySelector('.time span').innerHTML < +localStorage.getItem('Time Spent')) {
  localStorage.setItem(
    "Name",
    document.querySelector(".name span").innerHTML
  );
  localStorage.setItem(
    "Time Spent",
    document.querySelector(".time span").innerHTML
  );
  }

}

