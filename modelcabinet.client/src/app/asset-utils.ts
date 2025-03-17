import { Asset } from './Models/asset';

/**
 * Returns an array of tag names from an asset's assetTags array
 * @param asset The asset to extract tag names from
 * @returns string[] Array of tag names
 */
export function getAssetTagNames(asset: Asset): string[] {
  if (!asset.assetTags || asset.assetTags.length === 0) {
    return [];
  }

  return asset.assetTags.map(assetTag => assetTag.tag.tagName);
}

/**
 * Creates a new Asset object with assetTagNames getter implemented
 * @param asset Original asset object from API
 * @returns Asset with assetTagNames getter implemented
 */
export function createAssetWithTagNames(asset: Asset): Asset {
  // Create a new object with everything from the original asset
  const processedAsset = {
    ...asset,
    // Define getter for assetTagNames
    get assetTagNames(): string[] {
      return getAssetTagNames(this);
    }
  };

  return processedAsset;
}

/**
 * Process multiple assets to add assetTagNames getters
 * @param assets Array of assets from API
 * @returns Array of assets with assetTagNames getters
 */
export function processAssetsWithTagNames(assets: Asset[]): Asset[] {
  return assets.map(asset => createAssetWithTagNames(asset));
}
