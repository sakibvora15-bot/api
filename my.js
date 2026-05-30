const populate = async (value, currency) => {
  const url =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_2LKda32YQHJd6fnraSxk9H6UEQEp0iPRvlqvhS5k&base_currency=" +
    currency;

  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center">Loading...</td></tr>`;

  try {
    const response = await fetch(url);
    const rjson = await response.json();

    const rate = rjson.data.INR?.value;

    if (!rate) {
      tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:red">Rate not available</td></tr>`;
      return;
    }

    const converted = (rate * value).toFixed(2);

    tableBody.innerHTML = `
      <tr>
        <td>${currency}</td>
        <td>${value}</td>
        <td>₹ ${Number(converted).toLocaleString("en-IN")}</td>
      </tr>
      <tr>
        <td colspan="3" style="font-size:13px; color:gray">
          1 ${currency} = ₹ ${rate.toFixed(4)} INR
        </td>
      </tr>
    `;
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:red">Error fetching data. Try again.</td></tr>`;
    console.error("Error fetching data:", error);
  }
};

const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const value = parseFloat(document.querySelector("#quantity").value);
  const currency = document.querySelector("#country").value;

  if (isNaN(value) || value <= 0) {
    alert("Please enter a valid amount greater than 0");
    return;
  }

  if (!currency) {
    alert("Please select a currency");
    return;
  }

  populate(value, currency);
});