import * as d3 from "d3";

export interface IChartBase {
    width?: number;
    height?: number;
    marginTop?: number;
    marginLeft?: number;
    numberOfTicks?: number;
}

export interface IChart extends IChartBase {
    data: any[];
    groupKey: string;
    xKey: string;
    yKey: string;
}

export type SVGType = d3.Selection<SVGGElement, unknown, null, undefined>;
export type XAxisType = d3.ScaleTime<number, number, never> | d3.ScaleLinear<number, number, never>;
export type XValueType = 'time' | 'linear';

export type DataType = any[];