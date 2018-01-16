# Avero UI Test

# Contributors

* [Erik Polderman](http://www.eriksnoww.com) - Engineer

## Built With

* [CreateReactApp](https://github.com/facebookincubator/create-react-app) - Frontend React UI
* [Redux](https://redux.js.org/) - Frontend State Management
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
