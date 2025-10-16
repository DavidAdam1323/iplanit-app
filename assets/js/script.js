const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const countryName = input.value.trim().toLowerCase();
    if(isValidInput(countryName)) {
      return countryData(countryName)
    }
  }
})

// Btn click
searchBtn.addEventListener("click", () => {
  const countryName = input.value.trim().toLowerCase();
  if(isValidInput(countryName)) {
    return countryData(countryName)
  }
})

// Input validation
function isValidInput(countryName) {
  if (!countryName) {
    alert("Please enter a country name.")
    return false;
  }

  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(countryName)) {
    alert("Country names should only contain letters (A-Z).")
    return false;
  }

  if (countryName.length <= 2 || countryName.length > 56) {
    alert("Please enter a valid country name.")
    return false;
  }

  return true;
}

// Function to fetch country info
function countryData(countryName) {
  console.log(`Fetching country data for: ${countryName}...`);

  return fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Country not found.")
      } return response.json()
    })
    .then((data) => {
      const country = data[0];

      infoData(countryName).then((wikiData) => {
        displayResults(country, wikiData);
      });

      console.log("data:", data[0]);
      // console.log("Flag:", data[0].flag);
      // console.log("Country name: ", data[0].name.common);
      // console.log("Official name: ", data[0].name.official);
      // console.log("Capital: ", data[0].capital[0]);
      // console.log("Population: ", data[0].population);
      // console.log("Region:", data[0].region);
      // console.log("Languages:", Object.values(data[0].languages || {}).join(", "));
      // console.log("Currency:", Object.values(data[0].currencies || {}).map(c => `${c.name} (${c.symbol})`).join(", "));

      input.value = "";
      return country
    })
    .catch((error) => console.error("Error fetching country data.", error))
}

// Fetching Wikipedia info
function infoData(countryName) {
  return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`)
  .then((response) => {
    if(!response.ok) {
      throw new Error("Information not found.")
    } return response.json()
  })
  .then((data) => {
    const wikiData = data;
    // console.log(wikiData)
    // console.log(wikiData.title)
    // console.log(wikiData.extract_html)

    return wikiData
  })
  .catch((error) => console.error("Error fetching info data.", error))
}

// Display results
function displayResults(data, wikiData) {
  const resultsDiv = document.querySelector(".results-container");
  const countryInfo = data;

  let html = `
    <div class="card-results">
      <h2>${countryInfo.name.common}</h2>
      <img src="${countryInfo.flags.png}" alt="${countryInfo.name.common} flag" />
      <div class="card-info">
        <h3>Basic Information</h3>
        <p><strong>Official Name:</strong> ${countryInfo.name.official}</p>
        <p><strong>Capital:</strong> ${countryInfo.capital[0]}</p>
        <p><strong>Region:</strong> ${countryInfo.region}</p>
        <p><strong>Population:</strong> ${countryInfo.population}</p>
        <p><strong>Language:</strong> ${Object.values(countryInfo.languages || {}).join(", ")}</p>
        <p><strong>Currency:</strong> ${Object.values(countryInfo.currencies || {}).map((c) => { return `${c.name} (${c.symbol})`}).join(", ")}</p>
      </div>
      <div>
      <h3>Know Before You Go!</h3>
      <div>
        ${wikiData && wikiData.extract_html ? wikiData.extract_html : "<p>Description not available.</p>"}
      </div>
      </div>
    </div>
  `
  resultsDiv.innerHTML = html
}