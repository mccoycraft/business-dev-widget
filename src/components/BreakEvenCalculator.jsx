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
import { FaInfoCircle } from "react-icons/fa";
import GuideModal from "./GuideModal";

export default function BreakEvenCalculator() {
    const [startupCost, setStartupCost] = useState(2500000);
    const [fixedCost, setFixedCost] = useState(650000);
    const [variableCost, setVariableCost] = useState(14500);
    const [sellingPrice, setSellingPrice] = useState(35000);
    const [showGuide, setShowGuide] = useState(false);

    const contribution = sellingPrice - variableCost;
    const breakEven = contribution > 0 ? fixedCost / contribution : 0;

    const data = useMemo(() => {
        return Array.from({ length: 101 }, (_, i) => ({
            quantity: i,
            revenue: i * sellingPrice,
            cost: fixedCost + i * variableCost,
        }));
    }, [fixedCost, variableCost, sellingPrice]);

    return (
        <div className="page">
            <div className="break-even-container">
                {/* HEADER - NEW BUSINESS DEVELOPMENT */}
                <section className="intro">
                    <div className="intro-row">
                        <h1>New Business Development</h1>
                        <FaInfoCircle
                            size={24}
                            style={{ color: "#94a3b8", cursor: "pointer" }}
                            title="Open Detailed Guide"
                            onClick={() => setShowGuide(true)}
                        />
                    </div>
                    <p>
                        Break-even analysis is a critical tool in New Business Development.
                        It helps entrepreneurs determine how many units must be sold before the business becomes profitable.
                    </p>
                </section>

                {/* INFO CARD */}
                <section className="info-card">
                    <h2>Key Concepts in New Business Development</h2>
                    <p><strong>Fixed Costs:</strong> Ongoing expenses like rent, salaries, utilities — independent of sales volume.</p>
                    <p><strong>Variable Costs:</strong> Costs that increase with each unit produced (raw materials, packaging, etc.).</p>
                    <p><strong>Selling Price:</strong> Price per unit charged to customers.</p>
                    <p><strong>Startup Capital:</strong> Initial investment required to launch the business.</p>
                </section>

                {/* SUMMARY CARDS */}
                <div className="summary-grid">
                    <div className="card">
                        <h3>Startup Investment</h3>
                        <strong>₦{startupCost.toLocaleString()}</strong>
                    </div>
                    <div className="card">
                        <h3>Contribution Margin</h3>
                        <strong>₦{contribution.toFixed(2)}</strong>
                        <small>Per unit sold</small>
                    </div>
                    <div className="card">
                        <h3>Break-even Point</h3>
                        <strong>{Math.ceil(breakEven)} units</strong>
                    </div>
                    <div className="card">
                        <h3>Projected ROI (at 100 units/month)</h3>
                        <strong>{(((100 * sellingPrice - fixedCost - 100 * variableCost) / startupCost) * 100).toFixed(1)}%</strong>
                    </div>
                </div>

                {/* CHART */}
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid stroke="#303234" strokeDasharray="3 3" />
                            <XAxis dataKey="quantity" stroke="#B8B8B8" />
                            <YAxis stroke="#B8B8B8" />
                            <Tooltip contentStyle={{ background: "#292B2A", border: "1px solid #60CDFF", borderRadius: "8px" }} />
                            <ReferenceLine x={breakEven} stroke="#60CDFF" strokeDasharray="5 5" />
                            <Line dataKey="revenue" stroke="#60CDFF" strokeWidth={4} dot={false} name="Revenue" />
                            <Line dataKey="cost" stroke="#F5F5F5" strokeWidth={4} dot={false} name="Total Cost" />
                            <ReferenceDot x={breakEven} y={breakEven * sellingPrice} fill="#60CDFF" r={8} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* FORMULA */}
                <section className="formula">
                    <h2>Break-even Formula (New Business Tool)</h2>
                    <p>Fixed Costs ÷ (Selling Price − Variable Cost per Unit)</p>
                    <h1>{Math.ceil(breakEven)} units</h1>
                </section>

                {/* SLIDERS */}
                <div className="controls">
                    <Slider label="Fixed Costs (₦)" description="Rent, salaries, utilities, etc." value={fixedCost} setValue={setFixedCost} min={100000} max={5000000} />
                    <Slider label="Variable Cost per Unit (₦)" description="Cost to produce one item" value={variableCost} setValue={setVariableCost} min={1000} max={50000} />
                    <Slider label="Selling Price per Unit (₦)" description="Price charged to customer" value={sellingPrice} setValue={setSellingPrice} min={5000} max={150000} />
                    <Slider label="Startup Investment (₦)" description="Initial capital required for new business" value={startupCost} setValue={setStartupCost} min={500000} max={20000000} />
                </div>

                {/* INTERPRETATION */}
                <section className="interpretation">
                    <h2>Business Development Insight</h2>
                    <p>Your new business needs to sell at least <b>{Math.ceil(breakEven)}</b> units per month to reach the break-even point.</p>
                    <p>Every additional unit sold after break-even contributes <b>₦{contribution.toFixed(2)}</b> directly to profit and business growth.</p>
                </section>
            </div>

            {/* GUIDE MODAL */}
            <GuideModal show={showGuide} onClose={() => setShowGuide(false)} />
        </div>
    );
}

function Slider({ label, description, value, setValue, min, max }) {
    return (
        <div className="slider-box">
            <div>
                <h3>{label}</h3>
                <p>{description}</p>
            </div>
            <strong>₦{value.toLocaleString()}</strong>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
        </div>
    );
}