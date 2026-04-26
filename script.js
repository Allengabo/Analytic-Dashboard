/* ============ DATA ============ */
const analytics = {
  descriptive: {
    revenueOverTime: [
      { month: "Jan", revenue: 150000 },
      { month: "Feb", revenue: 180000 },
      { month: "Mar", revenue: 160000 },
      { month: "Apr", revenue: 210000 },
      { month: "May", revenue: 250000 },
      { month: "Jun", revenue: 302400 }
    ],
    topSellingProducts: [
      { name: "Court King", sales: 450 },
      { name: "Urban Style", sales: 380 },
      { name: "Trail Blazer X", sales: 320 },
      { name: "Cloud Runner", sales: 290 },
      { name: "Retro Classic", sales: 210 }
    ]
  },
  diagnostic: {
    cartAbandonment: [
      { step: "Viewed Product", users: 10000 },
      { step: "Added to Cart", users: 3500 },
      { step: "Initiated Checkout", users: 1200 },
      { step: "Completed Purchase", users: 320 }
    ],
    returnReasons: [
      { reason: "Wrong Size", count: 120 },
      { reason: "Defective", count: 45 },
      { reason: "Changed Mind", count: 85 },
      { reason: "Not as Expected", count: 65 }
    ]
  },
  predictive: {
    revenueForecast: [
      { month: "Jul", expected: 320000, lower: 300000, upper: 340000 },
      { month: "Aug", expected: 340000, lower: 310000, upper: 370000 },
      { month: "Sep", expected: 370000, lower: 330000, upper: 410000 }
    ],
    expectedStockouts: [
      { product: "Court King (Size 10)", daysLeft: 4 },
      { product: "Urban Style (Size 9)", daysLeft: 7 },
      { product: "Trail Blazer X (Size 11)", daysLeft: 12 }
    ]
  },
  prescriptive: {
    recommendations: [
      { title: "Restock Trail Blazer X within 7 days", impact: "+\u20B145,000 est. revenue", priority: "High" },
      { title: "Launch promo for Urban Style", impact: "Predicted 23% lift", priority: "Medium" },
      { title: "Target lapsed customers with 15% discount", impact: "+\u20B125,000 est. revenue", priority: "Medium" },
      { title: "Increase ad spend on Basketball category", impact: "Highest ROAS", priority: "High" }
    ]
  }
};

/* ============ CHART DEFAULTS ============ */
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#6B7280';

const noLegend = { plugins: { legend: { display: false } } };
const gridStyle = { color: '#E5E7EB', drawBorder: false };
const pesoFmt = v => '\u20B1' + (v / 1000) + 'k';

/* ============ CHART 1: REVENUE OVER TIME ============ */
new Chart(document.getElementById('revenueChart'), {
  type: 'line',
  data: {
    labels: analytics.descriptive.revenueOverTime.map(d => d.month),
    datasets: [{
      data: analytics.descriptive.revenueOverTime.map(d => d.revenue),
      borderColor: '#000',
      borderWidth: 3,
      backgroundColor: ctx => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 250);
        g.addColorStop(0, 'rgba(0,0,0,0.3)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        return g;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 0
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    ...noLegend,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#6B7280' } },
      y: { grid: gridStyle, ticks: { color: '#6B7280', callback: pesoFmt } }
    }
  }
});

/* ============ CHART 2: TOP PRODUCTS ============ */
new Chart(document.getElementById('topProductsChart'), {
  type: 'bar',
  data: {
    labels: analytics.descriptive.topSellingProducts.map(d => d.name),
    datasets: [{
      data: analytics.descriptive.topSellingProducts.map(d => d.sales),
      backgroundColor: '#000',
      borderRadius: 4,
      barThickness: 24
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true, maintainAspectRatio: false,
    ...noLegend,
    scales: {
      x: { grid: gridStyle, ticks: { color: '#6B7280' } },
      y: { grid: { display: false }, ticks: { color: '#000', font: { weight: 600 } } }
    }
  }
});

/* ============ CHART 3: FUNNEL ============ */
new Chart(document.getElementById('funnelChart'), {
  type: 'bar',
  data: {
    labels: analytics.diagnostic.cartAbandonment.map(d => d.step),
    datasets: [{
      data: analytics.diagnostic.cartAbandonment.map(d => d.users),
      backgroundColor: ['#9CA3AF', '#9CA3AF', '#9CA3AF', '#000'],
      borderRadius: 4,
      barThickness: 40
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    ...noLegend,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#6B7280', font: { size: 11 } } },
      y: { grid: gridStyle, ticks: { color: '#6B7280' } }
    }
  }
});

/* ============ CHART 4: REFUND REASONS ============ */
new Chart(document.getElementById('refundChart'), {
  type: 'bar',
  data: {
    labels: analytics.diagnostic.returnReasons.map(d => d.reason),
    datasets: [{
      data: analytics.diagnostic.returnReasons.map(d => d.count),
      backgroundColor: '#4B4B4B',
      borderRadius: 4,
      barThickness: 24
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true, maintainAspectRatio: false,
    ...noLegend,
    scales: {
      x: { grid: gridStyle, ticks: { color: '#6B7280' } },
      y: { grid: { display: false }, ticks: { color: '#000', font: { weight: 600 } } }
    }
  }
});

/* ============ CHART 5: FORECAST ============ */
const fc = analytics.predictive.revenueForecast;
new Chart(document.getElementById('forecastChart'), {
  type: 'line',
  data: {
    labels: fc.map(d => d.month),
    datasets: [
      {
        label: 'Upper',
        data: fc.map(d => d.upper),
        borderColor: 'transparent',
        backgroundColor: '#F3F4F6',
        fill: '+1',
        pointRadius: 0
      },
      {
        label: 'Lower',
        data: fc.map(d => d.lower),
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        fill: false,
        pointRadius: 0
      },
      {
        label: 'Expected',
        data: fc.map(d => d.expected),
        borderColor: '#000',
        borderWidth: 3,
        borderDash: [5, 5],
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#000'
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    ...noLegend,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#6B7280' } },
      y: { grid: gridStyle, ticks: { color: '#6B7280', callback: pesoFmt } }
    }
  }
});

/* ============ STOCKOUT LIST ============ */
document.getElementById('stockoutList').innerHTML =
  analytics.predictive.expectedStockouts.map(item => `
    <div class="stockout-item">
      <span class="stockout-name">${item.product}</span>
      <span class="badge ${item.daysLeft <= 5 ? 'badge-red' : 'badge-amber'}">In ${item.daysLeft} days</span>
    </div>
  `).join('');

/* ============ RECOMMENDATIONS ============ */
document.getElementById('recsGrid').innerHTML =
  analytics.prescriptive.recommendations.map(rec => `
    <div class="rec-card">
      <span class="priority-badge ${rec.priority === 'High' ? 'priority-high' : 'priority-medium'}">${rec.priority} Priority</span>
      <h4 class="rec-title">${rec.title}</h4>
      <p class="rec-impact">${rec.impact}</p>
    </div>
  `).join('');