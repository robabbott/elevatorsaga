{
  init: function(elevators, floors) {
    for (let e = 0; e < elevators.length; e++) {
      elevators[e].on('idle', function () {
        this.goToFloor(0);
      }).on('floor_button_pressed', function (floorNum) {
        this.goToFloor(floorNum);
      });

      for (let f = 0; f < floors.length; f++) {
        const level = floors[f].level;

        floors[f].on('up_button_pressed down_button_pressed', function () {
          if (!elevators[e].loadFactor) {
            elevators[e].goToFloor(level);
          }
        });
      }
    }
  },
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  }
}