import { useSelector } from 'react-redux';
import Icons from './Icons';
import { useDispatch } from 'Components/CustomHooks';


const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    const { validated } = useSelector((state) => state.commonState);

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
        services:[
            "All",
            "Lorry Owner",
            "Logistics",
            "Lorry Constructions",
            "Load Booking Agent",
            "Driver",
            "Lorry Buy & Sell Dealers/Owner",
            "Fastag",
            "Insurance"
        ]
    }

    const jsxJson = {
        dashboardMenus:[
            {
                icon:Icons.dashboardUserIcon,
                content:"Total Number Of Users",
                value: 10
            },
            {
                icon:Icons.dashboardInsuranceIcon,
                content:"Total Number Of Insurance",
                value: 10
            },
            {
                icon:Icons.dashboardFastagIcon,
                content:"Total Number Of Fastag",
                value: 10
            },
            {
                icon:Icons.dashboardCustomerIcon,
                content:"New Customer",
                value: 10
            }
        ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData