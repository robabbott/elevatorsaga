{
  init: function(elevators, floors) {
    let waiting = [];

    for (let e = 0; e < elevators.length; e++) {
      elevators[e].on('idle', function () {
        this.goToFloor(0);
      }).on('floor_button_pressed', function (floorNum) {
        if (this.loadFactor()) {
          this.goToFloor(floorNum);
        }
      });

      for (let f = 0; f < floors.length; f++) {
        const level = floors[f].level;

        floors[f].on('up_button_pressed down_button_pressed', function () {
          if (!waiting.includes(level)) {
            waiting.push(level);
          }

          if (!elevators[e].loadFactor()) {
            elevators[e].goToFloor(waiting[0]);
            waiting.splice(0, 1);
          }
        });
      }
    }
  },
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  }
}