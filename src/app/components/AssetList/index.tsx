'use client';

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { AssetContainer, AssetItem, StyledList } from './styles';

const ASSETS_URL= 'https://api.air.inc/shorturl/bDkBvnzpB/clips/search';
const MIN_HEIGHT = 204;
const MAX_HEIGHT = 275;
const HEIGHT = 250;

interface ReducerState {
    rows: Array<Array<Asset>>;
}
export const AssetList = () => {
    const containerRef = useRef<HTMLUListElement>(null);
    const [assets, setAssets] = useState<Array<Asset>>([]);
    const [assetRows, setAssetRows] = useState<Asset[][]>([]);
    const [showAssets, setShowAssets] = useState(true);

    const fetchAssets = async () => {
        const data = await fetch(ASSETS_URL, { method: 'POST' });
        const json = await data.json();
        return json;
    };

    const doesAssetFit = (containerWidth: number, asset: Asset, row: Array<Asset>) => {
        const ratio = asset.height / HEIGHT;
        // console.log('fits?', asset, ratio)
        if (row.length === 0) {
            return asset.width / ratio <= containerWidth;
        }
        const maxCombinedWidth = row.reduce((acc, item) => {
            return acc + asset.width / ratio;
        }, 0);
        console.log('max combined', maxCombinedWidth, containerWidth)
        return maxCombinedWidth <= containerWidth - (row.length * 25);
    };

    const organizeRows = () => {
        if (containerRef.current) {
            const { clientWidth } = containerRef.current;
            const rows: Array<Asset[]> = [];
            let row: Array<Asset> = [];
            let ii = 0;
            while (ii < assets.length) {
                const asset = assets[ii];
                // console.log('row', row);
                if (doesAssetFit(clientWidth, asset, row)) {
                    const ratio = asset.height / HEIGHT;
                    row.push({
                        ...asset,
                        scaledHeight: asset.height / ratio,
                        scaledWidth: asset.width / ratio,
                    });
                    ii++;
                } else {
                    rows.push(row);
                    row = [];
                }
            }
            // console.log('calculated rows', rows);
            setAssetRows(rows);
        }
    };

    useEffect(() => {
        fetchAssets().then((result) => {
            console.log('assets', result);
            const { data } = result;
            setAssets(data.clips);
        });
    }, []);

    useEffect(() => {
        organizeRows();
    }, [assets])

    useEffect(() => {
        // organizeRows();
        window.addEventListener('resize', organizeRows)

        return () => {
            window.removeEventListener('resize', organizeRows);
        }
    }, [assets, assetRows, setAssetRows, organizeRows])

    const showHideAssets = () => {
        setShowAssets(prevShowAssets => !prevShowAssets)
    }

    return (
        <AssetContainer ref={containerRef}>
            <button
                className='relative bg-transparent text-sm font-bold uppercase text-grey-10 my-4'
                onClick={showHideAssets}
            >
                Assets ({assets.length})
            </button>
            {showAssets && (
                <div>
                    {assetRows.map((row, ii) => {
                        return (
                            <StyledList key={`asset-row-${ii}`}>
                                {row.map((asset, jj) => {
                                    const thumb = asset.assets.previewVideo || asset.assets.image;
                                    return (
                                        <AssetItem key={`asset-${ii}-${jj}`}>
                                            <img src={thumb} width={asset.scaledWidth} height={asset.scaledHeight} />
                                        </AssetItem>
                                    );
                                })}
                            </StyledList>
                        );
                    })}
                </div>
            )}
        </AssetContainer>
    );
};

export default AssetList;