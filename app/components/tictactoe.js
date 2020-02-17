import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { set } from "@ember/object";
import { getOwner } from "@ember/application";

export default class TictactoeComponent extends Component {
  get tracker() {
    return getOwner(this).lookup("service:tracker");
  }
  @tracked xTurn = false;
  @tracked xWins = false;
  @tracked oWins = false;
  @tracked isDraw = false;


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
    if (this.tracker.count > 0 ) {
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
        set(this.grid, gridParam, 'x');
      } else {
        set(this.grid, gridParam, 'circle');
      }
    }
  }
  @action
  winnerArr(Piece) {
    return Object.keys(this.grid).filter(key => {
     return this.grid[key] === Piece
    }).map(Number)
  }


  @action
  isWinner(gamePiece){
    for (let i = 0; i < this.winningCombo.length; i++) {
     let victory = this.winningCombo[i].every(r=>this.winnerArr(gamePiece).indexOf(r) >= 0)      
      if (victory == true) {
        return true
      }
      else if (Object.values(this.grid).includes(null)==false) {
        return "Draw"
      }
    }
  }

  @action
  winner() {
    if (this.isWinner() == "Draw") {
      this.isDraw = true;
      this.tracker.draws++;
    }
    else if (this.isWinner("x")) {
      this.xWins = true;
      this.tracker.xVictory++;
    } else if (this.isWinner("circle")) {
      this.oWins = true;
      this.tracker.oVictory++;
    } 
  }
  @action
  restart() {
    this.tracker.count = 9;
    this.xWins = false;
    this.oWins = false;
    this.draws = false;
   // for (let index = 0; index < this.grid.length; index++) {
     // set(this.grid, this.grid[i], null)
    //  
   // }
  }
}
