import { useSelector } from 'react-redux';
import Icons from './Icons';
import { useDispatch } from 'Components/CustomHooks';
import { handleBlogInputOnChange } from 'Actions/Pages_actions/BlogAction';
import { handleLoadInputOnChange } from 'Actions/Pages_actions/ServicesActions';


const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    const { commonState, servicesState, blogState } = useSelector((state) => state);

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
            { value: 1, label: '1 Ton - 2.5 Ton' },
            { value: 2, label: '2.5 Ton - 5 Ton' },
            { value: 3, label: '5 Ton - 10 Ton' },
            { value: 4, label: '10 Ton - 20 Ton' },
            { value: 5, label: '20 Ton - 40 Ton' },
            { value: 6, label: 'Above 40 Ton' }
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
        ]
    }

    const jsxJson = {
        dashboardMenus: [
            {
                icon: Icons.dashboardUserIcon,
                content: "Total Number Of Users",
                value: 10
            },
            {
                icon: Icons.dashboardInsuranceIcon,
                content: "Total Number Of Insurance",
                value: 10
            },
            {
                icon: Icons.dashboardFastagIcon,
                content: "Total Number Of Fastag",
                value: 10
            },
            {
                icon: Icons.dashboardCustomerIcon,
                content: "New Customer",
                value: 10
            }
        ],
        blogInputs: [
            {
                name: "Language",
                type: "select",
                category: "select",
                placeholder: "",
                value: blogState?.blog_edit_data?.langugae,
                options: jsonOnly.blogLanguages,
                change: (e) => dispatch(handleBlogInputOnChange({ type: "language", value: { ...blogState?.blog_edit_data, langugae: e.target.value } })),
                isMandatory: true
            },
            {
                name: "Catergory",
                type: "select",
                category: "select",
                placeholder: "",
                value: blogState?.blog_edit_data?.blogCategory,
                options: jsonOnly.services,
                change: (e) => dispatch(handleBlogInputOnChange({ type: "category", value: { ...blogState?.blog_edit_data, blogCategory: e.target.value } })),
                isMandatory: true
            },
            {
                name: "Heading",
                type: "text",
                category: "input",
                placeholder: "",
                value: blogState?.blog_edit_data?.heading,
                change: (e) => dispatch(handleBlogInputOnChange({ type: "heading", value: { ...blogState?.blog_edit_data, heading: e.target.value } })),
                isMandatory: true
            },
            {
                name: "Sub Heading",
                type: "text",
                category: "input",
                placeholder: "",
                value: blogState?.blog_edit_data?.sub_heading,
                change: (e) => dispatch(handleBlogInputOnChange({ type: "sub_heading", value: { ...blogState?.blog_edit_data, sub_heading: e.target.value } })),
                isMandatory: true
            },
            {
                name: "Blog Content",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: blogState?.blog_edit_data?.blog_content,
                change: (e) => dispatch(handleBlogInputOnChange({ type: "blog_content", value: { ...blogState?.blog_edit_data, blog_content: e.target.value } })),
                isMandatory: true
            },
            {
                name: "Upload image",
                type: "file",
                category: "input",
                placeholder: "",
                value: blogState?.blog_edit_data?.blog_image,
                change: (e) => dispatch(handleBlogInputOnChange({ type: "blog_image", value: { ...blogState?.blog_edit_data, blog_image: e.target.files[0] } })),
                isMandatory: true
            }
        ],
        loadAddEditInputs: [
            {
                name: "Company Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.company_name,
                change: (e) => dispatch(handleLoadInputOnChange({ type: "company_name", value: { ...servicesState?.new_edit_load_card, company_name: e.target.value } })),
                isMandatory: true
            },
            {
                name: "Contact Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.contact_number,
                change: (e) => dispatch(handleLoadInputOnChange({ type: "contact_number", value: { ...servicesState?.new_edit_load_card, contact_number: e.target.value } })),
                isMandatory: true
            },
            {
                name: "From",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.from_location,
                change: (e) => dispatch(handleLoadInputOnChange({ type: "from_location", value: { ...servicesState?.new_edit_load_card, from_location: e.target.value} })),
                placedSelectedClick : (slectedLoc) => dispatch(handleLoadInputOnChange({ type: "from_location", value: { ...servicesState?.new_edit_load_card, from_location: slectedLoc } })),
                isMandatory: true
            },
            {
                name: "To",
                type: "text",
                category: "googleLocation",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.to_location,
                change: (e) => dispatch(handleLoadInputOnChange({ type: "to_location", value: { ...servicesState?.new_edit_load_card, to_location: e.target.value } })),
                placedSelectedClick : (slectedLoc) => dispatch(handleLoadInputOnChange({ type: "to_location", value: { ...servicesState?.new_edit_load_card, to_location: slectedLoc } })),
                isMandatory: true
            },
            {
                name: "Material",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.material,
                change: (e) => dispatch(handleLoadInputOnChange({ type: "material", value: { ...servicesState?.new_edit_load_card, material: e.target.value } })),
                isMandatory: true
            },
            {
                name: "Ton",
                type: "text",
                category: "input",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.ton,
                change: (e) => dispatch(handleLoadInputOnChange({ type: "ton", value: { ...servicesState?.new_edit_load_card, ton: e.target.value } })),
                isMandatory: true
            },
            {
                name: "Truck Body Type",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.truck_body_type,
                options: jsonOnly.truckBodyType,
                change: (e) => dispatch(handleLoadInputOnChange({ type: "truck_body_type", value: { ...servicesState?.new_edit_load_card, truck_body_type: e.target.value } })),
                isMandatory: true
            },
            {
                name: "No Of Tyres",
                type: "select",
                category: "select",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.no_of_tyres,
                options: jsonOnly.noOfTyres,
                change: (e) => dispatch(handleLoadInputOnChange({ type: "no_of_tyres", value: { ...servicesState?.new_edit_load_card, no_of_tyres: e.target.value } })),
                isMandatory: true
            },
            {
                name: "Blog Content",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: servicesState?.new_edit_load_card?.blog_content,
                change: (e) => dispatch(handleLoadInputOnChange({ type: "blog_content", value: { ...servicesState?.new_edit_load_card, blog_content: e.target.value } })),
                isMandatory: true
            }
        ],
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData