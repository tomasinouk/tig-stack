/* global _ */

/*
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (in the ARGS variable)
 *
 * Return a dashboard object, or a function
 *
 * For async scripts, return a function, this function must take a single callback function as argument,
 * call this callback function with the dashboard object (look at scripted_async.js for an example)
 */

'use strict';

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// Setup some variables
var dashboard;

// All url parameters are available via the ARGS object
var ARGS;

// Intialize a skeleton with nothing but a rows array and service object
dashboard = {
  rows : [],
};

// Set a title
dashboard.title = 'Scripted dash';

// Set default time
// time can be overriden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard.time = {
  from: "now-6h",
  to: "now"
};

var rows = 1;
var seriesName = 'argName';

if(!_.isUndefined(ARGS.rows)) {
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.name)) {
  seriesName = ARGS.name;
}

for (var i = 0; i < rows; i++) {

  dashboard.rows.push(GetDash());
}

function GetDash(){
return {
    title: 'Chart',
    height: '200px',
    panels: [
	GetPanel( "battle " + i + ":5894860495094509"),GetPanel( "battle " + i + ":589abcfef43595955")
    ]
  };
}

function GetPanel(name)
{
return  {
        title: name,
        type: 'graph',
        span: 6,
        fill: 1,
        linewidth: 2,
        targets: [
    {
      "refId": "A",
      "policy": "default",
      "dsType": "influxdb",
      "resultFormat": "time_series",
      "orderByTime": "ASC",
      "tags": [],
      "groupBy": [
        {
          "type": "time",
          "params": [
            "$__interval"
          ]
        },
        {
          "type": "fill",
          "params": [
            "linear"
          ]
        }
      ],
      "select": [
        [
          {
            "type": "field",
            "params": [
              "hp"
            ]
          },
          {
            "type": "mean",
            "params": []
          }
        ]
      ],
      "measurement": "clBattle",
      "alias": "hp"
    },
    {
      "refId": "B",
      "policy": "default",
      "dsType": "influxdb",
      "resultFormat": "time_series",
      "orderByTime": "ASC",
      "tags": [],
      "groupBy": [
        {
          "type": "time",
          "params": [
            "$__interval"
          ]
        },
        {
          "type": "fill",
          "params": [
            "linear"
          ]
        }
      ],
      "select": [
        [
          {
            "type": "field",
            "params": [
              "ping"
            ]
          },
          {
            "type": "mean",
            "params": []
          }
        ]
      ],
      "measurement": "clBattle",
      "alias": "ping"
    },
    {
      "refId": "C",
      "policy": "default",
      "dsType": "influxdb",
      "resultFormat": "time_series",
      "orderByTime": "ASC",
      "tags": [],
      "groupBy": [
        {
          "type": "time",
          "params": [
            "$__interval"
          ]
        },
        {
          "type": "fill",
          "params": [
            "linear"
          ]
        }
      ],
      "select": [
        [
          {
            "type": "field",
            "params": [
              "xpos"
            ]
          },
          {
            "type": "mean",
            "params": []
          }
        ]
      ],
      "measurement": "clBattle",
      "alias": "xpos"
    }
        ],
	description: "id:56865980494355",
        datasource: "Docker InfluxDB",
        seriesOverrides: [],
        tooltip: {
          shared: true
        },

  "legend": {
    "show": true,
    "values": true,
    "min": true,
    "max": true,
    "current": false,
    "total": false,
    "avg": true,
    "alignAsTable": true,
    "rightSide": true,
    "hideZero": false,
    "hideEmpty": false
  }

      };
}

return dashboard;
