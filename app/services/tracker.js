import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class TrackerService extends Service {
  @tracked xVictory = 0
  @tracked oVictory = 0
  @tracked draws = 0
  @tracked xWins = false;
  @tracked oWins = false;
  @tracked isDraw = false;
  @tracked gameVariable = 'x'
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



}
