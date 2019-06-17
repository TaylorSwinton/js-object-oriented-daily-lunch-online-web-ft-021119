// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
    constructor(name){
        this.id = ++neighborhoodId
        this.name = name
    
    //insert
    store.neighborhoods.push(this)
    }

    deliveries(){
        //returns a list of all deliveries placed in a neighborhood
        return store.deliveries.filter(
            function(delivery) {
                return delivery.neighborhoodId === this.id
            }.bind(this)
        );
    }

    customers(){
        //returns all of the customers that live in a particular neighborhood
        return store.customers.filter(
            function (customer) {
               return customer.neighborhoodId === this.id
            }.bind(this)
         )
    }

    meals() {
        let allMeals = this.deliveries().map(
          function(delivery) {
            return delivery.meal();
          }
        )
    
        return [... new Set(allMeals)]
      }
}

class Customer {
    constructor(name, neighborhoodId) {
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      this.id = ++customerId;
  
      store.customers.push(this);
    }
  
    deliveries() {
      return store.deliveries.filter(
        function(delivery) {
          return delivery.customerId === this.id;
        }.bind(this)
      )
    }
  
    meals() {
      return this.deliveries().map(
        function(delivery) {
          return delivery.meal()
        }
      )
    }
    totalSpent() {
      return this.meals().reduce( function(agg, el) {return agg + el.price }, 0 );
    }
  }
  
  
  class Meal {
    constructor(title, price, neighborhoodId, customerId) {
      this.title = title;
      this.price = price;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      this.id = ++mealId;
  
      store.meals.push(this);
    }
  
    deliveries() {
      return store.deliveries.filter(
        function(delivery) {
          return delivery.mealId === this.id;
        }.bind(this)
      )
    }
  
    customers() {
      return this.deliveries().map(
        function(delivery) {
          return delivery.customer();
        }
      )
    }
  }
  
  Meal.byPrice = function () {
     return store.meals.sort(function (a,b) {
        return b.price - a.price
     })
  }
  
  class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      this.id = ++deliveryId;
  
      store.deliveries.push(this);
    }
  
    meal() {
      return store.meals.find(
        function(meal) {
          return meal.id === this.mealId;
        }.bind(this)
      )
    }
  
    customer() {
      return store.customers.find(
        function(customer) {
          return customer.id === this.customerId;
        }.bind(this)
      )
    }
  
    neighborhood() {
      return store.neighborhoods.find(
        function(neighborhood) {
          return neighborhood.id === this.neighborhoodId;
        }.bind(this)
      )
    }
  }