const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const countryName = input.value.trim().toLowerCase();
    if(countryName) {
      return countryData(countryName)
    }
  }
})

// Btn click
searchBtn.addEventListener("click", () => {
  const countryName = input.value.trim().toLowerCase();
  if(countryName) {
    return countryData(countryName)
  }
})

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
      console.log("data:", data[0]);
      console.log("Flag:", data[0].flag);
      console.log("Country name: ", data[0].name.common);
      console.log("Official name: ", data[0].name.official);
      console.log("Capital: ", data[0].capital[0]);
      console.log("Population: ", data[0].population);
      console.log("Region:", data[0].region);
      console.log("Languages:", Object.values(data[0].languages || {}).join(", "));
      console.log("Currency:", Object.values(data[0].currencies || {}).map(c => `${c.name} (${c.symbol})`).join(", "));
      return data[0]
    })
    .catch((error) => console.error("Error fetching country data.", error))
}

// countryData("Italy")