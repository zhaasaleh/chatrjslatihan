const ctx = document.getElementById('barChart').getContext('2d');

fetch('datalatihan.json')
  .then(response => response.json())
  .then(data => {
    const processedData = processData(data);
    const chart = new Chart(ctx, {
      type: 'bar',
      data: processedData,
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
  });

function processData(data) {
  const productCategoryData = {};
  for (const item of data) {
    const productCategory = item.product_category;
    if (!productCategoryData.hasOwnProperty(productCategory)) {
      productCategoryData[productCategory] = 0;
    }
    productCategoryData[productCategory] += item.transaction_qty;
  }

  const labels = Object.keys(productCategoryData);
  const datasets = [{
    label: 'Sum Transaction Quantity',
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1,
    data: Object.values(productCategoryData)
  }];

  return {
    labels,
    datasets
  };
}
