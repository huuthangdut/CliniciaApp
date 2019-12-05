import { NavigationActions, StackActions  } from 'react-navigation';

let _navigator;

const setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      type: 'Navigation/NAVIGATE',
      routeName,
      params
    })
  );
}

const reset = (routeName, params) => {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params
        }),
      ],
      key: undefined
    }),
  );
}

export const NavigationService = {
  navigate,
  reset,
  setTopLevelNavigator
};