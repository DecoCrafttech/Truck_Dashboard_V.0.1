import { handlendIndividualSelectedAnalysis } from 'Actions/Pages_actions/AnalyticsAction';
import { handleFilterModal } from 'Actions/Pages_actions/ServicesActions';
import ButtonComponent from 'Components/Button/Button';
import { useDispatch } from 'Components/CustomHooks';
import Input from 'Components/Input/Input';
import SpinnerComponent from 'Components/Spinner/Spinner';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from "recharts";
import { updateReportDate } from 'Slices/Pages_slice/Analytice_slice';
import Icons from 'Utils/Icons';
import JsonData from 'Utils/JsonData';

export const Analytics = () => {
    const { commonState, servicesState, analyticsState } = useSelector((state) => state)
    const { analyticsPieChart, analyticsButtons } = JsonData()?.jsxJson
    const dispatch = useDispatch()

    const parentWidth = 400
    const parentHeight = 300


    useEffect(() => {
        if (analyticsState?.selected_Line_chart === "Load") {
            const newParams = {
                company_name: "",
                from_location: "",
                to_location: [],
                material: "",
                tone: "",
                truck_body_type: "",
                no_of_tyres: "",
            }

            const filteredToLoc = servicesState?.load_filter_card?.to_location?.map((v) => v?.label)
            newParams.from_date = analyticsState?.report_getting_date ?
                analyticsState?.report_getting_date
                :
                servicesState?.load_filter_card?.from_date || new Date().toISOString().split('T')[0]

            newParams.to_date = analyticsState?.report_getting_date ?
                analyticsState?.report_getting_date
                :
                servicesState?.load_filter_card?.to_date || new Date().toISOString().split('T')[0]

            newParams.from_location = servicesState?.load_filter_card?.from_location || ''
            newParams.to_location = servicesState?.load_filter_card?.to_location ? filteredToLoc : [] || []
            newParams.truck_body_type = servicesState?.load_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.load_filter_card?.no_of_tyres || ''
            newParams.tone = servicesState?.load_filter_card?.tone || ''
            newParams.material = servicesState?.load_filter_card?.material || ''

            dispatch(handlendIndividualSelectedAnalysis({ endpoint: "get_load_analytics", params: newParams, from: "Load" }))
        }
        else if (analyticsState?.selected_Line_chart === "Truck") {
            const newParams = {
                vehicle_number: "",
                contact_no: "",
                truck_name: "",
                truck_brand_name: "",
                company_name: "",
                from_location: "",
                to_location: [],
                tone: "",
                truck_body_type: "",
                no_of_tyres: "",
            }

            const filteredToLoc = servicesState?.truck_filter_card?.to_location?.map((v) => v?.label)
            newParams.from_date = analyticsState?.report_getting_date ?
                analyticsState?.report_getting_date
                :
                servicesState?.truck_filter_card?.from_date || new Date().toISOString().split('T')[0]

            newParams.to_date = analyticsState?.report_getting_date ?
                analyticsState?.report_getting_date
                :
                servicesState?.truck_filter_card?.to_date || new Date().toISOString().split('T')[0]

            newParams.truck_name = servicesState?.truck_filter_card?.truck_name || ''
            newParams.from_location = servicesState?.truck_filter_card?.from_location || ''
            newParams.to_location = servicesState?.truck_filter_card?.to_location ? filteredToLoc : [] || []
            newParams.tone = servicesState?.truck_filter_card?.tone || ''
            newParams.truck_body_type = servicesState?.truck_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.truck_filter_card?.no_of_tyres || ''

            dispatch(handlendIndividualSelectedAnalysis({ endpoint: "get_truck_analytics", params: newParams, from: "Truck" }))
        }
        else if (analyticsState?.selected_Line_chart === "Driver") {
            const newParams = {
                driver_name: "",
                vehicle_number: "",
                contact_no: "",
                truck_name: "",
                company_name: "",
                from_location: "",
                to_location: [],
                truck_body_type: "",
                no_of_tyres: "",
            }

            const filteredToLoc = servicesState?.driver_filter_card?.to_location?.map((v) => v?.label)
            newParams.from_date = analyticsState?.report_getting_date ?
                analyticsState?.report_getting_date
                :
                servicesState?.driver_filter_card?.from_date || new Date().toISOString().split('T')[0]

            newParams.to_date = analyticsState?.report_getting_date ?
                analyticsState?.report_getting_date
                :
                servicesState?.driver_filter_card?.to_date || new Date().toISOString().split('T')[0]

            newParams.from_location = servicesState?.driver_filter_card?.from_location || ''
            newParams.to_location = servicesState?.driver_filter_card?.to_location ? filteredToLoc : [] || []
            newParams.truck_body_type = servicesState?.driver_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.driver_filter_card?.no_of_tyres || ''
            console.log(newParams)

            dispatch(handlendIndividualSelectedAnalysis({ endpoint: "get_driver_analytics", params: newParams, from: "Driver" }))
        }
        else if (analyticsState?.selected_Line_chart === "BuyAndSell") {
            const newParams = {
                owner_name: "",
                kms_driven: "",
                brand: "",
                model: "",
                vehicle_number: "",
                contact_no: "",
                truck_name: "",
                company_name: "",
                price: "",
                location: "",
                tonnage: "",
            }

            newParams.from_date = analyticsState?.report_getting_date ?
                analyticsState?.report_getting_date
                :
                servicesState?.buyAndsell_filter_card?.from_date || new Date().toISOString().split('T')[0]

            newParams.to_date = analyticsState?.report_getting_date ?
                analyticsState?.report_getting_date
                :
                servicesState?.buyAndsell_filter_card?.to_date || new Date().toISOString().split('T')[0]

            newParams.model = servicesState?.buyAndsell_filter_card?.model || ''
            newParams.brand = servicesState?.buyAndsell_filter_card?.brand || ''
            newParams.location = servicesState?.buyAndsell_filter_card?.location ? [servicesState?.buyAndsell_filter_card?.location] : [] || []
            newParams.kms_driven = servicesState?.buyAndsell_filter_card?.kms_driven || ''
            newParams.price = servicesState?.buyAndsell_filter_card?.price || ''
            newParams.tonnage = servicesState?.buyAndsell_filter_card?.tonnage || ''
            newParams.truck_body_type = servicesState?.buyAndsell_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.buyAndsell_filter_card?.no_of_tyres || ''

            dispatch(handlendIndividualSelectedAnalysis({ endpoint: "get_buy_and_sell_analytics", params: newParams, from: "BuyAndSell" }))
        } else {

        }
    }, [commonState?.apply_filter_clicked, commonState?.apply_filter, analyticsState?.selected_Line_chart, analyticsState?.report_getting_date])

    const data = [
        { time: '00', load: 10, truck: 12, driver: 18, buysell: 12 },
        { time: '01', load: 50, truck: 41, driver: 1, buysell: 12 },
        { time: '02', load: 20, truck: 15, driver: 5, buysell: 12 },
        { time: '03', load: 50, truck: 41, driver: 58, buysell: 12 },
        { time: '04', load: 20, truck: 15, driver: 2, buysell: 12 },
        { time: '05', load: 50, truck: 61, driver: 5, buysell: 12 },
        { time: '06', load: 20, truck: 15, driver: 15, buysell: 8 },
        { time: '07', load: 50, truck: 61, driver: 25, buysell: 8 },
        { time: '08', load: 20, truck: 15, driver: 15, buysell: 8 },
        { time: '09', load: 50, truck: 61, driver: 25, buysell: 8 },
        { time: '10', load: 20, truck: 15, driver: 30, buysell: 8 },
        { time: '11', load: 50, truck: 61, driver: 50, buysell: 8 },
        { time: '12', load: 10, truck: 8, driver: 18, buysell: 12 },
        { time: '13', load: 50, truck: 41, driver: 1, buysell: 12 },
        { time: '14', load: 20, truck: 15, driver: 5, buysell: 12 },
        { time: '15', load: 50, truck: 41, driver: 58, buysell: 12 },
        { time: '16', load: 20, truck: 15, driver: 2, buysell: 12 },
        { time: '17', load: 50, truck: 61, driver: 5, buysell: 12 },
        { time: '18', load: 20, truck: 15, driver: 15, buysell: 12 },
        { time: '19', load: 50, truck: 61, driver: 25, buysell: 12 },
        { time: '20', load: 20, truck: 15, driver: 15, buysell: 12 },
        { time: '21', load: 50, truck: 61, driver: 25, buysell: 12 },
        { time: '22', load: 20, truck: 15, driver: 30, buysell: 12 },
        { time: '23', load: 50, truck: 61, driver: 50, buysell: 12 },
        { time: '24', load: 50, truck: 61, driver: 50, buysell: 12 },
    ]

    const piedata = [
        {
            name: "Load",
            value: 10
        },
        {
            name: "Buy and sell",
            value: 20
        },
        {
            name: "Truck",
            value: 30
        },
        {
            name: "Insurance",
            value: 20
        },
        {
            name: "Driver",
            value: 30
        },
        {
            name: "Fast tag",
            value: 2
        }
    ]

    function dynamicLineCharts(chartType) {
        switch (chartType) {
            case "Load":
                return <LineChart data={analyticsState?.selected_analytics_data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />


                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="load"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>

            case "Truck":
                return <LineChart data={analyticsState?.selected_analytics_data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />

                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="truck"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>

            case "Driver":
                return <LineChart data={analyticsState?.selected_analytics_data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />

                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="driver"
                        stroke="red"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>

            case "BuyAndSell":
                return <LineChart data={analyticsState?.selected_analytics_data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />

                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="buysell"
                        stroke="yellow"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>

            default:
                return <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />

                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="load"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={true}
                    />

                    <Line
                        type="monotone"
                        dataKey="truck"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={true}
                    />

                    <Line
                        type="monotone"
                        dataKey="driver"
                        stroke="red"
                        strokeWidth={2}
                        dot={true}
                    />

                    <Line
                        type="monotone"
                        dataKey="buysell"
                        stroke="yellow"
                        strokeWidth={2}
                        dot={true}
                    // strokeDasharray="5 5" // Dashed line style
                    />
                </LineChart>
        }
    }

    function dynamicSelectButton(data) {
        return <ButtonComponent
            className={`${data?.className} btn btn-transparent w-100`}
            buttonName={data?.buttonName}
            title={data?.buttonName}
            clickFunction={data?.click}
        />
    }

    function dynamicFilter(filterType) {
        switch (filterType) {
            case "Load":
                return () => dispatch(handleFilterModal("Load", "Filter"))

            case "Truck":
                return () => dispatch(handleFilterModal("Truck", "Filter"))

            case "Driver":
                return () => dispatch(handleFilterModal("Driver", "Filter"))

            case "BuyAndSell":
                return () => dispatch(handleFilterModal("BuyAndSell", "Filter"))

            default:
                break;
        }
    }

    return (
        <div className='w-100 h-100'>
            <div className="container-fluid h-100 overflowY">
                <div className="d-flex flex-wrap">
                    {/* pie charts  */}
                    <div className="col-xxl-4 p-2">
                        <Card className="border-0 overflow-hidden">
                            <Card.Header className="border-0 py-4 row align-items-center">
                                <div className="col-8">
                                    <h6 className='fw-bold'>Analytics</h6>
                                </div>
                            </Card.Header>
                            <Card.Body className="py-5 d-inline-flex justify-content-center">
                                <PieChart width={parentWidth} height={parentHeight}>
                                    <Pie
                                        data={piedata}
                                        cx={parentWidth / 2}
                                        cy={parentHeight / 2}
                                        innerRadius={parentWidth * 0.2}
                                        outerRadius={parentWidth * 0.28}
                                        paddingAngle={3}
                                        cornerRadius={8}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={analyticsPieChart[index]?.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </Card.Body>
                            <div className="row col-12 py-3">
                                {
                                    analyticsPieChart?.map((value, index) => (
                                        <div className="col-6 ps-5" key={index}>
                                            <span style={{ background: value?.color, height: "1rem", width: "1rem", display: "inline-block" }}></span>
                                            <p className='d-inline-block ps-2 text-secondary fs-14'>{value?.type}</p>
                                            <p className='d-inline-block ps-2 text-secondary'>: {value?.value}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </Card>
                    </div>

                    {/* line charts  */}
                    <div className="col-xxl-8 p-2">
                        <Card className='border-0'>
                            <Card.Header className='border-0 py-4 row align-items-center'>
                                <div className="col-8">
                                    <h6 className='fw-bold'>Daily Requirements and Tracking Details</h6>
                                </div>
                            </Card.Header>
                            <Card.Body className='py-5 px-3'>
                                <ResponsiveContainer width="100%" height={450}>
                                    {dynamicLineCharts()}
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* button */}
                    <div className="row align-items-center border-bottom w-100 mt-5">
                        {
                            analyticsButtons?.map((buttonVal, buttonInd) => (
                                <div className='col' key={buttonInd}>
                                    {dynamicSelectButton(buttonVal)}
                                </div>
                            ))
                        }
                    </div>

                    {/* selected charts  */}
                    <div className="col-12 p-2">
                        <Card className='border-0'>
                            <Card.Header className='border-0 py-4 row align-items-center'>
                                <div className="col-6">
                                    <h6 className='fw-bold'>{analyticsState?.selected_Line_chart === "BuyAndSell" ? "Buy & Sell" : analyticsState?.selected_Line_chart} Details</h6>
                                </div>
                                <div className="col-6 d-flex flex-wrap align-items-center justify-content-end">
                                    <div className="col-3 p-2">
                                        <ButtonComponent
                                            className="bg-white border py-2 w-100"
                                            buttonName="Filter"
                                            clickFunction={dynamicFilter(analyticsState?.selected_Line_chart)}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <Input
                                            type="date"
                                            max={new Date().toISOString().split('T')[0]}
                                            value={analyticsState?.report_getting_date}
                                            change={(e) => dispatch(updateReportDate(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <ButtonComponent
                                            buttonName={Icons?.downloadIcon}
                                            title="Download report"
                                            className="btn btn-transparent"
                                        />
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className='py-5 px-3'>
                                {
                                    analyticsState?.selected_analytics_glow ?
                                        <div className="line_graph_glow_height row align-items-center justify-content-center">
                                            <div className="col text-center ">
                                                <SpinnerComponent variant="info" />
                                                <p className='fs-14 mt-2 text-info'>Getting details</p>
                                            </div>
                                        </div>
                                        :
                                        <ResponsiveContainer width="100%" height={450}>
                                            {dynamicLineCharts(analyticsState?.selected_Line_chart)}
                                        </ResponsiveContainer>
                                }

                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}; 