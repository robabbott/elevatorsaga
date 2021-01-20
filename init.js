{
  init: function(elevators, floors) {
    let waiting = [];

    for (let e = 0; e < elevators.length; e++) {
      elevators[e].on('idle', function () {
        getNextPerson(this);
      }).on('floor_button_pressed', function (floorNum) {
        goToNextFloor(this, floorNum);
      }).on('passing_floor', function (floorNum, direction) {
        checkPassing(this, floorNum, direction);
      });
    }

    for (let f = 0; f < floors.length; f++) {
      const level = floors[f].level;

      floors[f].on('up_button_pressed down_button_pressed', function () {
        if (!waiting.includes(level)) {
          waiting.push(level);
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

    function goToNextFloor(elevator, floorNum) {
      const pressedFloors = elevator.getPressedFloors();
      const nextFloor = pressedFloors.length ? pressedFloors[0] : floorNum;
      elevator.goToFloor(nextFloor);
    }

    function checkPassing(elevator, floorNum, direction) {
      const pressedFloors = elevator.getPressedFloors();

      if (!pressedFloors.includes(floorNum)) {
        return false;
      }

      elevator.goToFloor(floorNum);
    }
  },
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  }
}