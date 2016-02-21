$(function() {

  // grab the elements we need
  var $list = $('ul');
  var $listItems = $list.find('li');
  var $select = $('select');
  var $filter = $('input');

  // create an array of objects
  // each object in the array contains the data
  // held in the data-attribute on the <li>
  var data = $listItems.toArray().map(function(li) {

    // $(li).data() returns an object of all the data-attributes on the element
    // eg: { firstnane: "Mike", lastname: "Hayden", age: 35 }
    data = $(li).data();

    // also store a reference to the element itself, so we
    // can easily manipulate it later
    data.$element = $(li);
    return data;
  });

  // a function to sort the array which takes two arguments
  // the name of the attribute to sort (firstname, lastname, age),
  // and a direction (asc, desc)
  function sortData(attribute, direction) {

    // sort the array using javascript's native sort function
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    data.sort(function(a, b) {
      if(direction === 'asc') {
        return a[attribute] < b[attribute] ? -1 : a[attribute] > b[attribute] ? 1 : 0;
      } else {
        return a[attribute] < b[attribute] ? 1 : a[attribute] > b[attribute] ? -1 : 0;
      }
    });

    // after the array has been sorted append each item
    // to this list, this actually changes the order of
    // each item on the screen
    data.forEach(function(obj) {
      obj.$element.appendTo($list);
    });
  }

  // when the dropdown is changed, run the sort function,
  // based on the option that is selected
  $select.on('change', function() {
    var sortBy = $select.val().split(' ');
    sortData(sortBy[0], sortBy[1]);
  });

  // on keyup, filter the list
  $filter.on('keyup', function() {
    // create a case-insensitive regular expression instance
    // this will be used to check the contents of each object
    // against the contents of the search input
    var regex = new RegExp($filter.val(), "i");

    // loop over the data object, if there's a match
    // remove the class of hidden on the item,
    // otherwise add the class of hidden, which will hide the object
    data.forEach(function(obj) {
      
      // Object.keys will return an array of keys in an object
      // eg: Object.keys({ firstname: "Mike", lastname: "Hayden", age: 35 })
      // will return ["firstname", "lastname", "age"];

      // Array.some will iterate over an array, running the callback
      // function for each array element, until a thruthy value is
      // returned, at which point Array.some will stop running, and return true.
      // Otherwise, it'll return false
      if(Object.keys(obj).some(function(attribute) {
        return regex.test(obj[attribute]);
      })) {
        obj.$element.removeClass('hidden');
      } else {
        obj.$element.addClass('hidden');
      }
    });

  });

});