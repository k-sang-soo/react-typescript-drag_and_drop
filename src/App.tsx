import { GlobalStyle } from './StyledReset';
import { DragDropContext, Droppable, DropResult, DragStart } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import DragbbleCard from './Components/DragabbleCard';
import { useState } from 'react';

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;
        setToDos((oldToDos) => {
            const copyToDos = [...oldToDos];
            // 1) 움직이고 있는 item을 삭제
            const [removed] = copyToDos.splice(source.index, 1);
            // 2) 삭제한 item을 도착한 지점에 넣어주기
            // removed를 기존에는 draggableId 를 사용해서 삭제했는데 빠르게 똑같은 곳을 움직일 시 에러 발생함
            // 복사 된 배열에서 삭제 된 부분을 찾아서 없애줘야 오류가 안 생기는 것 같음
            copyToDos.splice(destination?.index, 0, removed);
            return copyToDos;
        });
    };

    return (
        <>
            <GlobalStyle />
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Boards>
                        <Droppable droppableId="one">
                            {(provided) => (
                                <Board {...provided.droppableProps} ref={provided.innerRef}>
                                    {toDos.map((todo, idx) => (
                                        <DragbbleCard todo={todo} idx={idx} key={todo} />
                                    ))}
                                    {provided.placeholder}
                                </Board>
                            )}
                        </Droppable>
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;
