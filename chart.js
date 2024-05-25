// Load the data from datalatihan.json
fetch('datalatihan.json')
  .then(response => response.json())
  .then(data => {
    // Calculate the required metrics
    let categories = Array.from(new Set(data.map(item => item.product_category)));
    let avgUnitPrices = categories.map(category => {
      let itemsInCategory = data.filter(item => item.product_category === category);
      return itemsInCategory.reduce((sum, item) => sum + item.unit_price, 0) / itemsInCategory.length;
    });
    let sumTransactionQtys = categories.map(category => {
      let itemsInCategory = data.filter(item => item.product_category === category);
      return itemsInCategory.reduce((sum, item) => sum + item.transaction_qty, 0);
    });

    // Create the chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Bubble Chart',
          data: categories.map((category, index) => ({
            x: category,
            y: avgUnitPrices[index],
            r: sumTransactionQtys[index]
          })),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            position: 'bottom',
            title: {
              display: true,
              text: 'Product Category'
            }
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Unit Price'
            }
          }
        }
      }
    });
  });