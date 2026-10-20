import React, { FC, useCallback, useEffect, useState } from 'react';

import './legend.css';

import { DownIcon, UpIcon } from '../components/icons';
import { Logo } from '../components/logo';
import { CategoryMapDefinition } from '../config/category-maps-config';
import { BuildingMapTileset } from '../config/tileserver-config';

interface LegendProps {
    mapColourScaleDefinitions: CategoryMapDefinition[];
    mapColourScale: BuildingMapTileset;
    onMapColourScale: (x: BuildingMapTileset) => void;
}

export const Legend : FC<LegendProps> = ({
    mapColourScaleDefinitions,
    mapColourScale,
    onMapColourScale
}) => {
    const [collapseList, setCollapseList] = useState(false);

    const handleToggle = useCallback(() => {
        setCollapseList(!collapseList);
    }, [collapseList]);

    const onResize = useCallback(({target}) => {
        setCollapseList((target.outerHeight < 670 || target.outerWidth < 768))
    }, []);

    useEffect(() => {
        window.addEventListener('resize', onResize);

        if(window?.outerHeight) {

            // if we're in the browser, pass in as though from event to initialise
            onResize({target: window});
        }

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [onResize]);

    const legendConfig = mapColourScaleDefinitions.find(def => def.mapStyle === mapColourScale)?.legend;


    const {
        title = undefined,
        elements = [],
        description = undefined,
        disclaimer = undefined
    } = legendConfig ?? {};

    return (
        <div className="map-legend">
            <Logo variant="default" />
            {
                mapColourScaleDefinitions.length > 1 ?
                    <select className='style-select' onChange={e => onMapColourScale(e.target.value as BuildingMapTileset)} value={mapColourScale}>
                        {
                            mapColourScaleDefinitions.map(def =>
                                <option key={def.mapStyle} value={def.mapStyle}>{def.legend.title}</option>
                            )
                        }
                    </select> :
                    title && <h4 className="h4">{title}</h4>
            }
            {
                elements.length > 0 &&
                    <button className="expander-button btn btn-sm" type="button" onClick={handleToggle} >
                        {
                            collapseList ?
                                <UpIcon /> :
                                <DownIcon />
                        }
                    </button>
            }
            {
                description && <p>{description}</p>
            }
            {
                elements.length === 0 ?
                    ( disclaimer ? <ul className={collapseList ? 'collapse data-legend' : 'data-legend'} ><p className='legend-disclaimer'>{disclaimer}</p></ul> : null) :
                    <ul className={collapseList ? 'collapse data-legend' : 'data-legend'} >
                        {
                            disclaimer && <p className='legend-disclaimer'>{disclaimer}</p>
                        }
                        {
                            elements.map((item) => {
                                let key: string, 
                                    content: React.ReactElement;
                                    
                                if('subtitle' in item) {
                                    key = item.subtitle;
                                    content = <h6>{item.subtitle}</h6>;
                                } else {
                                    key = `${item.text}-${item.color}`;
                                    const symbol = item.symbol ?? 'swatch';
                                    let keyStyle: React.CSSProperties;
                                    if (item.hatch) {
                                        keyStyle = {
                                            backgroundImage: `repeating-linear-gradient(
                                                -45deg,
                                                transparent,
                                                transparent 2px,
                                                ${item.color} 2px,
                                                ${item.color} 3.5px
                                            )`,
                                            backgroundColor: 'transparent',
                                            border: `1.5px solid ${item.color}`,
                                            borderRadius: 0,
                                            width: '16px',
                                            height: '16px',
                                        };
                                    } else if (symbol === 'dashed-line') {
                                        keyStyle = {
                                            background: 'transparent',
                                            border: 'none',
                                            borderTop: `3px dashed ${item.color}`,
                                            width: '22px',
                                            height: 0,
                                            marginTop: '6px',
                                            borderRadius: 0,
                                        };
                                    } else if (symbol === 'solid-line') {
                                        keyStyle = {
                                            background: 'transparent',
                                            border: 'none',
                                            borderTop: `2px solid ${item.color}`,
                                            width: '22px',
                                            height: 0,
                                            marginTop: '6px',
                                            borderRadius: 0,
                                        };
                                    } else {
                                        // Default + former 'circle' symbols: solid colour boxes
                                        keyStyle = { background: item.color, border: item.border, borderRadius: 0 };
                                    }
                                    content = <>
                                        <div className="key" style={keyStyle} />
                                        { item.text }
                                    </>;
                                }
                                return (
                                    <li key={key}>
                                        {content}
                                    </li>
                                );
                            })
                        }
                    </ul>
            }
        </div>
    );
}
