type Board = {
    id: string;
    parentId: string;
    title: string;
    thumbnail?: string;
    thumbnails?: Array<string>;
}

type AssetPreview = {
    video: string;
    previewVideo: string;
    seekVideo: string;
    image: string;
    original: string;
}

type Asset = {
    assets: AssetPreview;
    id: string;
    displayName: string;
    size: number;
    height: number;
    width: number;
    scaledHeight?: number;
    scaledWidth?: number;
}
