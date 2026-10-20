import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

import './select-data-entry.css';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectDataEntryProps extends BaseDataEntryProps {
    value: string;
    placeholder?: string;
    options: (string | SelectOption)[];
    /**
     * @deprecated Questions never belong inside the select.
     * Kept so older call sites compile; ignored.
     */
    titleInSelect?: boolean;
}

function makeOption(option: string | SelectOption): SelectOption {
    if(typeof option !== 'string' && 'value' in option && 'label' in option) {
        return option;
    } else return {
        value: option,
        label: option
    }
}

/** Prompt/question text that belongs above the select, not as an option. */
function isPromptText(text?: string | null): boolean {
    if (!text) return false;
    const t = text.trim();
    if (!t) return false;
    if (/\?\s*$/.test(t)) return true;
    if (/^select\b/i.test(t)) return true;
    if (/^(what|which|how|who|when|where|why)\b/i.test(t)) return true;
    if (/^(do|does|did|is|are|was|were|has|have|had)\s+/i.test(t)) return true;
    return false;
}

/**
 * Pull question/prompt options out of the list so they can sit above the select.
 * Does not invent a question when none exists.
 */
function pullPromptsFromOptions(
    options: SelectOption[],
    existingTitle?: string
): { title: string | undefined; options: SelectOption[] } {
    const prompts: string[] = [];
    const cleaned: SelectOption[] = [];

    for (const option of options) {
        const label = (option.label ?? '').trim();
        const value = (option.value ?? '').trim();
        const isEmptyValue = value === '';
        const looksLikePrompt = isPromptText(label);

        // Empty-value prompt option, or a prompt mistakenly stored as a real option
        if (looksLikePrompt && (isEmptyValue || value === label)) {
            prompts.push(label);
            continue;
        }
        cleaned.push(option);
    }

    // Prefer an existing title; only adopt extracted prompt if there was no title
    const title = (existingTitle && existingTitle.trim())
        ? existingTitle
        : (prompts[0] || undefined);

    return { title, options: cleaned };
}

const SelectDataEntry: React.FunctionComponent<SelectDataEntryProps> = (props) => {
    const slugWithModifier = props.slug + (props.slugModifier ?? '');

    const rawOptions = (props.options || []).map(makeOption);
    const { title, options } = pullPromptsFromOptions(rawOptions, props.title);
    const ariaLabel = title || props.tooltip || 'Dropdown';

    return (
        <Fragment>
            {title ? (
                <DataTitleCopyable
                    slug={props.slug}
                    slugModifier={props.slugModifier}
                    title={title}
                    tooltip={props.tooltip}
                    disabled={props.disabled || props.value == undefined}
                    copy={props.copy}
                />
            ) : null}
            <select className="form-control"
                id={slugWithModifier} name={slugWithModifier}
                value={props.value || ''}
                disabled={props.mode === 'view' || props.disabled}
                required={props.required}
                title={props.tooltip || title || undefined}
                aria-label={ariaLabel}
                onChange={e =>
                    props.onChange(
                        props.slug,
                        e.target.value === '' ?
                            null :
                            e.target.value
                    )}
            >
                <option value=""></option>
                {
                    options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </Fragment>
    );
};

export default SelectDataEntry;
