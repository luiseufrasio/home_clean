(function(){
    var app = angular.module('homeApp', []);

    app.controller('CustomerController', [ '$http', '$scope', function($http, $scope) {
        $scope.tab = 1;
        
        $scope.selectTab = function(setTab) {
          this.tab = setTab;
        };
        
        $scope.isSelected = function(checkTab) {
          return this.tab === checkTab;
        };
        
        $scope.customers = [];

        $scope.listCustomers = function() {
          // window.alert(navigator.userAgent);
          
          $http.get('http://homeclean.herokuapp.com/api/customers').then(
            function(response) {
              $scope.customers = response.data;
            },
            function(error) {
              console.log(error);
            }
          );
        };

        $scope.createCustomer = function() {
          var req = {
            method: "POST",
            url: "http://homeclean.herokuapp.com/api/customers",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            data: {
              "api_customer": {
                "first_name": this.first_name,
                "last_name": this.last_name,
                "address1": this.address1,
                "address2": this.address2,
                "zip": this.zip,
                "city": this.city,
                "state": this.state,
                "ssid": this.ssid,
                "email": this.email,
                "phone": this.phone
              }
            }
          };
          
          if (this.id == null || this.id == '0') {
            $http(req).then(
              function(response) {
                console.log(response);
                $scope.resetForm();
              }, 
              function(error) {
                console.log(error);
              }
            );
          } else {
            $scope.updateCustomer(this.id, req.data);
          }
        };
        
        $scope.updateCustomer = function(id, put_data) {
          var req = {
            method: "PUT",
            url: "http://homeclean.herokuapp.com/api/customers/" + id,
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            data: put_data
          };

          $http(req).then(
            function(response) {
              console.log(response);
              $scope.resetForm();
            }, 
            function(error) {
              console.log(error);
            }
          );
        };
        
        $scope.updatePrice = function(id) {
          var price = this.customer.price;
          
          var req = {
            method: "PUT",
            url: "http://homeclean.herokuapp.com/api/customers/" + id,
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            data: {
              "api_customer": {
                "price": price
              }
            }
          };

          $http(req).then(
            function(response) {
              console.log(response);
              window.alert('Price UPDATED to $' + price);
            }, 
            function(error) {
              console.log(error);
            }
          );
        };
        
        $scope.deleteCustomer = function(id, fName, lName) {
          var decision = window.confirm("The customer '" + fName 
            + " " + lName + "' will be DELETED. Are you sure?");
          
          if (decision) {
            var req = {
              method: "DELETE",
              url: "http://homeclean.herokuapp.com/api/customers/" + id,
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              }
            };
  
            $http(req).then(
              function(response) {
                $scope.listCustomers();
                console.log(response);
              }, 
              function(error) {
                console.log(error);
              }
            );
          }
        };
        
        $scope.changeCustomer = function(id) {
          $scope.id = id;
          $scope.first_name = this.customer.first_name;
          $scope.last_name = this.customer.last_name;
          $scope.address1 = this.customer.address1;
          $scope.address2 = this.customer.address2;
          $scope.zip = this.customer.zip;
          $scope.city = this.customer.city;
          $scope.state = this.customer.state;
          $scope.ssid = this.customer.ssid;
          $scope.email = this.customer.email;
          $scope.phone = this.customer.phone;
          
          $scope.selectTab(1);
        };
        
        $scope.resetForm = function() {
          this.id = '0';
          this.first_name = '';
          this.last_name = '';
          this.address1 = '';
          this.address2 = '';
          this.zip = '';
          this.city = '';
          this.state = '';
          this.ssid = '';
          this.email = '';
          this.phone = '';
          document.getElementById("cForm").reset();
          
          $scope.listCustomers();
          $scope.selectTab(2);
        };

    } ]);

})();