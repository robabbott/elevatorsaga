{
  init: function(elevators, floors) {
    let waiting = [];

    for (let e = 0; e < elevators.length; e++) {
      elevators[e].on('idle', function () {
        getNextPerson(this);
      }).on('floor_button_pressed', function (floorNum) {
        const pressedFloors = this.getPressedFloors();
        const nextFloor = pressedFloors.length ? pressedFloors[0] : floorNum;
        this.goToFloor(nextFloor);
      });
    }

    for (let f = 0; f < floors.length; f++) {
      const level = floors[f].level;

      floors[f].on('up_button_pressed down_button_pressed', function () {
        if (!waiting.includes(level)) {
          waiting.push(level);
        }

        // if (!elevators[e].loadFactor()) {
        //   getNextPerson(elevators[e]);
        // }

        for (let e = 0; e < elevators.length; e++) {
          // console.log(elevators[e].destinationQueue)
        }
      });
    }

    function getNextPerson(elevator) {
      if (waiting.length) {
        elevator.goToFloor(waiting[0]);
        waiting.splice(0, 1);
      } else {
        elevator.goToFloor(0);
      }
    }
  },
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  }
}