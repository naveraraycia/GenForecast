document.getElementById('predict-btn').addEventListener('click', predictGender)
document.querySelector('#gender').addEventListener('click', returnToHome)

async function predictGender(e){
  e.preventDefault()

  // Get input field content
  let nameInput = document.getElementById('name').value
  nameInput = nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
  
  // API Call
  const response = await fetch(`https://api.genderize.io/?name=${nameInput}`)

  const jsonData = await response.json(),
        probability = jsonData.probability * 100

  // Evaluate if Female or Male
  if(jsonData.gender === 'female'){
    // Show spinner
    document.getElementById('spinner').classList.add('flex')
    document.getElementById('spinner').classList.remove('hidden')

    // Hide home
    document.getElementById('home').classList.add('hidden')

    // show Female result after 1s
    setTimeout(()=>{
      // Remove spinner
      document.getElementById('spinner').classList.remove('flex')
      document.getElementById('spinner').classList.add('hidden')

      document.getElementById('female-result').classList.remove('hidden')
      document.getElementById('female-result').classList.add('flex')

      // Set the description
      const description = document.getElementById('female-description')
      description.innerText = `The name ${nameInput} is ${probability}% a female name`
    },1000)

  } else if(jsonData.gender === 'male'){
    // Show spinner
    document.getElementById('spinner').classList.add('flex')
    document.getElementById('spinner').classList.remove('hidden')

    // hide home
    document.getElementById('home').classList.add('hidden')

    // Show Male result after 1s
    setTimeout(()=>{
      // Remove spinner
      document.getElementById('spinner').classList.remove('flex')
      document.getElementById('spinner').classList.add('hidden')

      document.getElementById('male-result').classList.remove('hidden')
      document.getElementById('male-result').classList.add('flex')

      // Set the description
      const description = document.getElementById('male-description')
      description.innerText = `The name ${nameInput} is ${probability}% a male name`
    },1000)

  } else {
    // Show spinner
    document.getElementById('spinner').classList.add('flex')
    document.getElementById('spinner').classList.remove('hidden')

    // Hide home
    document.getElementById('home').classList.add('hidden')

    // Show Sorry Message after 1s
    setTimeout(()=>{
      // Remove spinner
      document.getElementById('spinner').classList.remove('flex')
      document.getElementById('spinner').classList.add('hidden')

      document.getElementById('null-result').classList.remove('hidden')
      document.getElementById('null-result').classList.add('flex')

      // Set the description
      const description = document.getElementById('description')
      description.innerText = `We could not evaluate the name you entered`
    },1000)
  }
}

function returnToHome(e){
  if(e.target.classList.contains('predict-another-btn')){
    let maleResult = document.getElementById('male-result'),
        femaleResult = document.getElementById('female-result'),
        nullResult = document.getElementById('null-result')
  
    // Show spinner
    document.getElementById('spinner').classList.add('flex')
    document.getElementById('spinner').classList.remove('hidden')
  
    maleResult.classList.add('hidden')
    maleResult.classList.remove('flex')
  
    femaleResult.classList.add('hidden')
    femaleResult.classList.remove('flex')
  
    nullResult.classList.add('hidden')
    nullResult.classList.remove('flex')

    // Go back to Home after 1s
    setTimeout(()=>{
      // Remove spinner
      document.getElementById('spinner').classList.remove('flex')
      document.getElementById('spinner').classList.add('hidden')

      // Return to Home
      document.getElementById('home').classList.remove('hidden')
      document.getElementById('home').classList.add('flex')

      // Clear name input field
      document.getElementById('name').value = ''
    },1000)
  }
}