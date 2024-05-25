const ctxBar = document.getElementById('barChart').getContext('2d');
const ctxBubble = document.getElementById('bubbleChart').getContext('2d');

fetch('datalatihan.json')
  .then(response => response.json())
  .then(data => {
    const processedData = processData(data);
    const barChart = new Chart(ctxBar, {
      type: 'bar',
      data: processedData.barData,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Product Category'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Sum Transaction Quantity'
            }
          }
        }
      }
    });

    const bubbleChart = new Chart(ctxBubble, {
      type: 'bubble',
      data: processedData.bubbleData,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Unit Price'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Sales Quantity'
            }
          }
        }
      }
    });
  });

function processData(data) {
  const productCategoryData = {};
  for (const item of data) {
    const productCategory = item.product_category;
    if (!productCategoryData.hasOwnProperty(productCategory)) {
      productCategoryData[productCategory] = {
        sumTransactionQty: 0,
        unitPriceSum: 0,
        transactionQtySum: 0,
        count: 0
      };
    }
    productCategoryData[productCategory].sumTransactionQty += item.transaction_qty;
    productCategoryData[productCategory].unitPriceSum += item.unit_price;
    productCategoryData[productCategory].transactionQtySum += item.transaction_qty;
    productCategoryData[productCategory].count++;
  }

  const barData = {
    labels: Object.keys(productCategoryData),
    datasets: [{
      label: 'Sum Transaction Quantity',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      data: Object.values(productCategoryData).map(category => category.sumTransactionQty)
    }]
  };

  const bubbleData = {
    datasets: []
  };
  for (const category in productCategoryData) {
    const processedCategoryData = productCategoryData[category];
    const averageUnitPrice = processedCategoryData.unitPriceSum / processedCategoryData.count;
    const radius = Math.sqrt(processedCategoryData.transactionQtySum);

    // Generate random colors for each category data
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;

    bubbleData.datasets.push({
      label: category,
      backgroundColor: color,
      borderColor: color,
      data: [{
        x: averageUnitPrice,
        y: processedCategoryData.transactionQtySum,
        r: radius
      }]
    });
  }

  return { barData, bubbleData };
}