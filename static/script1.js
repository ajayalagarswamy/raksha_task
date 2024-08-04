
            fetch('/kpi_data')
                .then(response => response.json())
                .then(data => {
                    const ctxRevenue = document.getElementById('revenue-chart').getContext('2d');
                    const ctxCustomers = document.getElementById('customers-chart').getContext('2d');
                    const ctxAvgRevenue = document.getElementById('avg-revenue-chart').getContext('2d');
                    const ctxCac = document.getElementById('cac-chart').getContext('2d');

                    const revenueData = data['Revenue'];
                    const customersData = data['New Customers'];
                    const avgRevenueData = data['Avg. Revenue per Customer'];
                    const cacData = data['Customer Acquisition Cost'];

                    // Revenue Chart
                    new Chart(ctxRevenue, {
                        type: 'bar',
                        data: {
                            labels: revenueData.map(item => item.month),
                            datasets: [
                                {
                                    label: 'Actual Revenue',
                                    data: revenueData.map(item => item.actual),
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Target Revenue',
                                    data: revenueData.map(item => item.target),
                                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                    borderColor: 'rgba(153, 102, 255, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });

                    // New Customers Chart
                    new Chart(ctxCustomers, {
                        type: 'bar',
                        data: {
                            labels: customersData.map(item => item.month),
                            datasets: [
                                {
                                    label: 'Actual New Customers',
                                    data: customersData.map(item => item.actual),
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Target New Customers',
                                    data: customersData.map(item => item.target),
                                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                    borderColor: 'rgba(255, 159, 64, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });

                    // Avg. Revenue per Customer Chart
                    new Chart(ctxAvgRevenue, {
                        type: 'bar',
                        data: {
                            labels: avgRevenueData.map(item => item.month),
                            datasets: [
                                {
                                    label: 'Actual Avg. Revenue per Customer',
                                    data: avgRevenueData.map(item => item.actual),
                                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                                    borderColor: 'rgba(255, 206, 86, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Target Avg. Revenue per Customer',
                                    data: avgRevenueData.map(item => item.target),
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });

                    // Customer Acquisition Cost Chart
                    new Chart(ctxCac, {
                        type: 'bar',
                        data: {
                            labels: cacData.map(item => item.month),
                            datasets: [
                                {
                                    label: 'Actual CAC',
                                    data: cacData.map(item => item.actual),
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Target CAC',
                                    data: cacData.map(item => item.target),
                                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                    borderColor: 'rgba(153, 102, 255, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });

                })
                    
                    // Updating KPI Values
                    document.getElementById('actual-revenue').innerText = `$${revenueData.reduce((sum, item) => sum + item.actual, 0).toLocaleString()}`;
                    document.getElementById('target-revenue').innerText = `$${revenueData.reduce((sum, item) => sum + item.target, 0).toLocaleString()}`;
                    document.getElement
     