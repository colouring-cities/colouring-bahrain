import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DataPickerDataEntryProps extends BaseDataEntryProps {
    value: string;
    placeholder?: string;
    maxLength?: number;
}

const DataPickerDataEntry: React.FunctionComponent<DataPickerDataEntryProps> = (props) => {

    let date = props.value == null ? null : new Date(props.value);

    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                slugModifier={props.slugModifier}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined}
                copy={props.copy}
            />
            <div className="date-picker-input">
                <DatePicker
                    showIcon
                    dateFormat="dd/MM/yyyy"
                    slug={props.slug}
                    selected={date}
                    onChange={e => {
                        props.onChange(
                            props.slug,
                            e === null ?
                                null :
                                e
                        );
                    }}
                    title={props.tooltip}
                    isClearable={!(props.mode === 'view' || props.disabled)}
                    placeholderText="Select a date"
                    maxDate={new Date()}
                    disabled={props.mode === 'view' || props.disabled}
                />
            </div>
        </Fragment>
    );
};

export default DataPickerDataEntry;
