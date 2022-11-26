import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IDragbbleCardProps {
    todo: string;
    idx: number;
}

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

function DragbbleCard({ todo, idx }: IDragbbleCardProps) {
    //react는 부모의 state가 변하면 state를 이용한 자식들(props) 모두 다시 렌더링 된다.
    //memo는 props가 바뀌지 않는다면 컴포넌트를 렌더링 하지 말아달라고 하는 역활 / prop가 바뀐 부분만 렌더링 하게 만듦
    return (
        <Draggable draggableId={todo} index={idx} key={todo}>
            {(provided) => (
                <Card ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    {todo}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragbbleCard);
