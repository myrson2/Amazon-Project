// --- MODEL LAYER (State & Persistent Storage Management) ---
const storageKey = 'AssetLedgerTransactions';

// Load existing array entries or initialize empty fallback structure safely
const ledgerTransactions = (() => {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [
      // Pre-populating historical seeds for visual validation testing at bootup
      { id: '1', desc: 'Initial Seed Investment', amountCents: 500000, timestamp: '2026-06-01' },
      { id: '2', desc: 'Cloud Server Rental Fee', amountCents: -12550, timestamp: '2026-06-01' },
      { id: '3', desc: 'SaaS Customer Subscription', amountCents: 8900, timestamp: '2026-05-18' }
    ];
  } catch (error) {
    console.error("Corrupted local cache partition matrix found. Resetting state arrays.");
    return [];
  }
})();

function saveToStorage() {
  localStorage.setItem(storageKey, JSON.stringify(ledgerTransactions));
}

// --- VIEW GENERATION ENGINE (The Dynamic DOM Transformer) ---
function renderLedgerTimeline() {
  const container = document.querySelector('.js-timeline-container');
  if (!container) return;

  if (ledgerTransactions.length === 0) {
    container.innerHTML = '<p style="color: #666; text-align: center;">No transaction entries posted to the timeline ledger yet.</p>';
    return;
  }

  // 1. ADVANCED CATEGORIZATION MECHANISM: Group entries by their timestamp signature
  // Object.groupBy returns a clean dictionary object bucket architecture partitioned by string keys
  const bucketedTransactions = Object.groupBy(ledgerTransactions, (entry) => {
    // Standardizing string structures into uniform 'YYYY-MM-DD' calendar tracks using dayjs
    return dayjs(entry.timestamp).format('YYYY-MM-DD');
  });

  // 2. Sort the group keys chronologically so the newest date buckets float to the top
  const sortedDateKeys = Object.keys(bucketedTransactions).sort((a, b) => dayjs(b).diff(dayjs(a)));

  let alternativeViewHTML = '';

  // 3. Accumulate HTML generation pipelines by iterating through active date keys
  sortedDateKeys.forEach(dateKey => {
    // Format the header nicely for the business view (e.g., "June 1, 2026")
    const humanReadableDate = dayjs(dateKey).format('MMMM D, YYYY');
    
    alternativeViewHTML += `
      <div class="time-bucket">
        <h3 class="time-bucket-title">${humanReadableDate}</h3>
    `;

    // Grab just the array items belonging strictly to this loop's date partition bucket
    const currentGroupItems = bucketedTransactions[dateKey];

    currentGroupItems.forEach(item => {
      const displayDollars = (item.amountCents / 100).toFixed(2);
      const isNegative = item.amountCents < 0;

      alternativeViewHTML += `
        <div class="transaction-card">
          <div>
            <div style="font-weight: bold;">${escapeHTML(item.desc)}</div>
            <div class="card-meta">Settlement Ref: #${item.id}</div>
          </div>
          <div class="amount" style="color: ${isNegative ? '#dc3545' : '#28a745'}">
            ${isNegative ? '' : '+'}$${displayDollars}
          </div>
        </div>
      `;
    });

    alternativeViewHTML += `</div>`; // Close time-bucket
  });

  // 4. Paint the combined compiled layout string into the DOM grid once
  container.innerHTML = alternativeViewHTML;
}

// Simple security helper engine configuration mapping to clean malicious script strings
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, match => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;'
  }[match]));
}

// --- CONTROLLER LAYER (Event Capturing & Process Orchestration) ---
function setupControllerListeners() {
  const submitButton = document.querySelector('.js-submit-btn');
  if (!submitButton) return;

  // Intercepting inputs natively using standard AddEventListener declarations
  submitButton.addEventListener('click', () => {
    const descInput = document.querySelector('.js-desc-input');
    const amountInput = document.querySelector('.js-amount-input');
    const dateInput = document.querySelector('.js-date-input');

    const description = descInput.value.trim();
    const rawAmount = parseFloat(amountInput.value);
    const dateSelected = dateInput.value;

    // Data Validation Constraints Check
    if (!description || soccerValidationFailed(rawAmount) || !dateSelected) {
      alert('Operational Fault: Please populate all fields with accurate valuation structures.');
      return;
    }

    // Convert standard dollar strings to safe mathematical integer cents pools
    const amountCents = Math.round(rawAmount * 100);

    // Push new data model element object onto state tracking layer array
    ledgerTransactions.push({
      id: crypto.randomUUID().substring(0, 8), // Clean pseudo-unique identifier string
      desc: description,
      amountCents: amountCents,
      timestamp: dateSelected
    });

    // Model mutation flush to persistence layers
    saveToStorage();

    // Reset view input fields cleanly back to defaults
    descInput.value = '';
    amountInput.value = '';
    dateInput.value = '';

    // MVC Loop execution call: trigger visual re-generation directly off state
    renderLedgerTimeline();
  });
}

function soccerValidationFailed(val) {
  return isNaN(val) || val === 0;
}

// --- APPLICATION INITIALIZATION ENGINE (Boot Up) ---
// Set the default calendar selection view to today's date dynamically at execution startup
document.querySelector('.js-date-input').value = dayjs().format('YYYY-MM-DD');

// Bootstrap application processing loops
setupControllerListeners();
renderLedgerTimeline();