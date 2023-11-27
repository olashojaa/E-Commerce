import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
// Dummy data
public linechart: any;
public piechart: any;
ngOnInit(): void {
  this.createLineChart();
  this.createPieChart();
}
createLineChart(){
  
  this.linechart = new Chart("LineChart", {
    type: 'line', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], 
       datasets: [
        {
          label: "Product A",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'blue'
        },
        {
          label: "Product B",
          data: [28, 48, 40, 19, 86, 27, 90],
          backgroundColor: 'limegreen'
        }  
      ]
    },
    options: {
      aspectRatio:2.5
    }
    
  });
}

createPieChart(){
  
  this.piechart = new Chart("PieChart", {
    type: 'pie', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: ['Category A', 'Category B','Category C','Category D' ],
       datasets: [{
  label: 'Order Dataset',
  data:[ { name: 'Category A', value: 300 },
  { name: 'Category B', value: 500 },
  { name: 'Category C', value: 200 },
  { name: 'Category D', value: 200 }],
  backgroundColor: [
    'red',
    'pink',
    'green',
    'yellow',
    	
  ],
  hoverOffset: 4
}],
    },
    options: {
      aspectRatio:2.5
    }

    
  });
}
}
