let applied = false;

document.querySelectorAll(".plus").forEach(btn => {
  btn.addEventListener("click", function () {
    const input = this.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    updatePrice(this.closest(".product"));

    if (applied) {
      updateTotalSummary();
    }
  });
});

document.querySelectorAll(".minus").forEach(btn => {
  btn.addEventListener("click", function () {
    const input = this.nextElementSibling;
    input.value = Math.max(0, parseInt(input.value) - 1);
    updatePrice(this.closest(".product"));

    if (applied) {
      updateTotalSummary();
    }
  });
});

function updatePrice(product) {
  const basePrice = parseFloat(product.dataset.price);
  const qty = parseInt(product.querySelector("input[type='number']").value);
  product.querySelector(".total").textContent = basePrice * qty;
}

function updateTotalSummary() {
  const promo = document.getElementById("promo").value.trim();
  let total = 0;

  document.querySelectorAll(".product").forEach(product => {
    const qty = parseInt(product.querySelector("input[type='number']").value);
    const price = parseFloat(product.dataset.price);
    total += qty * price;
  });

  let discount = 0;
  if (promo === "DISKON50") {
    discount = total * 0.5;
  }

  const finalTotal = total - discount;

  document.getElementById("summary-result").innerHTML = `
    Total Harga: $${total.toFixed(2)}<br>
    Diskon: $${discount.toFixed(2)}<br>
    <strong>Total Akhir: $${finalTotal.toFixed(2)}</strong>
  `;
}

document.getElementById("apply").addEventListener("click", function () {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const promo = document.getElementById("promo");

  let valid = true;


  [name, email, promo].forEach(field => {
    if (!field.value) {
      field.style.border = "2px solid red";
      valid = false;
    } else {
      field.style.border = "1px solid #aaa";
    }
  });


  if (!email.value.includes("@")) {
    email.style.border = "2px solid red";
    alert("Anda harus mengisi email dengan benar. Sertakan '@'");
    return;
  }

  if (!valid) {
    alert("Semua field wajib diisi!");
    return;
  }

  applied = true; // Set flag true
  updateTotalSummary();
});
