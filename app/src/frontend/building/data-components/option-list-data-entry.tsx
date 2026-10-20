import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

import './option-list-data-entry.css';

interface SelectOption {
    value: string;
    label: string;
}

interface OptionListDataEntryProps extends BaseDataEntryProps {
    value: string;
    options: (string | SelectOption)[];
}

function makeOption(option: string | SelectOption): SelectOption {
    if (typeof option !== 'string' && 'value' in option && 'label' in option) {
        return option;
    }
    return { value: option as string, label: option as string };
}

/**
 * Visible radio option list — works inside transformed/overflow sidebars
 * where native <select> dropdowns often fail to open in Chromium.
 */
const OptionListDataEntry: React.FunctionComponent<OptionListDataEntryProps> = (props) => {
    const slugWithModifier = props.slug + (props.slugModifier ?? '');
    const options = props.options.map(makeOption);
    const isDisabled = props.mode === 'view' || props.disabled;

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
            <div className="option-list-data-entry" role="radiogroup" aria-label={props.title}>
                {options.map(option => {
                    const id = `${slugWithModifier}__${option.value}`;
                    const checked = props.value === option.value;
                    return (
                        <label
                            key={option.value}
                            htmlFor={id}
                            className={`option-list-item${checked ? ' is-selected' : ''}${isDisabled ? ' is-disabled' : ''}`}
                        >
                            <input
                                id={id}
                                type="radio"
                                name={slugWithModifier}
                                value={option.value}
                                checked={checked}
                                disabled={isDisabled}
                                onChange={() => props.onChange(props.slug, option.value)}
                            />
                            <span>{option.label}</span>
                        </label>
                    );
                })}
            </div>
        </Fragment>
    );
};

export default OptionListDataEntry;
