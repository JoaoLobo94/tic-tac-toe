import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { set } from "@ember/object";
import { inject as service } from "@ember/service";
import { getOwner } from '@ember/application';

export default class TictactoeComponent extends Component {
  
  get tracker() {
    return getOwner(this).lookup('service:tracker');
  }
  @tracked xTurn = false;

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
    if ( this.tracker.count > 0) {
      this.tracker.count--;
      if (this.tracker.count % 2 == 0) {
        this.xTurn = true;
      } else {
        this.xTurn = false;
      }
    }
  }

  @action
  played(gridParam) {
    if (this.grid[gridParam] == null) {
      if (this.tracker.count % 2 == 0) {
        set(this.grid, gridParam, "x");
      } else {
        set(this.grid, gridParam, "circle");
      }
    }
  }
  @action
  winner() {

  }
}
