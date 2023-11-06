import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from "d3";
import { DataType, IChart, SVGType } from '../models/model';
import { ChartBase } from '../utils/chart';

@Component({
  selector: 'lib-line',
  standalone: true,
  imports: [CommonModule],
  template: '<div #chart></div>',
  styleUrls: ['./line.scss']
})
export class LineComponent implements IChart, OnInit, OnChanges {
  @ViewChild('chart', { static: true }) element: any;
  @Input({ required: true }) data: DataType;
  @Input({ required: true }) groupKey: string = '';
  @Input({ required: true }) xKey: string = '';
  @Input({ required: true }) yKey: string = '';
  @Input() width: number;
  @Input() height: number;
  @Input() marginTop: number;
  @Input() marginLeft: number;
  @Input() numberOfTicks: number;

  #lineData: d3.InternMap<string, any[]>;
  chart: LineChart;
  color = d3.scaleOrdinal(d3.schemeCategory10);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].currentValue && changes['groupKey'] && changes['groupKey'].currentValue) {
      this.#lineData = d3.group(this.data, (d: any) => d?.[this.groupKey])
    }
  }

  ngOnInit() {
    this.chart = new LineChart(this.width, this.height, this.marginTop, this.marginLeft, this.numberOfTicks);
    const svg: SVGType = this.chart.getSVG(this.element.nativeElement);
    const {x, xAxis} = this.chart.xAxis(svg, this.data, this.xKey);
    const {y, yAxis} = this.chart.yAxis(svg, this.data, this.yKey);

    this.drawSeries(svg, x, y);
  }

  drawSeries(svg: SVGType, x: any, y: d3.ScaleLinear<number, number, never>) {
    const group = d3.group(this.data, (d: any) => d?.[this.groupKey]);

    svg
      .selectAll('.line')
      .append('g')
      .attr('class', 'line')
      .data(group)
      .enter()
      .append('path')
      .attr('d', (d: any) => {
        return d3.line()
          .x((d: any) => x(new Date(d[this.xKey])))
          .y((d: any) => y(d[this.yKey]))(d[1]);
      })
      .style('stroke', (d: any) => this.color(d[0]))
      .style('stroke-width', 2)
      .style('fill', 'none');
  }
}

class LineChart extends ChartBase {
  constructor(w: number, h: number, mt: number, ml: number, n: number) {
    super(w, h, mt, ml, n);
  }
}
