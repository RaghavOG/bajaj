// Generate fibonacci series up to n terms
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const series = [0, 1];
  for (let i = 2; i < n; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series;
}

// Check if a number is prime
function isPrime(x) {
  if (x < 2) return false;
  if (x === 2) return true;
  if (x % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(x); i += 2) {
    if (x % i === 0) return false;
  }
  return true;
}

// Calculate GCD of two numbers
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Calculate LCM of two numbers
function lcmOfTwo(a, b) {
  return (a * b) / gcd(a, b);
}

// Calculate LCM of array
function lcmOfArray(arr) {
  if (arr.length === 0) return 0;
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = lcmOfTwo(result, arr[i]);
  }
  return result;
}

// Calculate HCF/GCD of array
function hcfOfArray(arr) {
  if (arr.length === 0) return 0;
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = gcd(result, arr[i]);
  }
  return result;
}

export default {
  fibonacci,
  isPrime,
  gcd,
  lcmOfArray,
  hcfOfArray,
};
