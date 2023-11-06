import { DataType, IChartBase, SVGType, XAxisType, XValueType } from "../models/model";
import * as d3 from "d3";
import { isDate, isNumber } from "./type";

export class ChartBase implements IChartBase {
    width: number;
    height: number;
    marginTop: number;
    marginLeft: number;
    numberOfTicks: number;

    constructor(w?: number, h?: number, mt?: number, ml?: number, n?: number) {
        this.width = w ?? 500;
        this.height = h ?? 500;
        this.marginTop = mt ?? 10;
        this.marginLeft = ml ?? 50;
        this.numberOfTicks = n ?? 5;
    }

    public getSVG(element: HTMLElement): SVGType {
        return d3.select(element)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', `translate(${this.marginLeft}, ${this.marginTop})`);
    }

    public xAxis(svg: SVGType, data: DataType, xKey: any): {x: XAxisType, xAxis: d3.Axis<d3.NumberValue>} {
        if (!data?.[0]?.[xKey]) {
            throw new Error('xKey is not present in data');
        }

        const typeX = (): XValueType | null => (isDate(data[0][xKey]) ? 'time' : isNumber(data[0][xKey]) ? 'linear' : null);
        if (!typeX) {
            throw new Error('xKey is not a number or date');
        }

        const x = (typeX() === 'time' ?
            d3.scaleTime().domain(d3.extent(data, (d: any) => new Date(d[xKey])) as [Date, Date]).range([0, this.width - 100]) :
            d3.scaleLinear().domain(d3.extent(data, (d: any) => d[xKey]) as [number, number]).range([0, this.width - 100]));

        const xAxis = d3.axisBottom(x)
            .tickSize(0)
            .tickPadding(10)
            .ticks(this.numberOfTicks);

        svg
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${this.height - 100})`)
            .call(xAxis);

        return { x, xAxis }
    }

    public yAxis(svg: SVGType, data: DataType, yKey: any): {y: d3.ScaleLinear<number, number, never>, yAxis: d3.Axis<d3.NumberValue>} {
        if (!data?.[0]?.[yKey]) {
            throw new Error('yKey is not present in data');
        }

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, (d: any) => d[yKey]) as number])
            .range([this.height - 100, 0]);

        const yAxis = d3.axisLeft(y)
            .tickSize(0)
            .tickPadding(10)
            .ticks(this.numberOfTicks)
            .tickSizeInner(-this.width + 100);

        svg
            .append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        return { y, yAxis };
    }
}