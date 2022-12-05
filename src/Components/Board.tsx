import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragbbleCard from './DragabbleCard';

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

const Wrapper = styled.div`
    padding: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {toDos.map((todo, idx) => (
                            <DragbbleCard todo={todo} idx={idx} key={todo} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
