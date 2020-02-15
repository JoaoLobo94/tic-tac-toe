import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { set } from "@ember/object";

export default class TictactoeComponent extends Component {
  winningCombo = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  @tracked count = 0;

  @tracked xTurn = true;

  @tracked grid = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null
  };

  @action
  increment() {
    this.count++;
    if (this.count % 2 == 0) {
      this.xTurn = true;
    } else {
      this.xTurn = false;
    }
  }

  @action

  played(focus) {
    for (var i = 1; i < 10; i++) {
      if (this.grid[i] == null) {
        if (this.count % 2 == 0) {
          set(this.grid, i, "x");
          break;
        } else {
          set(this.grid, i, "circle");
          break;
        }
      }
    }
  }
  @action
  winner(){}
}
