import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IDragbbleCardProps {
    toDoId: number;
    toDoText: string;
    idx: number;
}

interface ICardProps {
    isDragging: boolean;
}

const Card = styled.div<ICardProps>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => (props.isDragging ? '#74b9ff' : props.theme.cardColor)};
    box-shadow: ${(props) => (props.isDragging ? '0 2px 5px rgba(0, 0, 0, 0.05)' : 'none')};
`;

function DragbbleCard({ toDoId, toDoText, idx }: IDragbbleCardProps) {
    //react는 부모의 state가 변하면 state를 이용한 자식들(props) 모두 다시 렌더링 된다.
    //memo는 props가 바뀌지 않는다면 컴포넌트를 렌더링 하지 말아달라고 하는 역활 / prop가 바뀐 부분만 렌더링 하게 만듦
    return (
        <Draggable draggableId={toDoId + ''} index={idx}>
            {(provided, snapshot) => (
                <Card isDragging={snapshot.isDragging} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    {toDoText}, {toDoId}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragbbleCard);
