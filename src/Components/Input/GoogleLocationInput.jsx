import React from 'react'
import Autocomplete from "react-google-autocomplete"

const GoogleLocationInput = ({
    componnetFrom,
    name,
    value,
    change
}) => {
    const handleFromLocation = (selectedLocation) => {
        if (selectedLocation) {
            const cityComponent = selectedLocation.find((component) =>
                component.types.includes("locality")
            );
            const stateComponent = selectedLocation.find((component) =>
                component.types.includes("administrative_area_level_1")
            );

            if (cityComponent && stateComponent) {
                change(`${cityComponent.long_name}, ${stateComponent.long_name}`);
            }
        }
    };

    return (
        <Autocomplete
            name="name"
            className="form-control location-input bg-transparent py-2"
            apiKey={process.env.REACT_APP_API_googleLocationKey}
            // onPlaceSelected={(place) => {
            //     if (place) {
            //         handleFromLocation(place.address_components);
            //     }
            // }}
            // value={value}
            onChange={change}
        />
    )
}

export default GoogleLocationInput