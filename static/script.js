// Handle Modals
const signinModal = document.getElementById("signinModal");
const signupModal = document.getElementById("signupModal");
const openSignin = document.getElementById("openSignin");
const openSignup = document.getElementById("openSignup");
const closeSignin = document.getElementById("closeSignin");
const closeSignup = document.getElementById("closeSignup");

openSignin.onclick = () => signinModal.style.display = "block";
openSignup.onclick = () => signupModal.style.display = "block";
closeSignin.onclick = () => signinModal.style.display = "none";
closeSignup.onclick = () => signupModal.style.display = "none";

// Recipe generator call
async function getRecipe() {
  const ingredients = document.getElementById("ingredients").value;
  const servings = document.getElementById("servings").value;
  const prepTime = document.getElementById("prepTime").value;
  const region = document.getElementById("region").value;

  const res = await fetch("/get_recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients, servings, prepTime, region })
  });
  const data = await res.json();
  document.getElementById("output").innerText = data.recipe || data.error;
}

// Payment call (test mode)
async function makePayment() {
  const res = await fetch("/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 5.0 })
  });
  const data = await res.json();
  alert(data.message + " | Txn ID: " + data.txn_id);
}
