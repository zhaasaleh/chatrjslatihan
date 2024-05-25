const ctx = document.getElementById('bubbleChart').getContext('2d');
const productCategoryColors = {};

fetch('datalatihan.json')
  .then(response => response.json())
  .then(data => {
    const processedData = processData(data);
    const chart = new Chart(ctx, {
      type: 'bubble',
      data: processedData,
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
        x: 0,
        y: 0,
        r: 0,
        count: 0
      };
    }
    productCategoryData[productCategory].x += item.unit_price;
    productCategoryData[productCategory].y += item.transaction_qty;
    productCategoryData[productCategory].count++;
  }

  const datasets = [];
  for (const category in productCategoryData) {
    const processedCategoryData = productCategoryData[category];
    processedCategoryData.x /= processedCategoryData.count; // calculate average unit price
    processedCategoryData.r = Math.sqrt(processedCategoryData.y); // set radius based on transaction quantity

    // Generate random colors for each category data
    if (!productCategoryColors.hasOwnProperty(category)) {
      productCategoryColors[category] = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    }

    datasets.push({
      label: category,
      backgroundColor: productCategoryColors[category],
      borderColor: productCategoryColors[category],
      data: [{
        x: processedCategoryData.x,
        y: processedCategoryData.y,
        r: processedCategoryData.r
      }]
    });
  }
  return {
    datasets: datasets
  };
}
