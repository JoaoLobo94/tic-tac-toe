import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { set } from "@ember/object";
import { getOwner } from '@ember/application';

export default class TictactoeComponent extends Component {
  
  get tracker() {
    return getOwner(this).lookup('service:tracker');
  }
  @tracked xTurn = false;

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
  winner(gridParam) {
    this.tracker.winningCombo.some(combination =>{
        combination.every(index =>{
        gridParam[index].classList.contains('x')
      })
    })
  }
}



