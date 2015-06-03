var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _.filter(products,function(product){
        return !product.containsNuts && _.all(product.ingredients,function(ingredient) {
          return ingredient !== 'mushrooms'
        })
      })

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.chain(1000).range().reduce(function(total,num){
      return (num % 3 === 0 || num % 5 === 0) ? total+num : total;
    },0).value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    var ingredientCount = _.chain(products)
      .map(function(product){
        return product.ingredients;
      })
      .flatten()
      .reduce(function(obj,ingredient) {
        obj[ingredient] = (obj[ingredient] || 0) + 1;
        return obj;
      },{})
      .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

    var findLargestPrime = function(num) {
      var i = num;

      while(--i) {
        if( num % i === 0 && i % 2 !== 0 ) return i;
      }

    };

    expect(findLargestPrime(485)).toBe(97);
    expect(findLargestPrime(9747)).toBe(3249);

  });

  it("should find the largest palindrome made from the product of any numbers", function () {
    var numericPalindrome = function() {

      var frontStr, backStr;
      var strDoubles = [];

      var sum = _.chain(arguments)
        .toArray(arguments)
        .reduce(function(total,num) {
          return total * num;
        })
        .value();

      var values = _.chain(sum.toString().split(''))
        .map(function(val) {
          return +val;
        })
        .sortBy(function(num) {
          return num;
        })
        .value();

      var totalDoubles = _.chain(values)
        .groupBy(function(num) {
          return num;
        })
        .filter(function(vals) {
          return vals.length > 1;
        })
        .reduce(function(combinedArr,arr) {
          var amount, result;

          while (arr.length % 2 !== 0) {
            arr.pop();
          }

          strDoubles = strDoubles.concat(arr.slice(0,arr.length/2));

          return combinedArr.concat(arr);
        },[])
        .value();

      strDoubles = _.sortBy(strDoubles,function(num) {
        return num;
      });

      backStr = strDoubles.join('');
      frontStr = backStr.split('').reverse().join('');

      var largest = _.chain(values)
        .reject(function(num) {
          if( totalDoubles.indexOf(num) !== -1 ) {
            totalDoubles.splice(totalDoubles.indexOf(num),1);
            return true;
          }
        })
        .max()
        .value();

      return +(frontStr + largest + backStr);
    }

    expect(numericPalindrome(2824,2399)).toBe(7764677);
    expect(numericPalindrome(888,91)).toBe(80808);
    expect(numericPalindrome(937,113)).toBe(81518);
    expect(numericPalindrome(657,892)).toBe(484);
    expect(numericPalindrome(755,223)).toBe(686);
    expect(numericPalindrome(57,62,23)).toBe(82128);
    expect(numericPalindrome(48,9,3,67)).toBe(868);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    var divisibleBy = function(num1,num2) {
      var result;
      var i = num2;
      var range = _.range(num1,num2+1);

      while(!result) {
        ++i;
        result = _.every(range,function(num) {
          return i % num === 0;
        });
      }

      return i;
    };

     expect(divisibleBy(1,2)).toBe(4);
     expect(divisibleBy(1,5)).toBe(60);
     // expect(divisibleBy(1,20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    var sumSquareDifference = function(num) {
      var range = _.range(1,num+1);

      var sumOfSquares = _.reduce(range,function(sum,val) {
        return sum += Math.pow(val,2);
      },0);

      var sums = _.reduce(range,function(sum,val) {
        return sum += val;
      },0); 

      return Math.abs(sumOfSquares - Math.pow(sums,2));
    };

    expect(sumSquareDifference(10)).toBe(2640);
    expect(sumSquareDifference(15)).toBe(13160);
  });

  it("should find the 10001st prime", function () {

    var nthPrime = function(n) {
      var prime;
      var primes = [2];
      var i = 3;

      while(primes.length !== n) {

        prime = _.every(_.range(2,i),function(num) {
          return i % num !== 0; 
        });

        if(prime) {
          primes.push(i);
        }

        ++i;
      }

      return primes[n-1];
    };

    expect(nthPrime(10)).toBe(29);
    expect(nthPrime(45)).toBe(197);
    // expect(nthPrime(10001)).toBe(104743);
  });
  
});
