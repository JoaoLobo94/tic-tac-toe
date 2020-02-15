import Service from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class TrackerService extends Service {
    @tracked count = 9;
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
    
}
