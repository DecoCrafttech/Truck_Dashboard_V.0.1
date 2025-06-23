
import { useDispatch } from 'react-redux';
import InputOnly from 'Components/Input/inputOnly';
import { clearSearch, updateSearchValue, updateSearchClickedTrue, updateToast } from 'Slices/Common_Slice/Common_slice';
import Icons from 'Utils/Icons';
import { useCommonState } from 'Components/CustomHooks';

export function SearchComponent({ className, placeholder }) {

    const dispatch = useDispatch();
    const { commonState } = useCommonState(state => state.commonState);

    function handleSearchClicked() {
        if (commonState?.search_value) {
            dispatch(updateSearchClickedTrue())
        } else {
            dispatch(updateToast({ type: "error", message: "search field should not be empty" }))
        }
    }

    function handleSearchEnter(event) {
        if (event.code === "Enter") {
            if (commonState?.search_value) {
                dispatch(updateSearchClickedTrue())
            } else {
                dispatch(updateToast({ type: "error", message: "search field should not be empty" }))
            }
        }
    }

    return (
        <div className="position-relative col-xxl-3">
            <InputOnly
                type="text"
                className={className}
                placeholder={placeholder}
                change={(e) => dispatch(updateSearchValue(e.target.value))}
                keyDown={handleSearchEnter}
                value={commonState?.search_value}
            />

            <span className="input-group-start-icon">{Icons.searchIcon}</span>
            {commonState?.search_value ? <span className="input-group-end-icon-two cursor-pointer" onClick={handleSearchClicked}>{Icons.searchIcon}</span> : null}
            <span className={`${!commonState?.search ? "pe-none" : 'cursor-pointer'} input-group-end-icon-one`} onClick={() => dispatch(clearSearch())}>{Icons.searchCancelIcon}</span>
        </div>
    );

}