<template>
  <footer class="fixed z-20 bottom-0 w-full h-full bg-hogwarts-dark grid place-content-center">
      <div>
          <p class="text-3xl sm:text-4xl text-center mb-8">Select a House</p>
      </div>
      <div class="hogwarts-crest-container w-[20rem] sm:w-[30rem]">
          <img class="hogwarts-crest-red" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-red.svg">
          <img class="hogwarts-crest-green" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-green.svg">
          <img class="hogwarts-crest-yellow" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-yellow.svg">
          <img class="hogwarts-crest-blue" src="../assets/hogwarts-parts/hogwarts-colours/hogwarts-blue.svg">

          <img class="hogwarts-crest-gryffindor" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-gryffindor.svg">
          <img class="hogwarts-crest-slytherin" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-slytherin.svg">
          <img class="hogwarts-crest-hufflepuff-body" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-hufflepuff-body.svg">
          <img class="hogwarts-crest-hufflepuff-head" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-hufflepuff-head.svg">
          <img class="hogwarts-crest-ravenclaw" src="../assets/hogwarts-parts/hogwarts-mascots/hogwarts-ravenclaw.svg">

          <img class="hogwarts-crest-insignia" src="../assets/hogwarts-parts/hogwarts-insignia.svg">

          <img class="hogwarts-crest-frame" src="../assets/hogwarts-parts/hogwarts-frame.svg">
       </div>
  </footer>
</template>

<style scoped>
.hogwarts-crest-container {
  position: relative;
  aspect-ratio: 0.9014/1;
}

.hogwarts-crest-container > img {
  position: absolute;
  transition-duration: 300ms;
}

.hogwarts-crest-insignia {
  cursor: pointer;
  z-index: 6;
  width: 20%;
  left: 50%;
  top: 39%;
  transform: translateX(-50%) scale(1);
}

.hogwarts-crest-insignia:hover {
  transform: translateX(-50%) scale(1.3);
}

.hogwarts-crest-gryffindor {
  cursor: pointer;
  z-index: 5;
  width: 41.5587628866%;
  left: 13.35%;
  top: 8.95%;
  transform: scale(1);
  transform-origin: bottom left;
}

.hogwarts-crest-gryffindor:hover {
  transform: scale(1.1);
}

.hogwarts-crest-slytherin {
  cursor: pointer;
  z-index: 4;
  width: 28.865443299%;
  left: 50%;
  top: 11%;
  transform: scale(1) rotate(0deg);
}

.hogwarts-crest-slytherin:hover {
  transform: scale(1.2) rotate(-10deg);
}

.hogwarts-crest-hufflepuff-body {
  cursor: pointer;
  z-index: 2;
  width: 42.6274845361%;
  left: 4.63%;
  top: 52.99%;
  transform: scale(1);
  transform-origin: bottom left;
}

.hogwarts-crest-hufflepuff-head {
  cursor: pointer;
  z-index: 2;
  width: 23.3609690722%;
  left: 16%;
  top: 47%;
  transform: scale(1) rotate(0deg);
}

.hogwarts-crest-hufflepuff-body:hover + img,
.hogwarts-crest-hufflepuff-head:hover {
  transform: scale(1.1) rotate(-20deg);
}

.hogwarts-crest-ravenclaw {
  cursor: pointer;
  z-index: 3;
  width: 46.3877938144%;
  left: 49%;
  top: 29%;
  transform: scale(1) rotate(0deg);
}

.hogwarts-crest-ravenclaw:hover {
  transform: scale(1.15) rotate(10deg);
}

.hogwarts-crest-frame {
  width: 100%;
  z-index: 1;
}

.hogwarts-crest-red {
  width: 42.5482680412%;
  left: 7.45%;
  top: 1.15%;
}

.hogwarts-crest-green {
  width: 42.1755051546%;
  right: 7.45%;
  top: 1.5%;
}

.hogwarts-crest-yellow {
  width: 47.3421237113%;
  left: 2%;
  top: 47.5%;
}

.hogwarts-crest-blue {
  width: 48.0876701031%;
  right: 2%;
  top: 47.5%;
}
</style>