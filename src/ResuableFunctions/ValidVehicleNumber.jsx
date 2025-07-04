import { handleAddNewVehicle } from "Actions/Pages_actions/dashboardAction";
import ButtonComponent from "Components/Button/Button";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import InputOnly from "Components/Input/inputOnly";
import SpinnerComponent from "Components/Spinner/Spinner";
import { updateToast } from "Slices/Common_Slice/Common_slice";
import { updateNewVehicle } from "Slices/Pages_slice/dashboard_slice";

export const HandleAddvehicleOnChange = ({ parentDiv, divOneCls, divTwoCls }) => {
    const { dashboardState } = useCommonState();
    const queryParams = new URLSearchParams(window.location.search);
    const dispatch = useDispatch();
    const userId = queryParams.get('id');

    let params = {
        user_id: window.atob(userId),
        vehicle_no: dashboardState?.add_new_vehicle,
    }


    function ValidVehicleNumber(NUMBERPLATE) {
        let regex = new RegExp(/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/);

        if (NUMBERPLATE == null) {
            return false;
        }

        if (regex.test(NUMBERPLATE) === true) {
            return true;
        }
        else {
            return false;
        }
    }

    function onChangeVehicleDetails(event) {
        dispatch(updateNewVehicle(event.target.value))
    }

    function onKeyDownVehicleDetails(event) {
        if (event.code === "Enter") {
            addNewVehicle()
        }
    }

    function addNewVehicle() {
        if (ValidVehicleNumber(dashboardState?.add_new_vehicle)) {
            dispatch(handleAddNewVehicle(params))
        } else {
            dispatch(updateToast({ message: "Invalid vehicle number", type: "error" }))
        }
    }

    return (
        <div className={parentDiv}>
            <div className={divOneCls}>
                <InputOnly
                    type="text"
                    className="search-input-padding border px-3"
                    placeholder="Enter Vehicle Number ex: TN 00 AA 0000"
                    value={dashboardState?.add_new_vehicle}
                    change={onChangeVehicleDetails}
                    keyDown={onKeyDownVehicleDetails}
                />
            </div>

            <div className={divTwoCls}>
                <ButtonComponent
                    className={dashboardState?.add_vehicle_glow ? "custom-success fs-15 ms-2 py-1 px-5" : "custom-success fs-15 ms-2"}
                    buttonName={
                        dashboardState?.add_vehicle_glow ?
                            <SpinnerComponent />
                            :
                            "Add Vehicle"
                    }
                    title="Add Vehicle"
                    clickFunction={addNewVehicle}
                    btnDisable={dashboardState?.add_vehicle_glow}
                />
            </div>
        </div>
    )
}