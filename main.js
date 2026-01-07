const totalFee = 150000;
let payments = [];

function updateUI() {
  const amountPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const balance = totalFee - amountPaid;
  const progress = Math.min((amountPaid / totalFee) * 100, 100);

  document.getElementById(
    "amountPaid"
  ).textContent = `₦${amountPaid.toLocaleString()}`;
  document.getElementById(
    "balance"
  ).textContent = `₦${balance.toLocaleString()}`;
  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressText").textContent = `${progress.toFixed(
    0
  )}% Paid`;

  const status = document.getElementById("status");
  if (amountPaid === 0) {
    status.textContent = "Not Paid";
    status.className = "badge unpaid";
  } else if (amountPaid >= totalFee) {
    status.textContent = "Fully Paid";
    status.className = "badge paid";
  } else {
    status.textContent = "Partially Paid";
    status.className = "badge partial";
  }

  const history = document.getElementById("paymentHistory");
  history.innerHTML = "";
  payments.forEach((p) => {
    history.innerHTML += `
      <tr>
        <td>${p.date}</td>
        <td>₦${p.amount.toLocaleString()}</td>
        <td>${p.method}</td>
      </tr>`;
  });
}

function addPayment() {
  const amount = prompt("Enter payment amount:");
  if (!amount) return;

  payments.push({
    date: new Date().toLocaleDateString(),
    amount: Number(amount),
    method: "Cash",
  });

  updateUI();
}

function printReceipt() {
  window.print();
}

// Initial render
updateUI();
