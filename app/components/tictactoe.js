import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

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

  @action
  increment() {
    this.count++;
    if (this.count % 2 == 0) {
      this.xTurn = true;
    } else {
      this.xTurn = false;
    }
  }
}
