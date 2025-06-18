import { handlendIndividualSelectedAnalysis, handlendOverallAnalysis } from 'Actions/Pages_actions/AnalyticsAction';
import { handleFilterModal } from 'Actions/Pages_actions/ServicesActions';
import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import Input from 'Components/Input/Input';
import ReactDropdownSelect from 'Components/Input/ReactDropdownSelect';
import SpinnerComponent from 'Components/Spinner/Spinner';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from "recharts";
import { updateOverallAnalysis, updateReportDate } from 'Slices/Pages_slice/Analytice_slice';
import Icons from 'Utils/Icons';
import JsonData from 'Utils/JsonData';
import { DownloadPDF } from 'ResuableFunctions/PdfConvertor';
import { updateToast } from 'Slices/Common_Slice/Common_slice';

export const Analytics = () => {
    const { commonState, servicesState, analyticsState } = useCommonState()
    const { analyticsPieChart, analyticsButtons } = JsonData()?.jsxJson
    const { overallAnalysis, analatics_load_table_head, analatics_truck_table_head, analatics_driver_table_head, analatics_buy_sell_table_head } = JsonData()?.jsonOnly
    const dispatch = useDispatch()

    const parentWidth = 400
    const parentHeight = 300

    //initial render data
    useEffect(() => {
        dispatch(handlendOverallAnalysis({ filter_category: analyticsState?.overall_chart }))
    }, [analyticsState?.overall_chart])

    //overall data
    useEffect(() => {
        if (analyticsState?.selected_Line_chart === "Overall" || analyticsState?.clear_filter) {
            dispatch(handlendOverallAnalysis({
                from_date: analyticsState?.overall_chart_filter?.from_date || new Date().toISOString().split('T')[0],
                to_date: analyticsState?.overall_chart_filter?.to_date || new Date().toISOString().split('T')[0]
            }))
        }
    }, [commonState?.apply_filter_clicked, commonState?.apply_filter, analyticsState?.clear_filter])

    //individual data
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
            newParams.from_date = servicesState?.load_filter_card?.from_date ?
                servicesState?.load_filter_card?.from_date
                :
                analyticsState?.report_getting_date

            newParams.to_date = servicesState?.load_filter_card?.to_date ?
                servicesState?.load_filter_card?.to_date
                :
                analyticsState?.report_getting_date


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
            newParams.from_date = servicesState?.truck_filter_card?.from_date ?
                servicesState?.truck_filter_card?.from_date
                :
                analyticsState?.report_getting_date

            newParams.to_date = servicesState?.truck_filter_card?.to_date ?
                servicesState?.truck_filter_card?.to_date
                :
                analyticsState?.report_getting_date

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
            newParams.from_date = servicesState?.driver_filter_card?.from_date ?
                servicesState?.driver_filter_card?.from_date
                :
                analyticsState?.report_getting_date

            newParams.to_date = servicesState?.driver_filter_card?.to_date ?
                servicesState?.driver_filter_card?.to_date
                :
                analyticsState?.report_getting_date

            newParams.from_location = servicesState?.driver_filter_card?.from_location || ''
            newParams.to_location = servicesState?.driver_filter_card?.to_location ? filteredToLoc : [] || []
            newParams.truck_body_type = servicesState?.driver_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.driver_filter_card?.no_of_tyres || ''
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
                statelist: []
            }
            const filteredStatelist = servicesState?.buyAndsell_filter_card?.statelist?.map((v) => v?.label)

            newParams.from_date = servicesState?.buyAndsell_filter_card?.from_date ?
                servicesState?.buyAndsell_filter_card?.from_date
                :
                analyticsState?.report_getting_date

            newParams.to_date = servicesState?.buyAndsell_filter_card?.to_date ?
                servicesState?.buyAndsell_filter_card?.to_date
                :
                analyticsState?.report_getting_date

            newParams.model = servicesState?.buyAndsell_filter_card?.model || ''
            newParams.brand = servicesState?.buyAndsell_filter_card?.brand || ''
            newParams.location = servicesState?.buyAndsell_filter_card?.location ? [servicesState?.buyAndsell_filter_card?.location] : [] || []
            newParams.kms_driven = servicesState?.buyAndsell_filter_card?.kms_driven || ''
            newParams.price = servicesState?.buyAndsell_filter_card?.price || ''
            newParams.tonnage = servicesState?.buyAndsell_filter_card?.tonnage || ''
            newParams.truck_body_type = servicesState?.buyAndsell_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.buyAndsell_filter_card?.no_of_tyres || ''
            newParams.statelist = filteredStatelist || []

            dispatch(handlendIndividualSelectedAnalysis({ endpoint: "get_buy_and_sell_analytics", params: newParams, from: "BuyAndSell" }))
        }
    }, [commonState?.apply_filter_clicked, commonState?.apply_filter, analyticsState?.selected_Line_chart, analyticsState?.report_getting_date])

    function dynamicLineCharts(chartType) {
        switch (chartType) {
            case "Load":
                return <LineChart data={analyticsState?.selected_analytics_data?.daily_requirements}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[5, 10, 15, 20, 25, 30]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />


                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="load"
                        stroke="#0088FE"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>

            case "Truck":
                return <LineChart data={analyticsState?.selected_analytics_data?.daily_requirements}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[5, 10, 15, 20, 25, 30]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />

                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="truck"
                        stroke="#00C49F"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>

            case "Driver":
                return <LineChart data={analyticsState?.selected_analytics_data?.daily_requirements}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[5, 10, 15, 20, 25, 30]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />

                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="driver"
                        stroke="#FFBB28"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>

            case "BuyAndSell":
                return <LineChart data={analyticsState?.selected_analytics_data?.daily_requirements}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[5, 10, 15, 20, 25, 30]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />

                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="buysell"
                        stroke="#FF8042"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>

            default:
                return <LineChart data={analyticsState?.overall_analytics_data?.daily_requirements}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) => tick}
                        type="category"
                    />

                    <YAxis ticks={[5, 10, 15, 20, 25, 30]} label={{ value: 'Post', angle: -90, position: 'insideLeft', offset: 5 }} />

                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="load"
                        stroke="#0088FE"
                        strokeWidth={2}
                        dot={true}
                    />

                    <Line
                        type="monotone"
                        dataKey="truck"
                        stroke="#00C49F"
                        strokeWidth={2}
                        dot={true}
                    />

                    <Line
                        type="monotone"
                        dataKey="driver"
                        stroke="#FFBB28"
                        strokeWidth={2}
                        dot={true}
                    />

                    <Line
                        type="monotone"
                        dataKey="buysell"
                        stroke="#FF8042"
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
            case "Overall":
                return () => dispatch(handleFilterModal("Overall", "Filter"))

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

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
                    <p className="label">{`${payload[0]?.payload?.type} : ${payload[0]?.payload?.value}`}</p>
                </div>
            );
        }
        return null;
    };

    function dynamicTableHeader(chartType) {
        switch (chartType) {
            case "Load":
                return <tr>
                    {analatics_load_table_head?.map((tableHeader, tableHeaderInd) => (
                        <th className="table-head" key={tableHeaderInd}>{tableHeader}</th>
                    ))}
                </tr>

            case "Truck":
                return <tr>
                    {analatics_truck_table_head?.map((tableHeader, tableHeaderInd) => (
                        <th className="table-head" key={tableHeaderInd}>{tableHeader}</th>
                    ))}
                </tr>

            case "Driver":
                return <tr>
                    {analatics_driver_table_head?.map((tableHeader, tableHeaderInd) => (
                        <th className="table-head" key={tableHeaderInd}>{tableHeader}</th>
                    ))}
                </tr>

            case "BuyAndSell":
                return <tr>
                    {analatics_buy_sell_table_head?.map((tableHeader, tableHeaderInd) => (
                        <th className="table-head" key={tableHeaderInd}>{tableHeader}</th>
                    ))}
                </tr>

            default:
                break;
        }
    }

    function dynamicTableBody(chartType) {
        switch (chartType) {
            case "Load":
                return analyticsState?.selected_analytics_data?.data?.map((v, i) => (
                    <tr className='table-body-tr'>
                        <td>{v?.updt?.slice(5, 16)}</td>
                        <td>{v?.contact_no}</td>
                        <td>{v?.profile_name}</td>
                        <td>{v?.company_name}</td>
                        <td>{v?.from_location}</td>
                        <td>{v?.to_location}</td>
                        <td>{v?.material}</td>
                    </tr>
                ))

            case "Truck":
                return analyticsState?.selected_analytics_data?.data?.map((v, i) => (
                    <tr className='table-body-tr'>
                        <td>{v?.updt?.slice(5, 16)}</td>
                        <td>{v?.contact_no}</td>
                        <td>{v?.profile_name}</td>
                        <td>{v?.company_name}</td>
                        <td>{v?.from_location}</td>
                        <td>{v?.to_location}</td>
                        <td>{v?.vehicle_number}</td>
                    </tr>
                ))

            case "Driver":
                return analyticsState?.selected_analytics_data?.data?.map((v, i) => (
                    <tr className='table-body-tr'>
                        <td>{v?.updt?.slice(5, 16)}</td>
                        <td>{v?.contact_no}</td>
                        <td>{v?.profile_name}</td>
                        <td>{v?.company_name}</td>
                        <td>{v?.from_location}</td>
                        <td>{v?.to_location}</td>
                        <td>{v?.vehicle_number}</td>
                    </tr>
                ))

            case "BuyAndSell":
                return analyticsState?.selected_analytics_data?.data?.map((v, i) => (
                    <tr className='table-body-tr'>
                        <td>{v?.updt?.slice(5, 16)}</td>
                        <td>{v?.contact_no}</td>
                        <td>{v?.profile_name}</td>
                        <td>{v?.kms_driven}</td>
                        <td>{v?.location}</td>
                        <td>{v?.owner_name}</td>
                        <td>{v?.vehicle_number}</td>
                        <td>{v?.price}</td>
                    </tr>
                ))

            default:
                break;
        }
    }

    function handleDownloadReport(chartType) {
        if (analyticsState?.selected_analytics_data?.data?.length) {
            switch (chartType) {
                case "Load":
                    DownloadPDF({ reportTitle: "Load Details", data: analyticsState?.selected_analytics_data?.data, pdfType: "landscape" })
                    break;

                case "Truck":
                    DownloadPDF({ reportTitle: "Truck Details", data: analyticsState?.selected_analytics_data?.data, pdfType: "landscape" })
                    break;

                case "Driver":
                    DownloadPDF({ reportTitle: "Driver Details", data: analyticsState?.selected_analytics_data?.data, pdfType: "landscape" })
                    break;

                case "BuyAndSell":
                    DownloadPDF({ reportTitle: "Buy and sell Details", data: analyticsState?.selected_analytics_data?.data, pdfType: "landscape" })
                    break;

                default:
                    break;
            }
        } else {
            dispatch(updateToast({ message: "No records found for download", type: "error" }))
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
                                        data={analyticsPieChart}
                                        cx={parentWidth / 2}
                                        cy={parentHeight / 2}
                                        innerRadius={parentWidth * 0.2}
                                        outerRadius={parentWidth * 0.28}
                                        paddingAngle={3}
                                        cornerRadius={8}
                                        dataKey="value"
                                        nameKey="name"
                                    >
                                        {analyticsPieChart?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>

                                    <Tooltip content={<CustomTooltip />} />
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
                            <Card.Header className='border-0 py-2 row align-items-center'>
                                <div className="col-7">
                                    <h6 className='fw-bold'>Daily Requirements and Tracking Details</h6>
                                </div>
                                <div className="col-5 d-flex flex-wrap align-items-center justify-content-end">
                                    <div className="col-4 p-2">
                                        <ButtonComponent
                                            className="bg-white border py-2 w-100"
                                            buttonName="Filter"
                                            clickFunction={dynamicFilter("Overall")}
                                        />
                                    </div>

                                    <div className="col-4">
                                        <ReactDropdownSelect
                                            multi={false}
                                            options={overallAnalysis}
                                            labelField="label"
                                            valueField="label"
                                            value={analyticsState?.overall_analytics_select_box_data}
                                            change={(value) => dispatch(updateOverallAnalysis(value))}
                                            className='rounded filter-select-dropdown'
                                        />
                                    </div>
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
                                            clickFunction={() => handleDownloadReport(analyticsState?.selected_Line_chart)}
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

                    {/* table */}
                    <div className="w-100 px-2">
                        <div className='card border-0 rounded-2'>
                            <div className="card-header rounded-top-2 bg-transparent border-0 d-flex flex-wrap mt-3 px-3">
                                <div className="col-6">
                                    <h5>{analyticsState?.selected_Line_chart} Data</h5>
                                </div>
                            </div>
                            <div className="feedback-table-height p-3 card-body">
                                <div className="table-responsive h-100 overflow-scroll">
                                    {
                                        analyticsState?.selected_analytics_data?.data?.length ?
                                            <table className="table ">
                                                <thead>
                                                    {dynamicTableHeader(analyticsState?.selected_Line_chart)}
                                                </thead>
                                                <tbody>
                                                    {dynamicTableBody(analyticsState?.selected_Line_chart)}
                                                </tbody>
                                            </table>
                                            :
                                            <div className="d-flex flex-wrap h-100 w-100 align-items-center justify-content-center">
                                                <div className="col-8 text-center">
                                                    <p>No Data Found</p>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 