import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ResetState } from './app.actions';


export interface AppStateModel {
  user: any;
  foodItems: Array<any>;
  drinkItems: Array<any>;
  homeItems: Array<any>;
}

/**
 * Default App State so we can reset the state if needed
 */
const appStateDefaults: AppStateModel = {
  user: null,
  foodItems: [],
  drinkItems: [],
  homeItems: [],
};

@State<AppStateModel>({
  name: 'app',
  defaults: appStateDefaults
})
export class AppState {

  @Selector()
  static user(state: AppStateModel) {
    return state.user;
  }

  @Selector()
  static foodItems(state: AppStateModel) {
    return state.foodItems;
  }

  @Selector()
  static drinkItems(state: AppStateModel) {
    return state.drinkItems;
  }

  @Selector()
  static homeItems(state: AppStateModel) {
    return state.homeItems;
  }

  constructor() { }

  @Action(ResetState)
  resetState(ctx: StateContext<any>, action: ResetState) {
    ctx.setState({});
  }
}
