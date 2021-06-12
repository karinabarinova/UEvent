import { DropDown, DropDownItem, SearchStyles } from "./styles/SearchStyles";
import { useCombobox, resetIdCounter } from 'downshift';
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from "react-redux";
import {searchEvents} from '../store/search/searchSlice'
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

export default function Search() {
    const { t } = useTranslation('common');
    const history = useHistory();
    const dispatch = useDispatch()
    const data = useSelector(({search}) => search);

    const events = data?.result || [];
    resetIdCounter()
    const { 
        isOpen,
        inputValue,
        getMenuProps, 
        getInputProps, 
        getComboboxProps,
        getItemProps,
        highlightedIndex
    } = useCombobox({
        items: events,
        onInputValueChange() {
            console.log('input changed')
            searchEventsButChill(inputValue)
        },
        onSelectedItemChange({selectedItem}) {
            history.push('/event/' + selectedItem.id)
        },
        itemToString: item => item?.name || ''
    });
    const searchEventsButChill = debounce(searchHandler, 350);

    function searchHandler(search) {
        console.log("inputValue", search)
        dispatch(searchEvents(search))
    }

    return (
        <SearchStyles>
            <div {...getComboboxProps()}>
                <input {...getInputProps({
                    type: 'search',
                    placeholder: t('SEARCH'),
                    id: 'search',
                    className: events.length === 0 ? 'loading' : ''
                })} />
            </div>
            <DropDown {...getMenuProps()}>
                {isOpen && events.map((event, index) => (
                    <DropDownItem key={event.id} {...getItemProps({event, index})} highlighted={index === highlightedIndex}>
                        <img 
                            src={event?.image ? event.image : '/defaultEventPage.jfif'} 
                            alt={event.name} 
                            width="50"
                        />
                        {event.name}
                    </DropDownItem>)
                    )
                }
                {isOpen && !events.length && (
                    <DropDownItem>Sorry, No events found for {inputValue} </DropDownItem>
                )}
            </DropDown>
        </SearchStyles>
    )
}