import Icons from './Icons';
import { useDispatch } from 'Components/CustomHooks';
import { handleBlogInputOnChange } from 'Actions/Pages_actions/BlogAction';
import ShortUniqueId from 'short-unique-id';
import store from 'StoreIndex';
import {
    handleBuyAndSellInputOnChange,
    handleDriverInputOnChange,
    handleLoadInputOnChange,
    handleOnchangeBuyAndSellFilter,
    handleOnchangeDriverFilter,
    handleOnchangeLoadFilter,
    handleOnchangeVerifyMobileNumber,
    handleOnchangeTruckFilter,
    handlePostVerification,
    handleTruckInputOnChange
} from 'Actions/Pages_actions/ServicesActions';
import { useSelector } from 'react-redux';




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

const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    const state = store.getState();
    const { dashboardState, servicesState, blogState, commonState } = useSelector((state) => state);

    const jsonOnly = {
        sidebarMenus: [
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
        ]
    }

    const jsxJson = {
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
                change: (e) => dispatch(handleBlogInputOnChange({ blog_content: e.target.value })),
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
                    let myImages = state?.blogState?.blog_edit_data?.blog_image_show_ui;
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
                            dispatch(handleBlogInputOnChange({ blog_image_show_ui: makeImagesList, blog_image_send_api: e.target.files }))
                            // dispatch(handleBuyAndSellInputOnChange({ blog_image_show_ui: makeImagesList, blog_image_send_api: e.target.files }));
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
                value: state?.servicesState?.phone_number || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleOnchangeVerifyMobileNumber(e.target.value))
                    }
                },
                keyDown: (e) => {
                    if (e.code === "Enter") {
                        dispatch(handlePostVerification(state?.servicesState))
                    }
                },
                isMandatory: true,
                Err: state?.commonState?.validated && !state?.servicesState?.phone_number ? "Mobile Number Required" : null
            } || []
        ],


        //                                                              load                                                                  //
        loadAddEditInputs: [
            {
                name: "Company Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_load_card?.company_name || '',
                change: (e) => dispatch(handleLoadInputOnChange({ company_name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_load_card?.company_name ? "Company name required" : ''
            },
            {
                name: "Contact Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_load_card?.contact_no || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleLoadInputOnChange({ contact_no: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_load_card?.contact_no ? "Contact number required" : ''
            },
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: state?.servicesState?.new_edit_load_card?.from_location || '',
                change: (e) => dispatch(handleLoadInputOnChange({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleLoadInputOnChange({ from_location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_load_card?.from_location ? "From location required" : ''
            },
            {
                name: "To",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: state?.servicesState?.new_edit_load_card?.to_location || '',
                change: (e) => dispatch(handleLoadInputOnChange({ to_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleLoadInputOnChange({ to_location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_load_card?.to_location ? "To location required" : ''
            },
            {
                name: "Material",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_load_card?.material || '',
                change: (e) => dispatch(handleLoadInputOnChange({ material: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_load_card?.material ? "Material required" : ''
            },
            {
                name: "Ton",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_load_card?.tone || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleLoadInputOnChange({ tone: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_load_card?.tone ? "Tone required" : ''
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_load_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleLoadInputOnChange({ truck_body_type: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_load_card?.truck_body_type ? "Truck body type required" : ''
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_load_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleLoadInputOnChange({ no_of_tyres: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_load_card?.no_of_tyres ? "No of tyres required" : ''
            },
            {
                name: "Description",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: state?.servicesState?.new_edit_load_card?.description || '',
                change: (e) => dispatch(handleLoadInputOnChange({ description: e.target.value })),
                isMandatory: true,
                // Err: commonState?.validated && !state?.servicesState?.new_edit_load_card?.description ? "Description required" : ''
            }
        ],
        loadFilterInputs: [
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: state?.servicesState?.load_filter_card?.from_location || '',
                change: (e) => dispatch(handleOnchangeLoadFilter({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeLoadFilter({ from_location: slectedLoc })),
                isMandatory: true
            },
            {
                name: "To",
                type: "select",
                category: "select",
                placeholder: "",
                options: jsonOnly.states,
                value: state?.servicesState?.load_filter_card?.to_location || [],
                change: (value) => dispatch(handleOnchangeLoadFilter({ to_location: value })),
                isMandatory: true
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.load_filter_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleOnchangeLoadFilter({ truck_body_type: e.target.value })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.load_filter_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleOnchangeLoadFilter({ no_of_tyres: e.target.value })),
                isMandatory: true
            },
            {
                name: "Material",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.load_filter_card?.material || '',
                change: (e) => dispatch(handleOnchangeLoadFilter({ material: e.target.value })),
                isMandatory: true
            },
            {
                name: "Ton",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.load_filter_card?.ton || '',
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
                value: state?.servicesState?.new_edit_truck_card?.vehicle_number_selected || [],
                options: state?.servicesState?.user_vehicle_list,
                change: (value) => dispatch(handleTruckInputOnChange({ vehicle_number: value, vehicle_number_selected: value[0]?.label })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.vehicle_number?.length ? "Vehicle number required" : ''
            },
            {
                name: "Company Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.company_name || '',
                change: (e) => dispatch(handleTruckInputOnChange({ company_name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.company_name ? "Company name required" : ''
            },
            {
                name: "Contact Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.contact_no || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleTruckInputOnChange({ contact_no: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.contact_no ? "Contact number required" : ''
            },
            {
                name: "Name of the transport",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.name_of_the_transport || '',
                change: (e) => dispatch(handleTruckInputOnChange({ name_of_the_transport: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.name_of_the_transport ? "Name of the transport required" : ''
            },
            {
                name: "Ton",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.tone || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleTruckInputOnChange({ tone: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.tone ? "Ton required" : ''
            },
            {
                name: "Brand Name",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.truck_brand_name || '',
                options: jsonOnly.truckBrand,
                change: (e) => dispatch(handleTruckInputOnChange({ truck_brand_name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.truck_brand_name ? "Truck brand name required" : ''
            },
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.from_location || '',
                change: (e) => dispatch(handleTruckInputOnChange({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleTruckInputOnChange({ from_location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.from_location ? "From location required" : ''
            },
            {
                name: "To",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.to_location || [],
                change: (e) => dispatch(handleTruckInputOnChange({ to_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleTruckInputOnChange({ to_location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.to_location ? "To location required" : ''
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleTruckInputOnChange({ truck_body_type: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.truck_body_type ? "Truck body type required" : ''
            },
            {
                name: "Truck Size",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.truck_size || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleTruckInputOnChange({ truck_size: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.truck_size ? "Truck size required" : ''
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleTruckInputOnChange({ no_of_tyres: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_truck_card?.no_of_tyres ? "No of tyres required" : ''
            },
            {
                name: "Description",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: state?.servicesState?.new_edit_truck_card?.description || '',
                change: (e) => dispatch(handleTruckInputOnChange({ description: e.target.value })),
                isMandatory: true,
                // Err:commonState?.validated && !state?.servicesState?.new_edit_truck_card?.description ? "Description required" : ''
            }
        ],
        truckFilterInputs: [
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
                options: jsonOnly.states,
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


        //                                                                             truck                                                                  //
        driverAddEditInputs: [
            {
                name: "Vehicle Number",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_driver_card?.vehicle_number_selected || [],
                options: state?.servicesState?.user_vehicle_list,
                change: (value) => dispatch(handleDriverInputOnChange({ vehicle_number: value, vehicle_number_selected: value[0]?.label })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_driver_card?.vehicle_number?.length ? "Vehicle number required" : ''
            },
            {
                name: "Company Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_driver_card?.company_name || '',
                change: (e) => dispatch(handleDriverInputOnChange({ company_name: e.target.value })),
                isMandatory: true
            },
            {
                name: "Driver Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_driver_card?.driver_name || '',
                change: (e) => dispatch(handleDriverInputOnChange({ driver_name: e.target.value })),
                isMandatory: true
            },
            {
                name: "Contact Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_driver_card?.contact_no || '',
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
                value: state?.servicesState?.new_edit_driver_card?.from_location || '',
                change: (e) => dispatch(handleDriverInputOnChange({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleDriverInputOnChange({ from_location: slectedLoc })),
                isMandatory: true
            },
            {
                name: "To",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: state?.servicesState?.new_edit_driver_card?.to_location || '',
                change: (e) => dispatch(handleDriverInputOnChange({ to_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleDriverInputOnChange({ to_location: slectedLoc })),
                isMandatory: true
            },

            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_driver_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleDriverInputOnChange({ truck_body_type: e.target.value })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_driver_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleDriverInputOnChange({ no_of_tyres: e.target.value })),
                isMandatory: true
            },
            {
                name: "Description",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: state?.servicesState?.new_edit_driver_card?.description || '',
                change: (e) => dispatch(handleDriverInputOnChange({ description: e.target.value })),
                isMandatory: true
            }
        ],
        driverFilterInputs: [
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: state?.servicesState?.driver_filter_card?.from_location || '',
                change: (e) => dispatch(handleOnchangeDriverFilter({ from_location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeDriverFilter({ from_location: slectedLoc })),
                isMandatory: true
            },
            {
                name: "To",
                type: "select",
                category: "select",
                placeholder: "",
                options: jsonOnly.states,
                value: state?.servicesState?.driver_filter_card?.to_location || [],
                change: (value) => dispatch(handleOnchangeDriverFilter({ to_location: value })),
                isMandatory: true
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.driver_filter_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleOnchangeDriverFilter({ truck_body_type: e.target.value })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.driver_filter_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleOnchangeDriverFilter({ no_of_tyres: e.target.value })),
                isMandatory: true
            }
        ],


        //                                                                             buy and sell                                                          //
        buyAndSellAddEdit: [
            {
                name: "Model Year",
                type: "select",
                category: "select",
                placeholder: "",
                options: modelYears(),
                value: state?.servicesState?.new_edit_buyAndsell_card?.model || '',
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ model: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.model ? "Model required" : ''
            },
            {
                name: "Brand Name",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.brand || '',
                options: jsonOnly.truckBrand,
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ brand: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.brand ? "Brand required" : ''
            },
            {
                name: "Owner Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.owner_name || '',
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ owner_name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.owner_name ? "Owner name required" : ''
            },
            {
                name: "Vehicle Number",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.vehicle_number_selected || [],
                options: state?.servicesState?.user_vehicle_list,
                change: (value) => dispatch(handleBuyAndSellInputOnChange({ vehicle_number: value, vehicle_number_selected: value[0]?.label })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.vehicle_number?.length ? "Vehicle number required" : ''
            },
            {
                name: "Kilometers driven",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.kms_driven || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleBuyAndSellInputOnChange({ kms_driven: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.kms_driven ? "Kilometers required" : ''
            },
            {
                name: "Price",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.price || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleBuyAndSellInputOnChange({ price: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.price ? "Price required" : ''
            },
            {
                name: "Tonnage",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.tonnage || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleBuyAndSellInputOnChange({ tonnage: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.tonnage ? "Tonnage required" : ''
            },
            {
                name: "Location",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.location || '',
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleBuyAndSellInputOnChange({ location: slectedLoc })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.location ? "Location required" : ''
            },
            {
                name: "Contact Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.contact_no || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                        dispatch(handleBuyAndSellInputOnChange({ contact_no: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.contact_no ? "Contact Number required" : ''
            },

            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.truck_body_type || '',
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ truck_body_type: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.truck_body_type ? "Truck Body Type required" : ''
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.no_of_tyres || '',
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ no_of_tyres: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.no_of_tyres ? "No Of Tyres required" : ''
            },
            {
                name: "Upload image",
                type: "file",
                category: "input",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui || [],
                change: (e) => {
                    // -- For Multiple File Input
                    let myImages = state?.servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui;
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
                Err: commonState?.validated && !state?.servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui?.length ? "Image required" : ''
            },
            {
                name: "Description",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: state?.servicesState?.new_edit_buyAndsell_card?.description || '',
                change: (e) => dispatch(handleBuyAndSellInputOnChange({ description: e.target.value })),
                isMandatory: true
            }
        ],
        buyAndSellFilterInputs: [
            {
                name: "Model Year",
                type: "select",
                category: "select",
                placeholder: "",
                options: modelTenYears(),
                value: state?.servicesState?.buyAndsell_filter_card?.model,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ model: e.target.value })),
                isMandatory: true
            },
            {
                name: "Brand Name",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.buyAndsell_filter_card?.brand,
                options: jsonOnly.truckBrand,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ brand: e.target.value })),
                isMandatory: true
            },
            {
                name: "Location",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: state?.servicesState?.buyAndsell_filter_card?.location,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ location: e.target.value })),
                placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeBuyAndSellFilter({ location: slectedLoc })),
                isMandatory: true
            },
            {
                name: "Kilometers driven",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.buyAndsell_filter_card?.kmd_driven,
                options: jsonOnly.filterKilometers,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ kmd_driven: e.target.value })),
                isMandatory: true
            },
            {
                name: "Price",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.buyAndsell_filter_card?.price,
                options: jsonOnly.filterPrice,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ price: e.target.value })),
                isMandatory: true
            },
            {
                name: "Tonnage",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.buyAndsell_filter_card?.tonnage,
                options: jsonOnly.tonnage,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ tonnage: e.target.value })),
                isMandatory: true
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.buyAndsell_filter_card?.truck_body_type,
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ truck_body_type: e.target.value })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: state?.servicesState?.buyAndsell_filter_card?.no_of_tyres,
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ no_of_tyres: e.target.value })),
                isMandatory: true
            }
        ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData