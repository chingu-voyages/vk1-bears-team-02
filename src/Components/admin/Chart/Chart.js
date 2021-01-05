import React, { useState, useEffect } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

import { Button, Badge, Container, Row, Col } from "react-bootstrap";
import "./chart.css";

import axios from "axios";

export default function Chart() {
	const [chartDataCount, setchartDataCount] = useState([]);
	// 617594, 181045
	const [fireCount, setFireCount] = useState(0);
	const [floodCount, setFloodCount] = useState(0);
	const [earthquakeCount, setEarthquakeCount] = useState(0);
	const [chartData, setChartData] = useState({
		labels: ["Fire", "Flood", "Earthquake"],
		datasets: [
			{
				label: "Distress Call",
				data: [fireCount, floodCount, earthquakeCount],
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(75, 192, 192, 0.6)",
					"rgba(153, 102, 255, 0.6)",
					"rgba(255, 159, 64, 0.6)",
					"rgba(255, 99, 132, 0.6)",
				],
			},
		],
	});

	useEffect(() => {
		setChartData({
			labels: ["Fire", "Flood", "Earthquake"],
			datasets: [
				{
					label: "Distress Call",
					data: [fireCount, floodCount, earthquakeCount],
					backgroundColor: [
						"rgba(255, 99, 132, 0.6)",
						"rgba(54, 162, 235, 0.6)",
						"rgba(255, 206, 86, 0.6)",
						"rgba(75, 192, 192, 0.6)",
						"rgba(153, 102, 255, 0.6)",
						"rgba(255, 159, 64, 0.6)",
						"rgba(255, 99, 132, 0.6)",
					],
				},
			],
		});
		// alert(chartDataCount.length);

		const countFire = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND}map-data-fire/`
				);
				console.log(response);
				// alert(response.data.count);
				setFireCount(response.data.count);
				// setchartDataCount([...chartDataCount, response.data.count]);
			} catch (error) {}
		};

		const countFlood = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND}map-data-flood/`
				);
				console.log(response);
				// alert(response.data.count);
				setFloodCount(response.data.count);
			} catch (error) {}
		};

		const countEarthquake = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND}map-data-earthquake/`
				);
				console.log(response);
				// alert(response.data.count);
				setEarthquakeCount(response.data.count);
			} catch (error) {}
		};

		countFire();
		countFlood();
		countEarthquake();
	}, [fireCount, floodCount, earthquakeCount]);

	return (
		<>
			<Container>
				<Row>
					<Col>
						{/* <Button
							variant="info"
							onClick={() => {
								setchartDataCount([...chartDataCount, 95072]);
							}}>
							Click
						</Button> */}
						<div style={{ marginBottom: "20px" }}></div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="chart-container">
							<Pie
								data={chartData}
								options={{
									maintainAspectRatio: true,
									title: {
										display: true,
										text: "Total number of distress call per case",
										fontSize: 25,
									},
								}}
								// width={100}
								//   options={{
								//     title:{
								//       display:this.props.displayTitle,
								//       text:'Largest Cities In '+this.props.location,
								//       fontSize:25
								//     },
								//     legend:{
								//       display:this.props.displayLegend,
								//       position:this.props.legendPosition
								//     }
								//   }}
							/>
						</div>
					</Col>
					<Col>
						<div className="chart-container">
							<Bar
								options={{
									maintainAspectRatio: true,
									title: {
										display: true,
										text: "Total number of distress call per month",
										fontSize: 25,
									},
								}}
								data={{
									labels: ["January", "February", "March", "April", "May"],
									datasets: [
										{
											label: "Fire",
											backgroundColor: "rgba(255, 99, 132, 0.6)",
											borderColor: "rgba(255, 99, 132, 0.6)",
											pointRadius: false,
											pointColor: "rgba(255, 99, 132, 0.6)",
											pointStrokeColor: "rgba(255, 99, 132, 0.6)",
											pointHighlightFill: "rgba(255, 99, 132, 0.6)",
											pointHighlightStroke: "rgba(255, 99, 132, 0.6)",
											data: [28, 48, 40, 19, 86, 27, 90],
										},
										{
											label: "Flood",
											backgroundColor: "rgba(54, 162, 235, 0.6)",
											borderColor: "rgba(54, 162, 235, 0.6)",
											pointRadius: false,
											pointColor: "rgba(54, 162, 235, 0.6)",
											pointStrokeColor: "rgba(54, 162, 235, 0.6)",
											pointHighlightFill: "rgba(54, 162, 235, 0.6)",
											pointHighlightStroke: "rgba(54, 162, 235, 0.6)",
											data: [65, 59, 80, 81, 56, 55, 40],
										},
										{
											label: "Earthquake",
											backgroundColor: "rgba(255, 206, 86, 0.6)",
											borderColor: "rgba(255, 206, 86, 0.6)",
											pointRadius: false,
											pointColor: "rgba(255, 206, 86, 0.6)",
											pointStrokeColor: "rgba(255, 206, 86, 0.6)",
											pointHighlightFill: "rgba(255, 206, 86, 0.6)",
											pointHighlightStroke: "rgba(255, 206, 86, 0.6)",
											data: [65, 59, 80, 81, 56, 55, 40],
										},
									],
								}}

								// width={100}
								//   options={{
								//     title:{
								//       display:this.props.displayTitle,
								//       text:'Largest Cities In '+this.props.location,
								//       fontSize:25
								//     },
								//     legend:{
								//       display:this.props.displayLegend,
								//       position:this.props.legendPosition
								//     }
								//   }}
							/>
						</div>
					</Col>
				</Row>

				<Row style={{ marginTop: "50px" }}>
					{/* <Col>
						<div className="chart-container">
							<Line
								data={chartData}
								options={{
									maintainAspectRatio: true,
									title: {
										display: true,
										text: "Number of distress call",
										fontSize: 25,
									},
								}}
								// width={100}
								//   options={{
								//     title:{
								//       display:this.props.displayTitle,
								//       text:'Largest Cities In '+this.props.location,
								//       fontSize:25
								//     },
								//     legend:{
								//       display:this.props.displayLegend,
								//       position:this.props.legendPosition
								//     }
								//   }}
							/>
						</div>
					</Col> */}
					{/* <Col>
						<div className="chart-container">
							<Bar
								data={chartData}
								options={{
									maintainAspectRatio: true,
								}}
								// width={100}
								//   options={{
								//     title:{
								//       display:this.props.displayTitle,
								//       text:'Largest Cities In '+this.props.location,
								//       fontSize:25
								//     },
								//     legend:{
								//       display:this.props.displayLegend,
								//       position:this.props.legendPosition
								//     }
								//   }}
							/>
						</div>
					</Col> */}
				</Row>
			</Container>
		</>
	);
}
