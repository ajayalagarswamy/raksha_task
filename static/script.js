fetch('/kpi_data')
    .then(response => response.json())
    .then(data => {
        const ctxResponseTime = document.getElementById('response-time-chart').getContext('2d');
        const ctxCsat = document.getElementById('csat-chart').getContext('2d');
        const ctxCes = document.getElementById('ces-chart').getContext('2d');
        const ctxNps = document.getElementById('nps-chart').getContext('2d');

        const responseTimeData = data['Average Response Time'];
        const csatData = data['Customer Satisfaction Score'];
        const cesData = data['Customer Effort Score'];
        const npsData = data['Net Promoter Score'];

        // Average Response Time Chart
        new Chart(ctxResponseTime, {
            type: 'line',
            data: {
                labels: responseTimeData.map(item => item.month),
                datasets: [{
                    label: 'Average Response Time',
                    data: responseTimeData.map(item => item.value),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Customer Satisfaction Score Chart
        new Chart(ctxCsat, {
            type: 'doughnut',
            data: {
                labels: csatData.map(item => item.month),
                datasets: [{
                    label: 'CSAT',
                    data: csatData.map(item => item.value),
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // Customer Effort Score Chart
        new Chart(ctxCes, {
            type: 'doughnut',
            data: {
                labels: cesData.map(item => item.month),
                datasets: [{
                    label: 'CES',
                    data: cesData.map(item => item.value),
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // Net Promoter Score Chart
        new Chart(ctxNps, {
            type: 'doughnut',
            data: {
                labels: npsData.map(item => item.month),
                datasets: [{
                    label: 'NPS',
                    data: npsData.map(item => item.value),
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    });
