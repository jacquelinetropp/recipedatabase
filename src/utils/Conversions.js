export const convertToMetric = (amount, size) => {
  let newAmounts = [];
  let newSizes = [];
  for (let i = 0; i < size.length; i++) {
    if (size === "cups") {
      newAmounts.push(amount * 240);
      newSizes.push("ml");
    } else if (size === "lbs"){
        newAmounts.push(amount * 454);
        newSizes.push('g')
    }
  }
};

export function convertTemperatures(measurements, recipe) {
  let temperature;
  if (measurements === "us" && recipe.degrees === "c") {
    const newNumber = Math.round(recipe.temperature * 1.8 + 32);
    temperature = `${newNumber}° F`;
  } else if (measurements === "metric" && recipe.degrees === "f") {
    const newNumber = Math.round((recipe.temperature - 32) / 1.8);
    temperature = `${newNumber}° C`;
  } else {
    temperature = `${recipe.temperature}° ${recipe.degrees}`;
  }
  return temperature;
};