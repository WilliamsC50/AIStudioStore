// Pricing map for each item
const prices = {
  microphones: {
    "N/A": 0,
    "Shure SM7B": 399,
    "Rode NT1": 269,
    "Audio-Technica AT2020": 99,
    "Neumann TLM 103": 1099,
    "AKG C414": 1149,
    "Blue Yeti X": 139,
    "Slate ML-1": 799,
    "sE Electronics X1": 119,
    "Electro-Voice RE20": 449,
    "Aston Origin": 299,
    "Lewitt LCT 440 Pure": 289
  },
  interfaces: {
    "N/A": 0,
    "Focusrite Scarlett 2i2": 189,
    "PreSonus AudioBox USB 96": 99,
    "Universal Audio Volt 2": 189,
    "MOTU M2": 199,
    "SSL 2+": 299,
    "Audient iD14": 299,
    "Behringer UMC404HD": 179,
    "Apollo Twin X": 899,
    "Steinberg UR22C": 179,
    "Arturia MiniFuse 2": 149
  },
  headphones: {
    "N/A": 0,
    "Audio-Technica ATH-M50x": 169,
    "Sony MDR-7506": 99,
    "Beyerdynamic DT 770 PRO": 159,
    "Sennheiser HD 280 PRO": 99,
    "AKG K240": 69,
    "Shure SRH840": 149,
    "Focal Listen Professional": 299,
    "Status Audio CB-1": 79,
    "Neumann NDH 20": 499,
    "Austrian Audio Hi-X55": 329
  },
  monitors: {
    "N/A": 0,
    "Yamaha HS5": 199,
    "KRK Rokit 5": 179,
    "JBL 305P MkII": 149,
    "Adam Audio T5V": 249,
    "Focal Alpha 50 Evo": 299,
    "Genelec 8010A": 299,
    "PreSonus Eris E5": 149,
    "IK Multimedia iLoud": 349,
    "M-Audio BX5": 149,
    "Tannoy Reveal 502": 199
  },
  consoles: {
    "N/A": 0,
    "Behringer Xenyx Q802USB": 99,
    "Mackie ProFX12v3": 269,
    "Yamaha MG10XU": 229,
    "Allen & Heath ZEDi-10": 249,
    "Soundcraft Signature 12MTK": 479,
    "PreSonus StudioLive AR12c": 599,
    "Tascam Model 12": 599,
    "Behringer X32 Compact": 1999,
    "Allen & Heath SQ-5": 3499,
    "Midas M32R": 2699
  }
};

// Build kit output and calculate total
function buildKit() {
  const categories = ["microphones", "interfaces", "headphones", "monitors", "consoles"];
  let total = 0;
  let outputHTML = "<h3>Your Custom Studio Kit:</h3><ul>";

  categories.forEach(cat => {
    const selects = document.querySelectorAll(`select[name=${cat}]`);
    selects.forEach((select, i) => {
      const item = select.value;
      const qty = parseInt(document.getElementById(`${cat}-qty-${i}`).value) || 0;
      const price = prices[cat][item] || 0;
      total += price * qty;

      if (item !== "N/A" && qty > 0) {
        outputHTML += `<li><strong>${cat.slice(0, -1)}:</strong> ${item} x${qty} ($${(price * qty).toFixed(2)})</li>`;
      }
    });
  });

  outputHTML += `</ul><p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
  document.getElementById('kitOutput').innerHTML = outputHTML;
}

// Add new row (dropdown + quantity) for a category
function addItemRow(category) {
  const container = document.getElementById(`${category}-container`);
  const index = container.querySelectorAll('select').length;

  const select = document.createElement("select");
  select.name = category;
  Object.keys(prices[category]).forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.min = 1;
  qtyInput.max = 99;
  qtyInput.value = 1;
  qtyInput.id = `${category}-qty-${index}`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✖";
  removeBtn.className = "remove-button";
  removeBtn.onclick = () => container.removeChild(wrapper);

  const wrapper = document.createElement("div");
  wrapper.className = "form-group";
  wrapper.appendChild(select);
  wrapper.appendChild(qtyInput);
  wrapper.appendChild(removeBtn);

  container.appendChild(wrapper);
}
