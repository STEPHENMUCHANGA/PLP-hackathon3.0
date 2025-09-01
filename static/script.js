async function getRecipe() {
  const ingredients = document.getElementById("ingredients").value;
  if (!ingredients) {
    alert("Please enter some ingredients!");
    return;
  }

  const response = await fetch("/get_recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });

  const data = await response.json();
  document.getElementById("output").textContent =
    data.recipe || data.error || "Something went wrong!";
}
