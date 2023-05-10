
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  
  function injectHTML(list) {
    
    console.log('fired injectHTML');
    const target = document.querySelector('#restaurant_list');
    target.innerHTML='';
    list.forEach((item, index) => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str
      
    });
  }
  
  function cutRestaurantList(list) {
  
    console.log('fired cut list');
    const range = [...Array(15).keys()];
    return newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, list.length -1);
      return list[index]
    });
  }
  
  
  
  function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    })
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const form = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const filterButton = document.querySelector('#filter_button');
    const loadDataButton = document.querySelector('#data_load');
    const generatelistButton = document.querySelector('#generate');
    const textField = document.querySelector('#resto')

    const loadanimation = document.querySelector('#data_load_animation')
    loadanimation.style.display = 'none';
    generatelistButton.classList.add('hidden')

    let storedList =[];
    let currentList = [];
  
    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      
      console.log('loading data'); // this is substituting for a "breakpoint"
      loadanimation.style.display = 'inline-block';
  
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
      
  
      storedList = await results.json();
      if (storedList.length > 0) {
        generatelistButton.classList.remove('hidden');
      }
  
      loadanimation.style.display = 'none';
      console.table(storedList);
  
    });
    filterButton.addEventListener('click', (event) => {
        console.log('clicked Filterbutton');
  
        const formData = new FormData(form);
        const formProps = Object.fromEntries(formData);
  
        console.log(formProps);
        const newList = filterList(currentList, formProps.resto);
        
        console.log(newList);
        injectHTML(newList);
    });
  
  
    generatelistButton.addEventListener('click', (event) => {
      console.log('generate new list')
      currentList = cutRestaurantList(storedList);
      injectHTML(currentList);
    });
    const results = await fetch('/api/foodServicesPG');
    const arrayFromJson = await results.json(); // here is where we get the data from our request as JSON

    textField.addEventListener('input', (event) => {
        console.log('input', event.target.value);
        const newList = filterList(currentList, event.target.value);
        console.log(newList);
        injectHTML(newList)
    })
  
    /*
      Below this comment, we log out a table of all the results using "dot notation"
      An alternate notation would be "bracket notation" - arrayFromJson["data"]
      Dot notation is preferred in JS unless you have a good reason to use brackets
      The 'data' key, which we set at line 38 in foodServiceRoutes.js, contains all 1,000 records we need
    */
    console.table(arrayFromJson.data);
  
    // in your browser console, try expanding this object to see what fields are available to work with
    // for example: arrayFromJson.data[0].name, etc
    console.log(arrayFromJson.data[0]);
  
    // this is called "string interpolation" and is how we build large text blocks with variables
    console.log(`${arrayFromJson.data[0].name} ${arrayFromJson.data[0].category}`);
  
    // This IF statement ensures we can't do anything if we don't have information yet
    if (arrayFromJson.data?.length > 0) { // the question mark in this means "if this is set at all"
      submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available
  
      // And here's an eventListener! It's listening for a "submit" button specifically being clicked
      // this is a synchronous event event, because we already did our async request above, and waited for it to resolve
      form.addEventListener('submit', (submitEvent) => {
        // This is needed to stop our page from changing to a new URL even though it heard a GET request
        submitEvent.preventDefault();
  
        // This constant will have the value of your 15-restaurant collection when it processes
        const restaurantList = processRestaurants(arrayFromJson.data);
  
        // And this function call will perform the "side effect" of injecting the HTML list for you
        injectHTML(restaurantList);
  
        // By separating the functions, we open the possibility of regenerating the list
        // without having to retrieve fresh data every time
        // We also have access to some form values, so we could filter the list based on name
      });
    }
  
    
  }
  
  /*
    This adds an event listener that fires our main event only once our page elements have loaded
    The use of the async keyword means we can "await" events before continuing in our scripts
    In this case, we load some data when the form has submitted
  */
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  
  
  
  
  