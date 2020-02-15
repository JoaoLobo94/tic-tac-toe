import Service from '@ember/service';
import {tracked} from '@glimmer/tracking'

export default class CounterService extends Service {
    get numberOFGames(){
        return this.games.length
    }

    @tracked games = [
        {
            x: '',
            o: ''
        }
    ]

    addGame(game){
        this.games.addObject(game)
    }
}
