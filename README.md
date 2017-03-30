# VisyNotHappy Mobile Frontend 

![VisyNotHappy](./media/visynothappy.png)

## MLC Life Hackathon March 2017

The team analysed the current forms and mocked up the screen flows in https://creator.ionic.io/app/login , this produced an ionic front end project file which was able to hook into some running stubbed API's in AWS to show how dynamic data could be filled in the screens.

# Developing and Testing 

## Install software

Need NodeJS installed on your machine.

```
npm install -g cordova
npm install -g ionic
```

## Run service

```
ionic serve
```

## Create a flow to call an external service

### Service creation

Needs a codeblock and a service name (*LifeInsured*) in `www/js/services.js`, below example is for a GET request

```
.factory('LifeInsured', function ($http, $rootScope, $stateParams) {

  return {
    get: function () {
      return $http.get('http://ec2-13-54-111-58.ap-southeast-2.compute.amazonaws.com/api/v1/getlifeinsured?id=1', { params: { firstname: $rootScope.firstname,
          surname: $stateParams.surname, email: $stateParams.email, dob: $stateParams.dob, addressline1: $stateParams.addressline1, addressline2: $stateParams.addressline2,
         suburb: $stateParams.suburb, state: $stateParams.state, postcode: $stateParams.postcode, country: $stateParams.country} })
    },
  };
})

```

### Controller calls service

Add to the controller so that it uses the service to populate it's *$scope* variable which is available on the view page.

```
.controller('lifeInsuredDetailsCtrl', function ($scope, LifeInsured) {
  LifeInsured.get().success(function (response) {
    $scope.lifeInsured = response;
  })
})
```

### Display variables on page view

Define a route in a *state* object linking the controller to the view in `www/js/routes.js` , use the values from the controller's scope to populate the dynamic values on the page.

#### Route
```
  .state('menu.lifeInsuredDetails', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/lifeInsuredDetails.html',
        controller: 'lifeInsuredDetailsCtrl'
      }
    }
  })
```

#### Display (templates/lifeInsuredDetails.html)

The text is presented dynamically using the `ng-model` attribute

```
<ion-view title="Life Insured Details" id="page5">
  <ion-content padding="true" class="has-header">
    <div id="lifeInsuredDetails-button-bar6" class="button-bar"></div>
    <form id="lifeInsuredDetails-form7" class="list">
      <label class="item item-input" id="lifeInsuredDetails-input6">
        <span class="input-label">First Name</span>
        <input type="text" placeholder="" ng-model="lifeInsured.firstname">     
      </label>
      <label class="item item-input" id="lifeInsuredDetails-input4">
        <span class="input-label">Last Name</span>
        <input type="text" placeholder="" ng-model="lifeInsured.surname">
      </label>
     ...
  </ion-content>
</ion-view>
```


