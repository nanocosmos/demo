/*
nanoStream Player
(c) 2015-2020, nanocosmos gmbh
https://www.nanocosmos.de
sales@nanocosmos.de

LEGAL NOTICE:
This material is subject to the terms and conditions defined in
separate license conditions ('LICENSE.txt' or nanocosmos.de/terms)
All information contained herein is, and remains the property
of nanocosmos GmbH and its suppliers if any. The intellectual and technical concepts
contained herein are proprietary to nanocosmos GmbH, and are protected by trade secret
or copyright law. Dissemination of this information or reproduction of this material
is strictly forbidden unless prior written permission is obtained from nanocosmos.
All modifications will remain property of nanocosmos.
*/
var chartModule = (function () {
    var currentTime = 0;
    var statsChart;
    var delays = [], times = [], deviations = [], deviationsCustom = [], bitrates = [], annotations = [];
    var updateInterval = 10;
    var count = updateInterval - 1;
    var gradientFill;
    var gradientFill2;
    var options = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    data: [],
                    type: 'line',
                    yAxisID: 'B',
                    label: 'Bitrate (avg)',
                    lineTension: .1,
                    borderColor: "#608BFC",
                    fill: false,
                    barPercentage: 0,
                    backgroundColor: gradientFill2,
                    borderWidth: 4,
                    borderCapStyle: 'round'
                },
                {
                    data: [],
                    type: 'line',
                    yAxisID: 'A',
                    label: 'Bufferlevel (current)',
                    data: [],
                    lineTension: .1,
                    borderColor: "#ed7d0e",
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 3,
                    borderCapStyle: 'round',
                },
            ]
        },
        options: {
            tooltips: {
                enabled: true
            },
            legend: {
                display: true,
                position: 'top',
                padding: 0,
                labels: {
                    fontColor: '#7D7C93',
                    usePointStyle: true,
                    padding: 10
                }
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        id: 'A',
                        position: 'left',
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#7D7C93',
                            fontSize: 14,
                            stepSize: .3,
                            display: true,
                            padding: 20,
                            maxTicksLimit: 3
                        },
                        gridLines: {
                            drawBorder: false,
                            borderDash: [10, 10],
                            color: 'rgba(100,98,121, 0.3)',
                            display: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'seconds',
                            fontColor: '#ed7d0e',
                            fontSize: 14
                        }
                    },
                    {
                        id: 'B',
                        position: 'right',
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#7D7C93',
                            fontSize: 14,
                            stepSize: .3,
                            padding: 20,
                            display: true,
                            maxTicksLimit: 4
                        },
                        legend: {
                            display: true
                        },
                        gridLines: {
                            drawBorder: false,
                            borderDash: [10, 5],
                            color: 'rgba(100,98,121, 0.3)',
                            display: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'kbit/s',
                            fontColor: '#608BFC',
                            fontSize: 14
                        }

                    },

                ],
                xAxes: [{
                    id: "xAxis",
                    gridLines: {
                        drawBorder: false,
                        display: true,
                        fontColor: "rgba(100,98,121, 0.3)"
                    },
                    ticks: {
                        display: true,
                        fontColor: 'rgba(109, 116, 132, .8)',
                        fontSize: 16,
                        stepSize: 5,
                        padding: 15,
                        maxTicksLimit: 2,
                        beginAtZero: true
                    }
                }]
            },
            elements: {
                point: {
                    radius: 2
                }
            },
            tooltips: {
                enabled: true
            },
            annotation: {
                annotations: annotations
            }
        }
    };

    function init() {
        if (document.getElementById('statsChart')) {
            createStatsChart();
        } else {
            console.log("Chart not plotted because not wrapper element not created!")
        }
    }

    function setGradientFills(context) {
        gradientFill = context.createLinearGradient(0, 0, 0, 400);
        gradientFill.addColorStop(0, "rgba(237, 125, 14, .3)");
        gradientFill.addColorStop(1, "rgba(237, 125, 14, 0)");

        gradientFill2 = context.createLinearGradient(0, 0, 0, 400);
        gradientFill2.addColorStop(0, "rgba(96, 139, 252, .2)");
        gradientFill2.addColorStop(1, "rgba(96, 139, 252, 0)");
    }

    function createStatsChart() {
        var context = document.getElementById('statsChart').getContext("2d");
        setGradientFills(context);
        Chart.Legend.prototype.afterFit = function() {
            this.height = this.height + 20;
        };
        statsChart = new Chart($('#statsChart'), options);
    }

    function handleStats(e) {
        count++;

        if (count % updateInterval === 0) {
            count = 0;

            var stats = e.data.stats;
            var delay = stats.buffer.delay.current.toFixed(3);
            var deviation = stats.buffer.delay.deviation.toFixed(3);
            var bitrate = (stats.bitrate.avg / 1000).toFixed(3);
            var timeWindow = 30;

            fixArraySize(delays, timeWindow)
            fixArraySize(deviations, timeWindow);
            fixArraySize(bitrates, timeWindow);
            fixArraySize(times, timeWindow);

            currentTime++;

            delays.push(delay);
            deviations.push(deviation);
            bitrates.push(bitrate);
            times.push(currentTime);

            updateStatsChart(times, delays, bitrates);
        }
    }

    function handleUpdateSourceInit(e) {
        var color;
        var content;

        color = "#ed7d0e";
        content = "update";

        content += " init";

        setAnnotations(color, content, 'top');
    }

    function handleSwitchStreamInit(e) {
        var color;
        var content;

        if (e.data.type === 'up') {
            color = "#55B29A";
            content = "switch up";
        } else if (e.data.type === 'down') {
            color = "#DE282D";
            content = "switch down";
        } else if (e.data.type === 'direct') {
            color = "#FFFFFF";
            content = "switch direct";
        }

        content += " init";

        setAnnotations(color, content, 'top');
    }

    function handleUpdateSourceCompleted(e) {
        var color;
        var content;

        color = "#ed7d0e";
        content = "update";

        switch (e.name) {
            case 'UpdateSourceSuccess':
                content += " success";
                break;
            case 'UpdateSourceFail':
                content += " fail";
                break;
            case 'UpdateSourceAbort':
                content += " abort";
                break;
        }

        setAnnotations(color, content, 'bottom');
    }
    
    function handleSwitchStreamCompleted(e) {
        var color;
        var content;

        if (e.data.type === 'up') {
            color = "#55B29A";
            content = "switch up";
        } else if (e.data.type === 'down') {
            color = "#DE282D";
            content = "switch down";
        } else if (e.data.type === 'direct') {
            color = "#FFFFFF";
            content = "switch direct";
        }

        switch (e.name) {
            case 'SwitchStreamSuccess':
                content += " success";
                break;
            case 'SwitchStreamFail':
                content += " fail";
                break;
            case 'SwitchStreamAbort':
                content += " abort";
                break;
        }

        setAnnotations(color, content, 'bottom');
    }

    function setAnnotations(color, content, position) {
        annotations.push({
            type: "line",
            mode: "vertical",
            id: 'hline'+currentTime,
            scaleID: "xAxis",
            value: times[times.length-1] ,
            borderColor: color,
            borderWidth: 3,
            borderDash: [10, 10],
            label: {
                position: position,
                align: 'center',
                content: content,
                enabled: true,
                fontSize: 16,
                fontColor: color,
                padding: 15
            }
        });
    }

    function cleanAnnotations(min) {
        annotations.forEach((anno, i) => {
            if (anno.value <= min) annotations.splice(i,1);
        });
    }

    function updateStatsChart(times, delayValues, bitrates) {
        if (statsChart) {
            statsChart.data.datasets[1].data = delayValues;
            statsChart.data.datasets[0].data = bitrates;
            statsChart.data.labels = times;
            cleanAnnotations(times[0]);
            if (statsChart.options.annotation.annotations.length !== annotations.length) statsChart.options.annotation.annotations = annotations;
            statsChart.update(0);
        }
    }

    function fixArraySize(arr, limit) {
        while (arr.length > limit) {
            arr.shift();
        }
    }

    return {
        init: init,
        handleStats: handleStats,
        handleSwitchStreamInit: handleSwitchStreamInit,
        handleSwitchStreamCompleted: handleSwitchStreamCompleted,
        handleUpdateSourceInit: handleUpdateSourceInit,
        handleUpdateSourceCompleted: handleUpdateSourceCompleted
    }
}());