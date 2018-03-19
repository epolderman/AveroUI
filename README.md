# Avero UI Test

# Contributors

* [Erik Polderman](http://www.eriksnoww.com) - Engineer

## Built With

* [CreateReactApp](https://github.com/facebookincubator/create-react-app) - Frontend React UI
* [Redux](https://redux.js.org/) - Frontend State Management
* [ReduxThunk](https://github.com/gaearon/redux-thunk) - Async Request Redux State Management(get ahold of dispatch function) --> Edit: Fazed most of redux thunk out of the application
* [ReduxObservable](https://redux-observable.js.org/docs/basics/Epics.html) - Epics providing a stream of actions in and actions out
* [Node](https://nodejs.org/en/) - Node Package Manager
* [Bootstrap](https://v4-alpha.getbootstrap.com/) - Responsive Styling
* [Axios](https://github.com/axios/axios) - Async Library
* [Lodash](https://lodash.com/) - JS Object Manipulation

# How to run

* git clone url(this repo)
* npm install
* npm run start

# Implementation Notes

* UI is data driven.
* Limited animations because server's need information ASAP.
* Used bootstrap styling because of the responsive behavior (did not use BS js).
* Flat UI colors were used because server's need to be able to look down at the tablet and back up to customers.
* Async/Promise Errors are handled via MessageBar and this is hooked directly into app state to
  notify users when their actions/backend req fail.
* Some stylings were rushed and less comments were written. (mobile was not implemented)
* Landing Page component is bloated but I decided to add more features compared to refactoring components.

# Main Features

* Landing: Users can view all open tables. User can view all checks and sort them via Open, Closed, All, and by Tablenumber.
  User can see all items on a check whether its state(open, closed) and whether items are void. There are stats showing the user need to know information on main landing page.
* Table: Users can open check, add items to check, close check. Users can also see all closed checks on the table.
