{
  init: function(elevators, floors) {
    let waiting = [];

    for (let e = 0; e < elevators.length; e++) {
      elevators[e].on('idle', function () {
        goToNextFloor(this, 0);
      }).on('floor_button_pressed', function (floorNum) {
        // This doesn't seem to fire always when expected.  Elevators wait for too many people on floor 0, when button should have been pushed?
        // Possible backup of elevator tasks causing one elevator to load too many people and not delvering everyone in time
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

    function goToNextFloor(elevator, floorNum) {
      const pressedFloors = elevator.getPressedFloors();
      const nextFloor = pressedFloors.length ? pressedFloors[0] : floorNum;

      if (!nextFloor && waiting.length) {
        elevator.goToFloor(waiting[0]);
        waiting.splice(0, 1);
      } else {
        elevator.goToFloor(nextFloor);
      }
    }

    function checkPassing(elevator, floorNum, direction) {
      const pressedFloors = elevator.getPressedFloors();

      if (!pressedFloors.includes(floorNum) || elevator.loadFactor() > .9) {
        return false;
      }

      elevator.goToFloor(floorNum);
    }
  },
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  }
}