import Icons from './Icons';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import { handleBlogInputOnChange } from 'Actions/Pages_actions/BlogAction';
import ShortUniqueId from 'short-unique-id';
import store from 'StoreIndex';
import {
    handleBuyAndSellInputOnChange, handleDriverInputOnChange, handleLoadInputOnChange,
    handleOnchangeBuyAndSellFilter, handleOnchangeDriverFilter, handleOnchangeLoadFilter,
    handleOnchangeVerifyMobileNumber, handleOnchangeTruckFilter, handlePostVerification,
    handleTruckInputOnChange
} from 'Actions/Pages_actions/ServicesActions';
import { handleFeedbackModalOnChange } from 'Actions/Pages_actions/FeedbackAction';
import { updateOverallChartFilter, updateSelectedLineChart } from 'Slices/Pages_slice/Analytice_slice';
import { handleOnchangeCrmBeforeSaleEntry, handleOnchangeCrmStatus } from 'Actions/Pages_actions/CrmActions';

function modelYears() {
    const getYear = new Date().getFullYear()
    var l = []
    for (var i = 1980; i <= getYear; i++) {
        l[l.length] = i
    }

    return l
}

function modelTenYears() {
    const getYear = new Date().getFullYear();
    let l = [];
    for (let i = 1980; i <= getYear; i += 10) {
        const incrementTenYear = i + 10
        if (incrementTenYear > getYear) {
            l.push(`${i} - ${getYear}`);
        } else {
            l.push(`${i} - ${i + 10}`);
        }
    }
    return l;
}

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            resolve({
                id: new ShortUniqueId({ length: 10 }),
                filename: file.name,
                filetype: file.type,
                fileimage: reader.result,
                datetime: file.lastModifiedDate.toLocaleString("en-IN"),
                filesize: filesizes(file.size),
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

function formatDateForInput(date) {
    if (!date) return ""; // Return empty if date is null
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

function react_dropdown_location_formatter(data, states) {
    if (data?.length) {
        if (!data[0]?.label) {
            let show_updated_location_data = data?.map((v) => {
                console.log(v)
                return states?.filter((state) => state?.label?.toLowerCase().includes(v.toLowerCase()))
            });

            return show_updated_location_data?.flat()
        }
        else {
            return data
        }
    } else {
        return data
    }
}


const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    const { dashboardState, servicesState, blogState, commonState, feedbackState, analyticsState, crmState } = useCommonState((state) => state);

    const jsonOnly = {
        sidebarMenusAdmin: [
            {
                icon: Icons.dashboardIcon,
                name: "Dashboard",
                route: "/dashboard/home",
                route_name: "home",
                type: "link",
                in: 0,
            },
            {
                icon: Icons.analyticsIcon,
                name: "Analytics",
                route: "/dashboard/analytics",
                route_name: "analytics",
                type: "link",
                in: 1
            },
            {
                icon: Icons.servicesIcon,
                name: "Services",
                route: "/dashboard/services",
                route_name: "services",
                type: "accordion",
                options: [
                    {
                        icon: Icons.subServivesIcon,
                        name: "Load Details",
                        route: "/dashboard/services/load_details",
                        route_name: "load_details",
                        in: 21
                    },
                    {
                        icon: Icons.subServivesIcon,
                        name: "Truck Details",
                        route: "/dashboard/services/truck_details",
                        route_name: "truck_details",
                        in: 22
                    },
                    {
                        icon: Icons.subServivesIcon,
                        name: "Driver Details",
                        route: "/dashboard/services/driver_details",
                        route_name: "driver_details",
                        in: 23
                    },
                    {
                        icon: Icons.subServivesIcon,
                        name: "Buy and Sell Details",
                        route: "/dashboard/services/buy_sell_details",
                        route_name: "buy_sell_details",
                        in: 23
                    },
                    {
                        icon: Icons.subServivesIcon,
                        name: "Insurance",
                        route: "/dashboard/services/insurance",
                        route_name: "insurance",
                        in: 24
                    },
                    {
                        icon: Icons.subServivesIcon,
                        name: "Fast Tag",
                        route: "/dashboard/services/fast_tag",
                        route_name: "fast_tag",
                        in: 24
                    },
                    {
                        icon: Icons.subServivesIcon,
                        name: "Petrol Bunks",
                        route: "/dashboard/services/petrol_bunks",
                        route_name: "petrol_bunks",
                        in: 24
                    },
                ],
                in: 2
            },
            {
                icon: Icons.blogIcon,
                name: "Blog",
                route: "/dashboard/blog",
                route_name: "blog",
                type: "link",
                in: 3
            },
            {
                icon: Icons.feedbackIcon,
                name: "Feedback & Complaints",
                route: "/dashboard/feedback_complaints",
                route_name: "feedback_complaints",
                type: "link",
                in: 4
            },
            {
                icon: Icons.crmIcon,
                name: "CRM",
                route: "/dashboard/crm",
                route_name: "crm",
                type: "link",
                in: 5
            }
        ],
        sidebarMenusSeoSpecialist: [
            {
                icon: Icons.blogIcon,
                name: "Blog",
                route: "/dashboard/blog",
                route_name: "blog",
                type: "link",
                in: 1
            }
        ],
        sidebarMenusEmployee: [
            {
                icon: Icons.subServivesIcon,
                name: "Insurance",
                route: "/dashboard/services/insurance",
                route_name: "insurance",
                type: "link",
                in: 24
            },
            {
                icon: Icons.subServivesIcon,
                name: "Fast Tag",
                route: "/dashboard/services/fast_tag",
                route_name: "fast_tag",
                type: "link",
                in: 24
            }
        ],

        services: [
            "All",
            "Lorry Owner",
            "Logistics",
            "Lorry Constructions",
            "Load Booking Agent",
            "Driver",
            "Lorry Buy & Sell Dealers/Owner",
            "Fastag",
            "Insurance"
        ],
        blogLanguages: [
            "Tamil",
            "English",
            "Hindi"
        ],
        truckBodyType: [
            "LCV",
            "Container",
            "Open body",
            "Tanker",
            "Trailer",
            "Tipper",
            "Bus "
        ],
        noOfTyres: [
            "4",
            "6",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22"
        ],
        tonnage: [
            '1 Ton - 2.5 Ton',
            '2.5 Ton - 5 Ton',
            '5 Ton - 10 Ton',
            '10 Ton - 20 Ton',
            '20 Ton - 40 Ton',
            'Above 40 Ton'
        ],
        truckBrand: [
            "Ashok Leyland",
            "Tata",
            "Mahindra",
            "Eicher",
            "Daimler India",
            "Bharat Benz",
            "Maruthi Suzuki",
            "SML Lsuzu",
            "Force",
            "AMW",
            "Man",
            "Scania",
            "Volvo",
            "Others",
        ],
        filterKilometers: [
            '(0 - 10,000)',
            '(10,001 - 30,000)',
            '(30,001 - 50,000)',
            '(50,001 - 70,000)',
            '(70,001 - 100,000)',
            '(100,001 - 150,000)',
            '(150,001 - 200,000)',
            '(200,001 - 300,000)',
            '(300,001 - 500,000)',
            '(500,001 - 700,000)',
            '(700,001 - 1,000,000)',
            '(1,000,001 - 1,500,000)',
            '(1,500,001 - 2,000,000)',
            '(2,000,001+ kms)'
        ],
        filterPrice: [
            '(0 - 5,00,000)',
            '(5,00,001 - 10,00,000)',
            '(10,00,001 - 20,00,000)',
            '(20,00,001 - 30,00,000)',
            '(30,00,001 - 40,00,000)',
            '(40,00,001 - 50,00,000)',
            '(50,00,001 - 60,00,000)',
            '(60,00,001 - 70,00,000)',
            '(70,00,001 - 80,00,000)',
            '(80,00,001 - 90,00,000)',
            '(90,00,001 and above)'
        ],
        states: [
            { value: 1, label: 'Andaman and Nicobar Islands' },
            { value: 2, label: 'Andhra Pradesh' },
            { value: 3, label: 'Arunachal Pradesh' },
            { value: 4, label: 'Assam' },
            { value: 5, label: 'Bihar' },
            { value: 6, label: 'Chandigarh' },
            { value: 7, label: 'Chhattisgarh' },
            { value: 8, label: 'Dadra and Nagar Haveli' },
            { value: 9, label: 'Delhi' },
            { value: 10, label: 'Goa' },
            { value: 11, label: 'Gujarat' },
            { value: 12, label: 'Haryana' },
            { value: 13, label: 'Himachal Pradesh' },
            { value: 14, label: 'Jammu and Kashmir' },
            { value: 15, label: 'Jharkhand' },
            { value: 16, label: 'Karnataka' },
            { value: 17, label: 'Kerala' },
            { value: 18, label: 'Madhya Pradesh' },
            { value: 19, label: 'Maharashtra' },
            { value: 20, label: 'Manipur' },
            { value: 21, label: 'Meghalaya' },
            { value: 22, label: 'Mizoram' },
            { value: 23, label: 'Nagaland' },
            { value: 24, label: 'Odisha' },
            { value: 25, label: 'Puducherry' },
            { value: 26, label: 'Punjab' },
            { value: 27, label: 'Rajasthan' },
            { value: 28, label: 'Tamil Nadu' },
            { value: 29, label: 'Telangana' },
            { value: 30, label: 'Tripura' },
            { value: 31, label: 'Uttar Pradesh' },
            { value: 32, label: 'Uttarakhand' },
            { value: 33, label: 'West Bengal' }
        ],
        overallAnalysis: [
            { value: 1, label: 'today' },
            { value: 2, label: 'last 7 days' },
            { value: 3, label: 'this month' }
        ],
        crm_status_options: [
            "HOT",
            "WARM",
            "COLD"
        ],
        analatics_load_table_head: [
            "Date",
            "Phone number",
            "Name",
            "Company name",
            "From",
            "To",
            "Material"
        ],
        analatics_truck_table_head: [
            "Date",
            "Phone number",
            "Name",
            "Company name",
            "From",
            "To",
            "Vehicle number"
        ],
        analatics_driver_table_head: [
            "Date",
            "Phone number",
            "Name",
            "Company name",
            "From",
            "To",
            "Vehicle number"
        ],
        analatics_buy_sell_table_head: [
            "Date",
            "Phone number",
            "Name",
            "Kms driven",
            "location",
            "Owner name",
            "Vehicle number",
            "Price"
        ]
    }

    const jsxJson = {
        buy_sell_carousel_settings: {
            // customPaging: function (i) {
            //     return (
            //         <a className='p-1 row justify-content-center align-items-center'>
            //             <img src={Images[i]} />
            //         </a>
            //     );
            // },
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ],
            swipeToSlide: true,
        },

        //                                                              Analytics                                                            //
        analyticsOverallLineChartFilter: [
            {
                name: "From Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: analyticsState?.overall_chart_filter?.from_date || '',
                change: (e) => dispatch(updateOverallChartFilter({ from_date: e.target.value })),
            },
            {
                name: "To Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: analyticsState?.overall_chart_filter?.to_date || '',
                change: (e) => dispatch(updateOverallChartFilter({ to_date: e.target.value })),
            },
        ],
        analyticsPieChart: [
            {
                type: "Load",
                value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[1]?.value : 0,
                color: "#0088FE"
            },
            {
                type: "Truck",
                value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[0]?.value : 0,
                color: "#00C49F"
            },
            {
                type: "Driver",
                value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[2]?.value : 0,
                color: "#FFBB28"
            },
            {
                type: "Buy and sell",
                value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[3]?.value : 0,
                color: "#FF8042"
            },
            {
                type: "Insurance",
                value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[4]?.value : 0,
                color: "red",
            },
            {
                type: "Fastag",
                value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[5]?.value : 0,
                color: "blue"
            }
        ],
        analyticsButtons: [
            {
                className: analyticsState?.selected_Line_chart === "Load" ? "selcted_analytics_button_active" : "",
                buttonName: "Load",
                click: () => dispatch(updateSelectedLineChart("Load"))
            },
            {
                className: analyticsState?.selected_Line_chart === "Truck" ? "selcted_analytics_button_active" : "",
                buttonName: "Truck",
                click: () => dispatch(updateSelectedLineChart("Truck"))
            },
            {
                className: analyticsState?.selected_Line_chart === "Driver" ? "selcted_analytics_button_active" : "",
                buttonName: "Driver",
                click: () => dispatch(updateSelectedLineChart("Driver"))
            },
            {
                className: analyticsState?.selected_Line_chart === "BuyAndSell" ? "selcted_analytics_button_active" : "",
                buttonName: "BuyAndSell",
                click: () => dispatch(updateSelectedLineChart("BuyAndSell"))
            },
            {
                className: analyticsState?.selected_Line_chart === "Insurance" ? "selcted_analytics_button_active" : "",
                buttonName: "Insurance",
                click: () => dispatch(updateSelectedLineChart("Insurance"))
            },
            {
                className: analyticsState?.selected_Line_chart === "Fastag" ? "selcted_analytics_button_active" : "",
                buttonName: "Fastag",
                click: () => dispatch(updateSelectedLineChart("Fastag"))
            }
        ],


        //                                                              Dashboard menu                                                        //
        dashboardMenus: [
            {
                icon: Icons.dashboardUserIcon,
                content: "Total Number Of Users",
                value: dashboardState?.dashboard_data?.tot_number_of_users
            },
            {
                icon: Icons.dashboardInsuranceIcon,
                content: "Total Number Of Insurance",
                value: dashboardState?.dashboard_data?.tot_number_of_insurance
            },
            {
                icon: Icons.dashboardFastagIcon,
                content: "Total Number Of Fastag",
                value: dashboardState?.dashboard_data?.tot_number_of_fastag
            },
            {
                icon: Icons.dashboardCustomerIcon,
                content: "New Customer",
                value: dashboardState?.dashboard_data?.new_customer
            }
        ],


        //                                                              blog                                                                  //
        blogInputs: [
            {
                name: "Language",
                type: "select",
                category: "select",
                placeholder: "",
                value: blogState?.blog_edit_data?.language,
                options: jsonOnly.blogLanguages,
                change: (e) => dispatch(handleBlogInputOnChange({ language: e.target.value })),
                isMandatory: true,
                error: commonState?.validated && !blogState?.blog_edit_data?.language ? "Language required" : null
            },
            {
                name: "Catergory",
                type: "select",
                category: "select",
                placeholder: "",
                value: blogState?.blog_edit_data?.category,
                options: jsonOnly.services,
                change: (e) => dispatch(handleBlogInputOnChange({ category: e.target.value })),
                error: commonState?.validated && !blogState?.blog_edit_data?.category ? "Category required" : null,
                isMandatory: true
            },
            {
                name: "Heading",
                type: "text",
                category: "input",
                placeholder: "",
                value: blogState?.blog_edit_data?.heading1,
                change: (e) => dispatch(handleBlogInputOnChange({ heading1: e.target.value })),
                error: commonState?.validated && !blogState?.blog_edit_data?.heading1 ? "Heading required" : null,
                isMandatory: true
            },
            {
                name: "Sub Heading",
                type: "text",
                category: "input",
                placeholder: "",
                value: blogState?.blog_edit_data?.heading2,
                change: (e) => dispatch(handleBlogInputOnChange({ heading2: e.target.value })),
                error: commonState?.validated && !blogState?.blog_edit_data?.heading2 ? "Sub-Heading required" : null,
                isMandatory: true
            },
            {
                name: "Description",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: blogState?.blog_edit_data?.blog_content,
                change: (value) => dispatch(handleBlogInputOnChange({ blog_content: value })),
                error: commonState?.validated && !blogState?.blog_edit_data?.blog_content ? "Blog content required" : null,
                isMandatory: true
            },
            {
                name: "Upload image",
                type: "file",
                category: "input",
                placeholder: "",
                value: blogState?.blog_edit_data?.blog_image_show_ui || [],
                change: (e) => {
                    // -- For Multiple File Input
                    let myImages = servicesState?.blog_edit_data?.blog_image_show_ui;
                    let makeImagesList = [];

                    // Use `Promise.all` to handle async file reading
                    Promise.all(
                        Array.from(e.target.files).map((file) => readFile(file))
                    )
                        .then((results) => {
                            makeImagesList = results;
                            if (myImages) {
                                makeImagesList = [...myImages, ...makeImagesList];
                            }

                            dispatch(handleBlogInputOnChange({ blog_image_show_ui: makeImagesList, blog_image_send_api: e.target.files }));
                        })
                        .catch((error) => console.error('Error reading files:', error));
                },
                error: commonState?.validated && !blogState?.blog_edit_data?.blog_image_show_ui ? "Blog Image required" : null,
                isMandatory: true
            }
        ],
        verifyMobileNumber: [
            {
                name: "Mobile number",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.phone_number || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleOnchangeVerifyMobileNumber(e.target.value))
                    }
                },
                keyDown: (e) => {
                    if (e.code === "Enter") {
                        dispatch(handlePostVerification(servicesState))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.phone_number ? "Mobile Number Required" : null
            }
        ],


        //                                                              load                                                                  //
        loadAddEditInputs: [
            {
                name: "Company Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.company_name || '',
                change: (e) => dispatch(handleLoadInputOnChange({ company_name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_load_card?.company_name ? "Company name required" : ''
            },
            {
                name: "Contact Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.contact_no || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleLoadInputOnChange({ contact_no: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_load_card?.contact_no ? "Contact number required" : ''
            },
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.from_location || '',
                change: (e) => dispatch(handleLoadInputOnChange({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleLoadInputOnChange({ from_location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_load_card?.from_location ? "From location required" : ''
            },
            {
                name: "To",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.to_location || '',
                change: (e) => dispatch(handleLoadInputOnChange({ to_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleLoadInputOnChange({ to_location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_load_card?.to_location ? "To location required" : ''
            },
            {
                name: "Material",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.material || '',
                change: (e) => dispatch(handleLoadInputOnChange({ material: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_load_card?.material ? "Material required" : ''
            },
            {
                name: "Ton",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.tone || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleLoadInputOnChange({ tone: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_load_card?.tone ? "Tone required" : ''
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleLoadInputOnChange({ truck_body_type: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_load_card?.truck_body_type ? "Truck body type required" : ''
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleLoadInputOnChange({ no_of_tyres: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_load_card?.no_of_tyres ? "No of tyres required" : ''
            },
            {
                name: "Truck size (ft)",
                type: "text",
                category: "input",
                placeholder: "Enter Truck size (ft)",
                divClassName: "mb-2 col-12 col-md-6",
                value: servicesState?.new_edit_load_card?.truck_size || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleLoadInputOnChange({ truck_size: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_load_card?.truck_size ? "Truck size required" : ''
            },
            {
                name: "Description",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.description || '',
                change: (e) => dispatch(handleLoadInputOnChange({ description: e.target.value })),
                isMandatory: false,
                // Err: commonState?.validated && !servicesState?.new_edit_load_card?.description ? "Description required" : ''
            }
        ],
        loadFilterInputs: [
            {
                name: "From Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: servicesState?.load_filter_card?.from_date || '',
                change: (e) => dispatch(handleOnchangeLoadFilter({ from_date: e.target.value })),
                isMandatory: true,
            },
            {
                name: "To Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: servicesState?.load_filter_card?.to_date || '',
                change: (e) => dispatch(handleOnchangeLoadFilter({ to_date: e.target.value })),
                isMandatory: true,
            },
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.load_filter_card?.from_location || '',
                change: (e) => dispatch(handleOnchangeLoadFilter({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeLoadFilter({ from_location: slectedLoc })),
                isMandatory: true
            },
            {
                name: "To",
                type: "select",
                category: "select",
                placeholder: "",
                options: servicesState?.load_filter_card?.to_location?.length ?
                    servicesState?.load_filter_card?.to_location?.some((v) => v?.label?.toLowerCase() === "select all")
                        ? [
                            { value: 0, label: 'Select all', disabled: false },
                            ...jsonOnly.states.map((state) => ({
                                ...state,
                                disabled: true,
                            })),
                        ]
                        : [
                            { value: 0, label: 'Select all', disabled: true },
                            ...jsonOnly.states,
                        ]
                    :
                    [
                        { value: 0, label: 'Select all', disabled: false },
                        ...jsonOnly.states,
                    ],
                value: servicesState?.load_filter_card?.to_location || [],
                change: (value) => dispatch(handleOnchangeLoadFilter({ to_location: value })),
                isMandatory: true
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.load_filter_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleOnchangeLoadFilter({ truck_body_type: e.target.value })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.load_filter_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleOnchangeLoadFilter({ no_of_tyres: e.target.value })),
                isMandatory: true
            },
            {
                name: "Truck size (ft)",
                type: "text",
                category: "input",
                placeholder: "Enter Truck size (ft)",
                divClassName: "mb-2 col-12 col-md-6",
                value: servicesState?.load_filter_card?.truck_size || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleOnchangeLoadFilter({ truck_size: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.load_filter_card?.truck_size ? "Truck size required" : ''
            },
            {
                name: "Material",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.load_filter_card?.material || '',
                change: (e) => dispatch(handleOnchangeLoadFilter({ material: e.target.value })),
                isMandatory: true
            },
            {
                name: "Ton",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.load_filter_card?.ton || '',
                options: jsonOnly.tonnage,
                change: (e) => dispatch(handleOnchangeLoadFilter({ ton: e.target.value })),
                isMandatory: true
            }
        ],


        //                                                              truck                                                                  //
        truckAddEditInputs: [
            {
                name: "Vehicle Number",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.vehicle_number || [],
                options: servicesState?.user_vehicle_list,
                change: (value) => dispatch(handleTruckInputOnChange({ vehicle_number: value, vehicle_number_selected: value[0]?.label })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.vehicle_number?.length ? "Vehicle number required" : ''
            },
            {
                name: "Company Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.company_name || '',
                change: (e) => dispatch(handleTruckInputOnChange({ company_name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.company_name ? "Company name required" : ''
            },
            {
                name: "Contact Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.contact_no || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleTruckInputOnChange({ contact_no: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.contact_no ? "Contact number required" : ''
            },
            {
                name: "Name of the transport",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.name_of_the_transport || '',
                change: (e) => dispatch(handleTruckInputOnChange({ name_of_the_transport: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.name_of_the_transport ? "Name of the transport required" : ''
            },
            {
                name: "Ton",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.tone || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleTruckInputOnChange({ tone: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.tone ? "Ton required" : ''
            },
            {
                name: "Brand Name",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.truck_brand_name || '',
                options: jsonOnly.truckBrand,
                change: (e) => dispatch(handleTruckInputOnChange({ truck_brand_name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.truck_brand_name ? "Truck brand name required" : ''
            },
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.from_location || '',
                change: (e) => dispatch(handleTruckInputOnChange({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleTruckInputOnChange({ from_location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.from_location ? "From location required" : ''
            },
            {
                name: "To",
                type: "select",
                category: "select",
                placeholder: "",
                options: servicesState?.new_edit_truck_card?.to_location?.length ?
                    servicesState?.new_edit_truck_card?.to_location?.some((v) => v?.label?.toLowerCase() === "select all")
                        ? [
                            { value: 0, label: 'Select all', disabled: false },
                            ...jsonOnly.states.map((state) => ({
                                ...state,
                                disabled: true,
                            })),
                        ]
                        : [
                            { value: 0, label: 'Select all', disabled: true },
                            ...jsonOnly.states,
                        ]
                    :
                    [
                        { value: 0, label: 'Select all', disabled: false },
                        ...jsonOnly.states,
                    ],
                value: react_dropdown_location_formatter(servicesState?.new_edit_truck_card?.to_location, jsonOnly?.states) || [],
                change: (value) => dispatch(handleTruckInputOnChange({ to_location: value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.to_location?.length ? "To location required" : ''
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleTruckInputOnChange({ truck_body_type: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.truck_body_type ? "Truck body type required" : ''
            },
            {
                name: "Truck Size",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.truck_size || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleTruckInputOnChange({ truck_size: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.truck_size ? "Truck size required" : ''
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleTruckInputOnChange({ no_of_tyres: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_truck_card?.no_of_tyres ? "No of tyres required" : ''
            },
            {
                name: "Description",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: servicesState?.new_edit_truck_card?.description || '',
                change: (e) => dispatch(handleTruckInputOnChange({ description: e.target.value })),
                isMandatory: false,
                // Err:commonState?.validated && !servicesState?.new_edit_truck_card?.description ? "Description required" : ''
            }
        ],
        truckFilterInputs: [
            {
                name: "From Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: servicesState?.truck_filter_card?.from_date || '',
                change: (e) => dispatch(handleOnchangeTruckFilter({ from_date: e.target.value })),
                isMandatory: true,
            },
            {
                name: "To Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: servicesState?.truck_filter_card?.to_date || '',
                change: (e) => dispatch(handleOnchangeTruckFilter({ to_date: e.target.value })),
                isMandatory: true,
            },
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.truck_filter_card?.from_location || '',
                change: (e) => dispatch(handleOnchangeTruckFilter({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeTruckFilter({ from_location: slectedLoc })),
                isMandatory: true
            },
            {
                name: "To",
                type: "select",
                category: "select",
                placeholder: "",
                options: servicesState?.truck_filter_card?.to_location?.length ?
                    servicesState?.truck_filter_card?.to_location?.some((v) => v?.label?.toLowerCase() === "select all")
                        ? [
                            { value: 0, label: 'Select all', disabled: false },
                            ...jsonOnly.states.map((state) => ({
                                ...state,
                                disabled: true,
                            })),
                        ]
                        : [
                            { value: 0, label: 'Select all', disabled: true },
                            ...jsonOnly.states,
                        ]
                    :
                    [
                        { value: 0, label: 'Select all', disabled: false },
                        ...jsonOnly.states,
                    ],
                value: servicesState?.truck_filter_card?.to_location || [],
                value: servicesState?.truck_filter_card?.to_location || [],
                change: (value) => dispatch(handleOnchangeTruckFilter({ to_location: value })),
                isMandatory: true
            },
            {
                name: "Brand Name",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.truck_filter_card?.truck_name || '',
                options: jsonOnly.truckBrand,
                change: (e) => dispatch(handleOnchangeTruckFilter({ truck_name: e.target.value })),
                isMandatory: true
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.truck_filter_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleOnchangeTruckFilter({ truck_body_type: e.target.value })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.truck_filter_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleOnchangeTruckFilter({ no_of_tyres: e.target.value })),
                isMandatory: true
            },
            {
                name: "Ton",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.truck_filter_card?.tone || '',
                options: jsonOnly.tonnage,
                change: (e) => dispatch(handleOnchangeTruckFilter({ tone: e.target.value })),
                isMandatory: true
            }
        ],


        //                                                               driver                                                                //
        driverAddEditInputs: [
            {
                name: "Vehicle Number",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_driver_card?.vehicle_number || [],
                options: servicesState?.user_vehicle_list,
                change: (value) => dispatch(handleDriverInputOnChange({ vehicle_number: value, vehicle_number_selected: value[0]?.label })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_driver_card?.vehicle_number?.length ? "Vehicle number required" : ''
            },
            {
                name: "Company Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_driver_card?.company_name || '',
                change: (e) => dispatch(handleDriverInputOnChange({ company_name: e.target.value })),
                isMandatory: true
            },
            {
                name: "Driver Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_driver_card?.driver_name || '',
                change: (e) => dispatch(handleDriverInputOnChange({ driver_name: e.target.value })),
                isMandatory: true
            },
            {
                name: "Contact Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_driver_card?.contact_no || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleDriverInputOnChange({ contact_no: e.target.value }))
                    }
                },
                isMandatory: true
            },
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.new_edit_driver_card?.from_location || '',
                change: (e) => dispatch(handleDriverInputOnChange({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleDriverInputOnChange({ from_location: slectedLoc })),
                isMandatory: true
            },
            {
                name: "To",
                type: "select",
                category: "select",
                placeholder: "",
                divClassName: "mb-2 col-12 col-md-6",
                multi: true,
                create: false,
                options: servicesState?.new_edit_driver_card?.to_location?.length ?
                    servicesState?.new_edit_driver_card?.to_location?.some((v) => v?.label?.toLowerCase() === "select all")
                        ? [
                            { value: 0, label: 'Select all', disabled: false },
                            ...jsonOnly.states.map((state) => ({
                                ...state,
                                disabled: true,
                            })),
                        ]
                        : [
                            { value: 0, label: 'Select all', disabled: true },
                            ...jsonOnly.states,
                        ]
                    :
                    [
                        { value: 0, label: 'Select all', disabled: false },
                        ...jsonOnly.states,
                    ],
                value: react_dropdown_location_formatter(servicesState?.new_edit_driver_card?.to_location, jsonOnly?.states) || [],
                change: (value) => dispatch(handleDriverInputOnChange({ to_location: value })),
                isMandatory: true
            },

            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_driver_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleDriverInputOnChange({ truck_body_type: e.target.value })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_driver_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleDriverInputOnChange({ no_of_tyres: e.target.value })),
                isMandatory: true
            },
            {
                name: "Description",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: servicesState?.new_edit_driver_card?.description || '',
                change: (e) => dispatch(handleDriverInputOnChange({ description: e.target.value })),
                isMandatory: false
            }
        ],
        driverFilterInputs: [
            {
                name: "From Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: servicesState?.driver_filter_card?.from_date || '',
                change: (e) => dispatch(handleOnchangeDriverFilter({ from_date: e.target.value })),
                isMandatory: true,
            },
            {
                name: "To Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: servicesState?.driver_filter_card?.to_date || '',
                change: (e) => dispatch(handleOnchangeDriverFilter({ to_date: e.target.value })),
                isMandatory: true,
            },
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.driver_filter_card?.from_location || '',
                change: (e) => dispatch(handleOnchangeDriverFilter({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeDriverFilter({ from_location: slectedLoc })),
                isMandatory: true
            },
            {
                name: "To",
                type: "select",
                category: "select",
                placeholder: "",
                options: servicesState?.driver_filter_card?.to_location?.length ?
                    servicesState?.driver_filter_card?.to_location?.some((v) => v?.label?.toLowerCase() === "select all")
                        ? [
                            { value: 0, label: 'Select all', disabled: false },
                            ...jsonOnly.states.map((state) => ({
                                ...state,
                                disabled: true,
                            })),
                        ]
                        : [
                            { value: 0, label: 'Select all', disabled: true },
                            ...jsonOnly.states,
                        ]
                    :
                    [
                        { value: 0, label: 'Select all', disabled: false },
                        ...jsonOnly.states,
                    ],
                value: servicesState?.driver_filter_card?.to_location || [],
                change: (value) => dispatch(handleOnchangeDriverFilter({ to_location: value })),
                isMandatory: true
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.driver_filter_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleOnchangeDriverFilter({ truck_body_type: e.target.value })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.driver_filter_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleOnchangeDriverFilter({ no_of_tyres: e.target.value })),
                isMandatory: true
            }
        ],


        //                                                             buy and sell                                                            //
        buyAndSellAddEdit: [
            {
                name: "Model Year",
                type: "select",
                category: "select",
                placeholder: "",
                options: modelYears(),
                value: servicesState?.new_edit_buyAndsell_card?.model || '',
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ model: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.model ? "Model required" : ''
            },
            {
                name: "Brand Name",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.brand || '',
                options: jsonOnly.truckBrand,
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ brand: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.brand ? "Brand required" : ''
            },
            {
                name: "Owner Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.owner_name || '',
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ owner_name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.owner_name ? "Owner name required" : ''
            },
            {
                name: "Vehicle Number",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.vehicle_number || [],
                options: servicesState?.user_vehicle_list,
                change: (value) => dispatch(handleBuyAndSellInputOnChange({ vehicle_number: value, vehicle_number_selected: value[0]?.label })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.vehicle_number?.length ? "Vehicle number required" : ''
            },
            {
                name: "Kilometers driven",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.kms_driven || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleBuyAndSellInputOnChange({ kms_driven: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.kms_driven ? "Kilometers required" : ''
            },
            {
                name: "Price",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.price || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleBuyAndSellInputOnChange({ price: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.price ? "Price required" : ''
            },
            {
                name: "Tonnage",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.tonnage || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleBuyAndSellInputOnChange({ tonnage: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.tonnage ? "Tonnage required" : ''
            },
            {
                name: "Location",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.location || '',
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleBuyAndSellInputOnChange({ location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.location ? "Location required" : ''
            },
            {
                name: "Contact Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.contact_no || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleBuyAndSellInputOnChange({ contact_no: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.contact_no ? "Contact Number required" : ''
            },

            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ truck_body_type: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.truck_body_type ? "Truck Body Type required" : ''
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ no_of_tyres: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.no_of_tyres ? "No Of Tyres required" : ''
            },
            {
                name: "Upload image",
                type: "file",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui || [],
                change: (e) => {
                    // -- For Multiple File Input
                    let myImages = servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui;
                    let makeImagesList = [];

                    // Use `Promise.all` to handle async file reading
                    Promise.all(
                        Array.from(e.target.files).map((file) => readFile(file))
                    )
                        .then((results) => {
                            makeImagesList = results;
                            if (myImages) {
                                makeImagesList = [...myImages, ...makeImagesList];
                            }

                            dispatch(handleBuyAndSellInputOnChange({ blog_image_show_ui: makeImagesList, blog_image_send_api: e.target.files }));
                        })
                        .catch((error) => console.error('Error reading files:', error));
                },
                isMandatory: true,
                Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui?.length ? "Image required" : ''
            },
            {
                name: "Description",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: servicesState?.new_edit_buyAndsell_card?.description || '',
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ description: e.target.value })),
                isMandatory: false
            }
        ],
        buyAndSellFilterInputs: [
            {
                name: "From Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: servicesState?.buyAndsell_filter_card?.from_date || '',
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ from_date: e.target.value })),
                isMandatory: true,
            },
            {
                name: "To Date",
                type: "date",
                category: "input",
                placeholder: "",
                value: servicesState?.buyAndsell_filter_card?.to_date || '',
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ to_date: e.target.value })),
                isMandatory: true,
            },
            {
                name: "Model Year",
                type: "select",
                category: "select",
                placeholder: "",
                options: modelTenYears(),
                value: servicesState?.buyAndsell_filter_card?.model,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ model: e.target.value })),
                isMandatory: true
            },
            {
                name: "Brand Name",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.buyAndsell_filter_card?.brand,
                options: jsonOnly.truckBrand,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ brand: e.target.value })),
                isMandatory: true
            },
            {
                name: "Location",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.buyAndsell_filter_card?.location,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeBuyAndSellFilter({ location: slectedLoc })),
                isMandatory: true
            },
            {
                name: "State list",
                type: "select",
                category: "select",
                placeholder: "",
                options: jsonOnly.states,
                value: servicesState?.buyAndsell_filter_card?.statelist || [],
                change: (value) => dispatch(handleOnchangeBuyAndSellFilter({ statelist: value })),
                isMandatory: true
            },
            {
                name: "Kilometers driven",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.buyAndsell_filter_card?.kmd_driven,
                options: jsonOnly.filterKilometers,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ kmd_driven: e.target.value })),
                isMandatory: true
            },
            {
                name: "Price",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.buyAndsell_filter_card?.price,
                options: jsonOnly.filterPrice,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ price: e.target.value })),
                isMandatory: true
            },
            {
                name: "Tonnage",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.buyAndsell_filter_card?.tonnage,
                options: jsonOnly.tonnage,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ tonnage: e.target.value })),
                isMandatory: true
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.buyAndsell_filter_card?.truck_body_type,
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ truck_body_type: e.target.value })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.buyAndsell_filter_card?.no_of_tyres,
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ no_of_tyres: e.target.value })),
                isMandatory: true
            }
        ],


        //                                                             feedback and complaint                                                  //
        feebbackUpdateOrWatchStatus: [
            {
                name: "Complaint ID",
                type: "text",
                category: "input",
                placeholder: "",
                value: feedbackState?.feedback_modal_data?.complaint_id || '',
                isMandatory: true,
                disabled: true
            },
            {
                name: "Customer Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: feedbackState?.feedback_modal_data?.customer_name || '',
                isMandatory: true,
                disabled: true
            },
            {
                name: "Category",
                type: "text",
                category: "input",
                placeholder: "",
                value: feedbackState?.feedback_modal_data?.category || '',
                isMandatory: true,
                disabled: true
            },
            {
                name: "Email ID",
                type: "email",
                category: "input",
                placeholder: "",
                value: feedbackState?.feedback_modal_data?.email_id || '',
                isMandatory: true,
                disabled: true
            },
            {
                name: "Phone Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: feedbackState?.feedback_modal_data?.phone_no || '',
                isMandatory: true,
                disabled: true
            },
            {
                name: "complaint_date",
                type: "date",
                category: "input",
                placeholder: "",
                value: feedbackState?.feedback_modal_data?.complaint_date ? formatDateForInput(feedbackState?.feedback_modal_data?.complaint_date) : '',
                isMandatory: true,
                disabled: true
            },
            {
                name: "solved_date",
                type: "date",
                category: "input",
                placeholder: "",
                value: feedbackState?.feedback_modal_data?.solved_date ? formatDateForInput(feedbackState?.feedback_modal_data?.solved_date) : '',
                isMandatory: true,
                disabled: true
            },
            {
                name: "content",
                type: "date",
                category: "textbox",
                placeholder: "",
                value: feedbackState?.feedback_modal_data?.content || '',
                isMandatory: true,
                disabled: true
            },
            {
                name: "Remarks",
                type: "date",
                category: "textbox",
                placeholder: "",
                value: feedbackState?.feedback_modal_data?.remarks || '',
                change: (e) => dispatch(handleFeedbackModalOnChange({ ...feedbackState?.feedback_modal_data, remarks: e.target.value })),
                isMandatory: true,
                disabled: servicesState?.modal_from === "Feedback" &&
                    (servicesState?.modal_type === "" || servicesState?.modal_type === "not solved") ? false : true,
                Err: commonState?.validated && !feedbackState?.remarks ? "Remarks required" : ''
            },
        ],


        //                                                             CRM Modal onchange                                                      //
        crmStatusModal: [
            {
                name: "CRM Status",
                type: "select",
                category: "select",
                placeholder: "",
                options: jsonOnly?.crm_status_options,
                value: crmState?.crm_status_entry?.crm_status || '',
                change: (e) => dispatch(handleOnchangeCrmStatus({ crm_status: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !crmState?.crm_status_entry?.crm_status ? "Crm status required" : ''
            },
            {
                name: "Next call date",
                type: "date",
                category: "input",
                placeholder: "",
                value: crmState?.crm_status_entry?.entry_date || '',
                change: (e) => dispatch(handleOnchangeCrmStatus({ entry_date: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !crmState?.crm_status_entry?.entry_date ? "Next call date required" : ''
            },
            {
                name: "Message",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: crmState?.crm_status_entry?.message || '',
                change: (e) => dispatch(handleOnchangeCrmStatus({ message: e.target.value })),
                isMandatory: false,
                Err: commonState?.validated && !crmState?.crm_status_entry?.message ? "Owner name required" : ''
            },
        ],
        crmStatusBeforeSaleEntryModal: [
            {
                name: "Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: crmState?.crm_before_sale_entry?.name || '',
                change: (e) => dispatch(handleOnchangeCrmBeforeSaleEntry({ name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !crmState?.crm_before_sale_entry?.name ? "Name required" : ''
            },
            {
                name: "Email id",
                type: "text",
                category: "input",
                placeholder: "",
                value: crmState?.crm_before_sale_entry?.email_id || '',
                change: (e) => dispatch(handleOnchangeCrmBeforeSaleEntry({ email_id: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !crmState?.crm_before_sale_entry?.email_id ? "Email id required" : ''
            },
            {
                name: "Phone number",
                type: "text",
                category: "input",
                placeholder: "",
                value: crmState?.crm_before_sale_entry?.phone_no || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleOnchangeCrmBeforeSaleEntry({ phone_no: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !crmState?.crm_before_sale_entry?.phone_no ? "Mobile Number Required" : null
            },
            {
                name: "Location",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: crmState?.crm_before_sale_entry?.location || '',
                change: (e) => dispatch(handleOnchangeCrmBeforeSaleEntry({ location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeCrmBeforeSaleEntry({ location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !crmState?.crm_before_sale_entry?.location ? "location required" : ''
            },
        ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData