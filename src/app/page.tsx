import { useEffect } from 'react';

import AssetList from './components/AssetList';
import BoardSelector from './components/BoardSelector';

const BOARDS_URL = 'https://api.air.inc/shorturl/bDkBvnzpB/boards/c74bbbc8-602b-4c88-be71-9e21b36b0514';
const ASSETS_URL= 'https://api.air.inc/shorturl/bDkBvnzpB/clips/search';

export default function Home() {
  /*
  */

  return <main>
    <BoardSelector />
    <AssetList />
  </main>;
}
