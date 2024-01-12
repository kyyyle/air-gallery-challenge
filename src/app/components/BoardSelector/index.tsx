'use client';

import { useEffect, useState } from "react";

import { BoardItem, BoardList, BoardListContainer } from './styles';

const BOARDS_URL = 'https://api.air.inc/shorturl/bDkBvnzpB/boards/c74bbbc8-602b-4c88-be71-9e21b36b0514';

interface BoardSelectorProps {
    boards: Board[];
}

export const BoardSelector = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [boards, setBoards] = useState<Array<Board>>([]);

    useEffect(() => {
        fetchBoards().then((result) => {
            console.log('boards', result);
            const { data } = result;
            setBoards(data);
        });
    }, []);

    const fetchBoards = async () => {
        const data = await fetch(BOARDS_URL, { method: 'POST' });
        const json = await data.json();
        return json;
    };

    const showHideBoards = () => {
        setIsVisible(prevIsVisible => !prevIsVisible);
    };

    return (
        <BoardListContainer>
            <button
                className='relative bg-transparent text-sm font-bold uppercase text-grey-10 my-4'
                onClick={showHideBoards}
            >
                Boards ({boards.length})
            </button>
            {isVisible && (
                <BoardList>
                    {boards.map((board, ii) => {
                        console.log(board);
                        const thumbnail = board.thumbnail || board.thumbnails && board.thumbnails[0];
                        const backgroundImage = thumbnail || 'https://air-prod.imgix.net/d92b4e5b-d0b4-4465-ab43-b2cb04ec484b.jpg?auto=compress&w=400&h=400&fit=crop&ixlib=react-9.5.4';

                        const style = {
                            backgroundImage: `url(${backgroundImage})`,
                        };
                        return (
                            <BoardItem key={`board-${ii}-${board.id}`} className='flex grow items-end' style={style}>
                                <button>
                                    {board.title}
                                </button>
                            </BoardItem>
                        );
                    })}
                </BoardList>
            )}
        </BoardListContainer>
    );
};
/*
*/

export default BoardSelector;
