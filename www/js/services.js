angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('LifeInsuredFactory', [function(){

}])

.factory('LifeInsured', function ($http, $rootScope, $stateParams) {

  return {
    get: function () {
      return $http.get('http://ec2-13-54-111-58.ap-southeast-2.compute.amazonaws.com/api/v1/getlifeinsured?id=1', { params: { firstname: $rootScope.firstname, 
          surname: $stateParams.surname, email: $stateParams.email, dob: $stateParams.dob, addressline1: $stateParams.addressline1, addressline2: $stateParams.addressline2,
         suburb: $stateParams.suburb, state: $stateParams.state, postcode: $stateParams.postcode, country: $stateParams.country} })
    },
  };
})

.service('BlankService', [function(){

}]);
