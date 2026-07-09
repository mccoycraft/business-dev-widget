import { useMemo, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ReferenceDot,
} from "recharts";

import "../BreakEvenCalculator.css";


export default function BreakEvenCalculator() {

    // Financial Inputs
    const [startupCost, setStartupCost] = useState(1500);
    const [fixedCost, setFixedCost] = useState(400);
    const [variableCost, setVariableCost] = useState(12);
    const [sellingPrice, setSellingPrice] = useState(32);


    // Finance Calculations

    const contribution = sellingPrice - variableCost;

    const breakEven =
        contribution > 0
            ? fixedCost / contribution
            : 0;


    const monthlySales = 100;

    const revenue = monthlySales * sellingPrice;

    const totalCost =
        fixedCost + monthlySales * variableCost;


    const profit =
        revenue - totalCost;


    const roi =
        startupCost > 0
            ? ((profit / startupCost) * 100)
            : 0;



    // Chart Data

    const data = useMemo(() => {

        return Array.from({ length: 101 }, (_, i) => ({
            quantity: i,

            revenue:
                i * sellingPrice,

            cost:
                fixedCost + i * variableCost,
        }));

    }, [
        fixedCost,
        variableCost,
        sellingPrice
    ]);



    return (

        <div className="page">


            <div className="break-even-container">


                {/* TITLE */}

                <section className="intro">

                    <h1>
                        🚀 New Business Development
                    </h1>

                    <p>
                        Break-even analysis helps entrepreneurs
                        understand how many products they must sell
                        before the business starts making profit.
                    </p>

                </section>




                {/* BUSINESS EXPLANATION */}

                <section className="info-card">

                    <h2>
                        Example: Starting a Bakery
                    </h2>


                    <p>
                        🏢 Fixed Cost:
                        Rent, equipment, salaries and utilities.
                    </p>


                    <p>
                        📦 Variable Cost:
                        Cost of producing one product.
                    </p>


                    <p>
                        💰 Selling Price:
                        Amount customers pay.
                    </p>


                </section>





                {/* SUMMARY CARDS */}


                <div className="summary-grid">


                    <div className="card">
                        <h3>Startup Cost</h3>
                        <strong>
                            ${startupCost}
                        </strong>
                    </div>


                    <div className="card">
                        <h3>Contribution Margin</h3>

                        <strong>
                            ${contribution.toFixed(2)}
                        </strong>

                        <small>
                            Profit from each sale
                        </small>

                    </div>



                    <div className="card">

                        <h3>
                            Break-even
                        </h3>

                        <strong>
                            {Math.ceil(breakEven)}
                            units
                        </strong>

                    </div>



                    <div className="card">

                        <h3>
                            ROI
                        </h3>

                        <strong>
                            {roi.toFixed(1)}%
                        </strong>

                    </div>


                </div>





                {/* CHART */}


                <div className="chart-container">


                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart data={data}>


                            <CartesianGrid
                                stroke="#444"
                                strokeDasharray="3 3"
                            />


                            <XAxis
                                dataKey="quantity"
                                stroke="#aaa"
                                label={{
                                    // value:"Units Sold",
                                    value:"",
                                    position:"insideBottom",
                                    fill:"#fff"
                                }}
                            />



                            <YAxis
                                stroke="#aaa"
                                label={{
                                    // value:"Money ($)",
                                    value:"",
                                    angle:-90,
                                    fill:"#fff"
                                }}
                            />



                            <Tooltip
                                contentStyle={{
                                    background:"#111",
                                    borderRadius:"10px"
                                }}
                            />



                            <ReferenceLine
                                x={breakEven}
                                stroke="#fff"
                                strokeDasharray="5 5"
                            />



                            <Line
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={4}
                                dot={false}
                                name="Revenue"
                            />



                            <Line
                                dataKey="cost"
                                stroke="#4ade80"
                                strokeWidth={4}
                                dot={false}
                                name="Total Cost"
                            />



                            <ReferenceDot

                                x={breakEven}

                                y={
                                    breakEven *
                                    sellingPrice
                                }

                                fill="#60a5fa"

                                r={8}

                            />


                        </LineChart>

                    </ResponsiveContainer>


                </div>






                {/* FORMULA */}


                <section className="formula">


                    <h2>
                        Break-even Formula
                    </h2>


                    <p>
                        Fixed Cost ÷
                        (Selling Price − Variable Cost)
                    </p>


                    <h1>
                        {Math.ceil(breakEven)}
                        units
                    </h1>


                </section>







                {/* SLIDERS */}



                <div className="controls">


                    <Slider

                        label="🏢 Fixed Cost"

                        description="Rent, salaries, equipment"

                        value={fixedCost}

                        setValue={setFixedCost}

                        min={100}

                        max={2000}

                    />



                    <Slider

                        label="📦 Variable Cost"

                        description="Cost per product"

                        value={variableCost}

                        setValue={setVariableCost}

                        min={1}

                        max={50}

                    />



                    <Slider

                        label="💰 Selling Price"

                        description="Customer price"

                        value={sellingPrice}

                        setValue={setSellingPrice}

                        min={5}

                        max={100}

                    />



                    <Slider

                        label="🚀 Startup Investment"

                        description="Initial business capital"

                        value={startupCost}

                        setValue={setStartupCost}

                        min={500}

                        max={10000}

                    />


                </div>







                {/* INTERPRETATION */}



                <section className="interpretation">


                    <h2>
                        Business Interpretation
                    </h2>


                    <p>

                        Your business needs to sell

                        <b>
                            {" "}
                            {Math.ceil(breakEven)}
                            {" "}
                        </b>

                        units before recovering costs.

                    </p>



                    <p>

                        Every additional sale contributes

                        <b>
                            {" "}
                            ${contribution.toFixed(2)}
                        </b>

                        towards profit.

                    </p>



                </section>



            </div>


        </div>

    );
}






function Slider({
                    label,
                    description,
                    value,
                    setValue,
                    min,
                    max
                }) {


    return (

        <div className="slider-box">


            <div>

                <h3>
                    {label}
                </h3>


                <p>
                    {description}
                </p>


            </div>



            <strong>
                ${value}
            </strong>



            <input

                type="range"

                min={min}

                max={max}

                value={value}

                onChange={
                    e =>
                        setValue(
                            Number(e.target.value)
                        )
                }

            />


        </div>

    );

}