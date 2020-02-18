import Component from "@glimmer/component";
import { action } from "@ember/object";
import { set } from "@ember/object";
import { getOwner } from "@ember/application";
import { tracked } from "@glimmer/tracking";

export default class TictactoeComponent extends Component {
  get tracker() {
    return getOwner(this).lookup("service:tracker");
  }
  @tracked xWins = false;
  @tracked oWins = false;
  @tracked isDraw = false;
  @tracked gameVariable = "x";
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
  @action
  whichTurn() {
    let blankSpace = Object.values(this.grid).filter(nullValue => {
      return nullValue != null;
    }).length;
    if (blankSpace % 2 == 0) {
      this.gameVariable = "x";
    } else {
      this.gameVariable = "circle";
    }
  }

  @action
  played(gridPosition) {
    if (this.grid[gridPosition] == null) {
      if (this.gameVariable == "x") {
        set(this.grid, gridPosition, "x");
      } else {
        set(this.grid, gridPosition, "circle");
      }
    }
  }

  @action
  winnerArr(gamePiece) {
    return Object.keys(this.grid)
      .filter(key => {
        return this.grid[key] === gamePiece;
      })
      .map(Number);
  }

  @action
  isWinner(gamePiece) {
    for (let i = 0; i < this.winningCombo.length; i++) {
      let victory = this.winningCombo[i].every(
        r => this.winnerArr(gamePiece).indexOf(r) >= 0
      );
      if (victory) {
        return true;
      }
    }
  }

  @action
  winner() {
    if (this.isWinner("x")) {
      this.xWins = true;
      this.tracker.xVictory++;
    } else if (this.isWinner("circle")) {
      this.oWins = true;
      this.tracker.oVictory++;
    } else if (Object.values(this.grid).includes(null) == false) {
      this.isDraw = true;
      this.tracker.draws++;
    }
  }

  @action
  restart() {
    this.xWins = false;
    this.oWins = false;
    this.isDraw = false;
    this.gameVariable = "x";
    this.grid = {
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
  }
}
