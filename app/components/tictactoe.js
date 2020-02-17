import Component from "@glimmer/component";
import { action } from "@ember/object";
import { set } from "@ember/object";
import { getOwner } from "@ember/application";

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
  get tracker() {
    return getOwner(this).lookup("service:tracker");
  }

  @action
  whichTurn() {
    let blankSpace = Object.values(this.tracker.grid).filter(nullValue => {
      return nullValue != null;
    }).length;
    if (blankSpace % 2 == 0) {
      this.tracker.gameVariable = 'x'
    } else {
      this.tracker.gameVariable = 'circle'
    }
  }

  @action
  played(gridParam) {
    if (this.tracker.grid[gridParam] == null) {
      if (this.tracker.gameVariable == "x") {
        set(this.tracker.grid, gridParam, "x");
      } else {
        set(this.tracker.grid, gridParam, "circle");
      }
    }
  }


  @action
  winnerArr(Piece) {
    return Object.keys(this.tracker.grid)
      .filter(key => {
        return this.tracker.grid[key] === Piece;
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
      this.tracker.xWins = true;
      this.tracker.xVictory++;
    } else if (this.isWinner("circle")) {
      this.tracker.oWins = true;
      this.tracker.oVictory++;
    } else if (Object.values(this.tracker.grid).includes(null) == false) {
      this.tracker.isDraw = true;
      this.tracker.draws++;
    }
  }

  @action
  restart() {
    this.tracker.xWins = false;
    this.tracker.oWins = false;
    this.tracker.isDraw = false;
    this.tracker.gameVariable = 'x'
    this.tracker.grid = {
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
