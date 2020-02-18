import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class TrackerService extends Service {
  @tracked xVictory = 0;
  @tracked oVictory = 0;
  @tracked draws = 0;
}
