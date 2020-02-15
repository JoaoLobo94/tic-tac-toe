import Service from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class TrackerService extends Service {
    @tracked count = 9;
    
}
