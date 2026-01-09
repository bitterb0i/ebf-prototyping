const amountSlider = document.getElementById("amountSlider");
const tenorSlider = document.getElementById("tenorSlider");
const amountValue = document.getElementById("amountValue");
const tenorValue = document.getElementById("tenorValue");
const installmentValue = document.getElementById("installmentValue");
const ctaButton = document.getElementById("ctaButton");

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const MONTHLY_RATE = 0.042391;

const updateSliderBackground = (slider) => {
  const min = Number(slider.min);
  const max = Number(slider.max);
  const value = Number(slider.value);
  const percent = ((value - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(90deg, #40a814 0%, #40a814 ${percent}%, #d9d9d9 ${percent}%)`;
};

const calculateInstallment = (amountJuta, tenor) => {
  const principal = amountJuta * 1_000_000;
  const rate = MONTHLY_RATE;
  const payment = principal * (rate / (1 - Math.pow(1 + rate, -tenor)));
  return Math.round(payment);
};

const updateValues = () => {
  const amount = Number(amountSlider.value);
  const tenor = Number(tenorSlider.value);
  amountValue.textContent = `${amount} Juta`;
  tenorValue.textContent = `${tenor} Bulan`;
  updateSliderBackground(amountSlider);
  updateSliderBackground(tenorSlider);

  ctaButton.disabled = Number.isNaN(amount) || Number.isNaN(tenor);

  installmentValue.classList.add("loading");
  installmentValue.textContent = "Rp";
  setTimeout(() => {
    const payment = calculateInstallment(amount, tenor);
    installmentValue.textContent = formatRupiah(payment).replace("Rp", "Rp");
    installmentValue.classList.remove("loading");
  }, 250);
};

if (amountSlider && tenorSlider && amountValue && tenorValue && installmentValue) {
  amountSlider.addEventListener("input", updateValues);
  tenorSlider.addEventListener("input", updateValues);
  updateValues();
}

if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    window.location.href = "apply-ktpdata.html";
  });
}
